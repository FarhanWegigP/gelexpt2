"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FILTERS, type FilterDef } from "./filterData";

type Stage = "filter" | "camera" | "preview";
type FilterVariant = "default" | "graphic";

const PHOTO_COUNT = 4;
const COUNTDOWN_SEC = 3;
const PREVIEW_HEIGHT = "min(72vh, 720px)";

function drawGraphicLayer(
  ctx: CanvasRenderingContext2D,
  graphic: HTMLImageElement,
  w: number,
  h: number
) {
  const imageRatio = graphic.width / graphic.height;
  const canvasRatio = w / h;

  let drawW = w;
  let drawH = h;
  let dx = 0;
  let dy = 0;

  if (imageRatio > canvasRatio) {
    drawW = w;
    drawH = w / imageRatio;
    dy = h - drawH;
  } else {
    drawH = h;
    drawW = h * imageRatio;
    dx = (w - drawW) / 2;
  }

  ctx.drawImage(graphic, dx, dy, drawW, drawH);
}

function renderFilterLayer(
  ctx: CanvasRenderingContext2D,
  filter: FilterDef,
  variant: FilterVariant,
  graphic: HTMLImageElement | undefined,
  w: number,
  h: number
) {
  if (variant === "graphic" && graphic) {
    drawGraphicLayer(ctx, graphic, w, h);
  }

  filter.draw(ctx, w, h);
}

export function BilikFotoClient() {
  const [stage, setStage] = useState<Stage>("filter");
  const [selectedFilter, setSelectedFilter] = useState<FilterDef>(FILTERS[0]);
  const [selectedVariant, setSelectedVariant] = useState<FilterVariant>("default");
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [shooting, setShooting] = useState(false);
  const [stripUrl, setStripUrl] = useState<string | null>(null);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [graphicMap, setGraphicMap] = useState<Record<string, HTMLImageElement>>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const shootingRef = useRef(false);
  const thumbRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    FILTERS.forEach((filter) => {
      if (!filter.graphicSrc) return;
      const img = new window.Image();
      img.onload = () => {
        setGraphicMap((prev) => {
          if (prev[filter.id]) return prev;
          return { ...prev, [filter.id]: img };
        });
      };
      img.src = filter.graphicSrc;
    });
  }, []);

  useEffect(() => {
    FILTERS.forEach((filter, index) => {
      const canvas = thumbRefs.current[index];
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#1a2340");
      bg.addColorStop(1, "#0a0e1a");
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      renderFilterLayer(ctx, filter, "default", graphicMap[filter.id], w, h);
    });
  }, [graphicMap]);

  const currentGraphic = selectedFilter.graphicSrc ? graphicMap[selectedFilter.id] : undefined;
  const isGraphicVariant = selectedVariant === "graphic";
  const variantDisplay = useMemo(() => {
    if (selectedVariant === "graphic") return currentGraphic ? "Filter 2" : "Filter 2 kosong";
    return "Filter 1 - Default";
  }, [currentGraphic, selectedVariant]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      alert("Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    if (stage !== "camera") return;

    const draw = () => {
      const canvas = overlayRef.current;
      const video = videoRef.current;
      if (!canvas || !video || video.readyState < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -w, 0, w, h);
      ctx.restore();

      renderFilterLayer(ctx, selectedFilter, selectedVariant, currentGraphic, w, h);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [currentGraphic, selectedFilter, selectedVariant, stage]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const enterCamera = () => {
    setStage("camera");
    setPhotos([]);
    setPhotosTaken(0);
    setShooting(false);
    shootingRef.current = false;
    startCamera();
  };

  const exitCamera = () => {
    stopCamera();
    setStage("filter");
    setCountdown(null);
  };

  const capturePhoto = (): string => {
    const canvas = overlayRef.current;
    if (!canvas) return "";
    return canvas.toDataURL("image/jpeg", 0.92);
  };

  const buildStrip = async (dataUrls: string[]): Promise<string> => {
    const photoW = 600;
    const photoH = 450;
    const padding = 16;
    const headerH = 60;
    const footerH = 50;
    const stripW = photoW + padding * 2;
    const stripH = headerH + (photoH + padding) * PHOTO_COUNT + footerH;

    const canvas = document.createElement("canvas");
    canvas.width = stripW;
    canvas.height = stripH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const bg = ctx.createLinearGradient(0, 0, 0, stripH);
    bg.addColorStop(0, "#1a2340");
    bg.addColorStop(1, "#0a0e1a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, stripW, stripH);

    ctx.strokeStyle = "#f5c842";
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, stripW - 4, stripH - 4);

    ctx.fillStyle = "#f5c842";
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GELEX 2026 - BILIK FOTO", stripW / 2, 38);

    for (let i = 0; i < dataUrls.length; i++) {
      await new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          const y = headerH + i * (photoH + padding);
          ctx.drawImage(img, padding, y, photoW, photoH);
          ctx.strokeStyle = `${selectedFilter.color}88`;
          ctx.lineWidth = 2;
          ctx.strokeRect(padding, y, photoW, photoH);
          resolve();
        };
        img.src = dataUrls[i];
      });
    }

    ctx.fillStyle = "#64748b";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `${selectedFilter.emoji} ${selectedFilter.label} - ${variantDisplay} - UGM`,
      stripW / 2,
      stripH - 18
    );

    return canvas.toDataURL("image/png");
  };

  const startShooting = useCallback(() => {
    if (shootingRef.current) return;
    shootingRef.current = true;
    setShooting(true);
    setPhotos([]);
    setPhotosTaken(0);

    let taken = 0;
    const capturedPhotos: string[] = [];

    const shootNext = () => {
      if (taken >= PHOTO_COUNT) {
        setShooting(false);
        shootingRef.current = false;
        setCountdown(null);
        stopCamera();

        buildStrip(capturedPhotos).then((url) => {
          setStripUrl(url);
          setPhotos(capturedPhotos);
          setStage("preview");
        });
        return;
      }

      let counter = COUNTDOWN_SEC;
      setCountdown(counter);
      const tick = setInterval(() => {
        counter -= 1;
        if (counter <= 0) {
          clearInterval(tick);
          setCountdown(0);
          const dataUrl = capturePhoto();
          if (dataUrl) {
            capturedPhotos.push(dataUrl);
          }
          taken += 1;
          setPhotosTaken(taken);
          setTimeout(shootNext, 400);
        } else {
          setCountdown(counter);
        }
      }, 1000);
    };

    shootNext();
  }, [selectedFilter, selectedVariant, stopCamera, variantDisplay]);

  useEffect(() => {
    if (stage !== "preview" || photos.length === 0) return;
    const id = setInterval(() => {
      setPreviewIdx((idx) => (idx + 1) % photos.length);
    }, 1500);
    return () => clearInterval(id);
  }, [photos, stage]);

  const downloadStrip = () => {
    if (!stripUrl) return;
    const anchor = document.createElement("a");
    anchor.href = stripUrl;
    anchor.download = "gelex2026-bilikfoto-strip.png";
    anchor.click();
  };

  const downloadPhoto = (url: string, idx: number) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `gelex2026-foto-${idx + 1}.jpg`;
    anchor.click();
  };

  const downloadPhotoGroup = (indices: number[]) => {
    indices.forEach((index, offset) => {
      const photo = photos[index];
      if (!photo) return;
      window.setTimeout(() => {
        downloadPhoto(photo, index);
      }, offset * 180);
    });
  };

  if (stage === "filter") {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center">
        <div className="chip mb-4">📸 BILIK FOTO</div>
        <h2
          className="font-orbitron font-extrabold text-center mb-2"
          style={{ fontSize: "clamp(18px,3vw,30px)", letterSpacing: "0.08em" }}
        >
          PILIH UKM-MU
        </h2>
        <p className="text-[13px] mb-10 text-center" style={{ color: "#64748b" }}>
          Pilih dulu UKM-nya. Varian filter 1 dan filter 2 akan muncul di layar kamera sebelum sesi dimulai.
        </p>

        <div
          className="grid gap-4 w-full mb-8"
          style={{ maxWidth: 920, gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))" }}
        >
          {FILTERS.map((filter, index) => (
            <button
              key={filter.id}
              onClick={() => {
                setSelectedFilter(filter);
                setSelectedVariant("default");
              }}
              className="rounded-[22px] overflow-hidden cursor-pointer border-2 transition-all duration-200 text-left"
              style={{
                borderColor: selectedFilter.id === filter.id ? filter.color : "transparent",
                background: "rgba(17,24,39,0.82)",
                boxShadow: selectedFilter.id === filter.id ? `0 0 22px ${filter.color}33` : "none",
              }}
            >
              <canvas
                ref={(el) => {
                  thumbRefs.current[index] = el;
                }}
                width={260}
                height={160}
                className="w-full"
              />
              <div className="px-4 py-3 flex items-center gap-2">
                <span className="text-lg">{filter.emoji}</span>
                <span
                  className="font-orbitron font-bold text-[12px]"
                  style={{ color: selectedFilter.id === filter.id ? filter.color : "#f1f5f9" }}
                >
                  {filter.name}
                </span>
                <span
                  className="ml-auto rounded-full px-2 py-1 text-[9px] font-bold uppercase"
                  style={{ background: `${filter.color}22`, color: filter.color }}
                >
                  2 Varian
                </span>
              </div>
            </button>
          ))}
        </div>

        <button className="btn-primary text-[15px] px-8 py-3" onClick={enterCamera}>
          📷 Lanjut Ke Kamera
        </button>
        <Link href="/bilikfoto" className="btn-secondary mt-3">
          ← Back
        </Link>
      </div>
    );
  }

  if (stage === "camera") {
    return (
      <div className="min-h-screen pt-20 pb-8 px-4 flex flex-col items-center">
        <div className="chip mb-3">📸 SESI FOTO</div>

        <div className="flex gap-2 mb-4">
          {Array.from({ length: PHOTO_COUNT }, (_, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: index < photosTaken ? selectedFilter.color : "rgba(241,245,249,0.15)",
                boxShadow: index < photosTaken ? `0 0 8px ${selectedFilter.color}` : "none",
              }}
            />
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-5" style={{ maxWidth: 760, width: "100%" }}>
          <video ref={videoRef} className="hidden" playsInline muted />
          <canvas
            ref={overlayRef}
            width={640}
            height={480}
            className="w-full block"
            style={{ background: "#0a0e1a", aspectRatio: "4 / 3" }}
          />

          {countdown !== null && countdown > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="font-orbitron font-black text-[80px] leading-none"
                style={{
                  color: selectedFilter.color,
                  textShadow: `0 0 40px ${selectedFilter.color}, 0 0 80px ${selectedFilter.color}66`,
                }}
              >
                {countdown}
              </div>
            </div>
          )}

          {countdown === 0 && (
            <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.6)", pointerEvents: "none" }} />
          )}

          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: `${selectedFilter.color}cc`, color: "#fff" }}
          >
            {selectedFilter.emoji} {selectedFilter.name} - {selectedVariant === "default" ? "Filter 1" : "Filter 2"}
          </div>

          <div
            className="absolute top-3 right-3 font-orbitron font-black text-[13px] rounded-full px-3 py-1"
            style={{ background: "rgba(10,14,26,0.8)", color: selectedFilter.color }}
          >
            {photosTaken}/{PHOTO_COUNT}
          </div>
        </div>

        {!shooting && (
          <div
            className="w-full rounded-[26px] p-4 mb-5"
            style={{
              maxWidth: 760,
              background: "linear-gradient(180deg, rgba(14,22,38,0.96) 0%, rgba(8,13,24,0.92) 100%)",
              border: `1px solid ${selectedFilter.color}22`,
            }}
          >
            <div className="font-orbitron text-[12px] font-bold tracking-[0.18em] mb-3" style={{ color: selectedFilter.color }}>
              PILIH VARIAN FILTER
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="btn-secondary"
                onClick={() => setSelectedVariant("default")}
                style={{
                  background: selectedVariant === "default" ? `${selectedFilter.color}12` : "transparent",
                  borderColor: selectedVariant === "default" ? `${selectedFilter.color}88` : "rgba(245, 200, 66, 0.35)",
                  color: selectedVariant === "default" ? "#fff" : "#f5c842",
                }}
              >
                Filter 1
              </button>
              <button
                className="btn-secondary"
                onClick={() => setSelectedVariant("graphic")}
                style={{
                  background: selectedVariant === "graphic" ? `${selectedFilter.color}12` : "transparent",
                  borderColor: selectedVariant === "graphic" ? `${selectedFilter.color}88` : "rgba(245, 200, 66, 0.35)",
                  color: selectedVariant === "graphic" ? "#fff" : "#f5c842",
                }}
              >
                Filter 2
              </button>
            </div>
            <div className="mt-3 text-[12px]" style={{ color: currentGraphic ? "#94a3b8" : "#f59e0b" }}>
              {selectedVariant === "default"
                ? "Filter 1 hanya memakai tulisan dan overlay bawaan UKM."
                : currentGraphic
                  ? `Filter 2 memakai PNG dari ${selectedFilter.graphicHint} sebagai layer belakang.`
                  : `Filter 2 sudah disiapkan, tapi PNG untuk ${selectedFilter.name} belum ada. Taruh file di ${selectedFilter.graphicHint}.`}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {!shooting ? (
            <>
              <button className="btn-primary px-8" onClick={startShooting}>
                ▶ Mulai Sesi
              </button>
              <button className="btn-secondary" onClick={exitCamera}>
                ← Kembali
              </button>
            </>
          ) : (
            <div className="text-center" style={{ color: "#94a3b8" }}>
              <div className="text-[13px]">
                {countdown !== null && countdown > 0
                  ? `Bersiap... foto ${photosTaken + 1} dari ${PHOTO_COUNT}`
                  : countdown === 0
                    ? "📸 Klik!"
                    : `Mengambil foto ${photosTaken + 1}...`}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex flex-col items-center">
      <div className="chip mb-3">🎞️ HASIL FOTO</div>
      <h2
        className="font-orbitron font-extrabold text-center mb-2"
        style={{ fontSize: "clamp(16px,2.5vw,24px)", letterSpacing: "0.08em" }}
      >
        FOTO KAMU SIAP!
      </h2>
      <p className="text-[12px] mb-8 text-center" style={{ color: "#64748b" }}>
        Preview lebih tinggi, strip tetap besar, dan download foto sekarang lebih rapih.
      </p>

      <div className="flex flex-col xl:flex-row gap-8 w-full justify-center items-start" style={{ maxWidth: 1180 }}>
        <div className="w-full xl:w-auto">
          <div className="mb-3 font-orbitron text-[12px] font-bold tracking-[0.2em]" style={{ color: selectedFilter.color }}>
            SHOWCASE
          </div>
          <div
            className="relative overflow-hidden rounded-[28px]"
            style={{
              width: "min(380px, 92vw)",
              height: PREVIEW_HEIGHT,
              border: `2px solid ${selectedFilter.color}66`,
              background: "linear-gradient(180deg, rgba(10,14,26,0.9) 0%, rgba(26,35,64,0.75) 100%)",
              boxShadow: `0 0 34px ${selectedFilter.color}22`,
            }}
          >
            {photos[previewIdx] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photos[previewIdx]}
                alt={`Foto ${previewIdx + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div
              className="absolute inset-x-0 bottom-0 p-5"
              style={{ background: "linear-gradient(180deg, rgba(10,14,26,0) 0%, rgba(10,14,26,0.88) 100%)" }}
            >
              <div className="font-orbitron text-[19px] font-black" style={{ color: "#fff" }}>
                FOTO {previewIdx + 1}
              </div>
              <div className="text-[12px]" style={{ color: "#cbd5e1" }}>
                {selectedFilter.label} - {selectedVariant === "default" ? "Filter 1" : "Filter 2"}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setPreviewIdx(index)}
                className="h-2.5 rounded-full transition-all duration-200"
                style={{
                  width: previewIdx === index ? 28 : 10,
                  background: previewIdx === index ? selectedFilter.color : "rgba(241,245,249,0.22)",
                }}
              />
            ))}
          </div>
        </div>

        {stripUrl && (
          <div className="w-full xl:w-auto">
            <div className="mb-3 font-orbitron text-[12px] font-bold tracking-[0.2em]" style={{ color: selectedFilter.color }}>
              STRIP PNG
            </div>
            <div
              className="rounded-[28px] overflow-hidden flex items-center justify-center px-3 py-4"
              style={{
                height: PREVIEW_HEIGHT,
                border: `2px solid ${selectedFilter.color}44`,
                background: "rgba(10,14,26,0.55)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stripUrl} alt="Strip foto" className="block h-full w-auto max-w-full object-contain" />
            </div>
          </div>
        )}
      </div>

      <div
        className="mt-8 w-full rounded-[28px] p-5"
        style={{
          maxWidth: 980,
          background: "linear-gradient(180deg, rgba(14,22,38,0.96) 0%, rgba(8,13,24,0.92) 100%)",
          border: `1px solid ${selectedFilter.color}22`,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <div className="font-orbitron text-[15px] font-bold" style={{ color: selectedFilter.color }}>
              Download Hasil Foto
            </div>
            <div className="text-[12px] mt-1" style={{ color: "#94a3b8" }}>
              Pilih strip penuh atau download foto tertentu. Tombol "Semua Foto" akan mengunduh foto 1 sampai 4 sekaligus.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {stripUrl && (
              <button className="btn-primary" onClick={downloadStrip}>
                Download Strip PNG
              </button>
            )}
            <button className="btn-secondary" onClick={() => downloadPhotoGroup([0, 1, 2, 3])}>
              Download Semua Foto
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {photos.map((photo, index) => (
            <button
              key={photo}
              className="btn-secondary"
              onClick={() => downloadPhoto(photo, index)}
              style={{
                background: previewIdx === index ? `${selectedFilter.color}12` : "transparent",
                borderColor: previewIdx === index ? `${selectedFilter.color}88` : "rgba(245, 200, 66, 0.35)",
                color: previewIdx === index ? "#fff" : "#f5c842",
              }}
            >
              Download Foto {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          className="btn-secondary"
          onClick={() => {
            setStage("filter");
            setPhotos([]);
            setStripUrl(null);
          }}
        >
          ← Pilih UKM Lain
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            setPhotos([]);
            setStripUrl(null);
            setPhotosTaken(0);
            enterCamera();
          }}
        >
          ↻ Foto Lagi
        </button>
      </div>

      <div className="fixed bottom-20 right-5 z-50">
        <Image
          src="/assets/mascot-gantari.png"
          alt="Gantari"
          width={90}
          height={90}
          style={{ height: 90, width: "auto", filter: "drop-shadow(0 0 12px rgba(236,72,153,0.4))" }}
        />
      </div>
    </div>
  );
}
