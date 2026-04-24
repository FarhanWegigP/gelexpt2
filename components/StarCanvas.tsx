"use client";
import { useEffect, useRef } from "react";

export function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.004,
      phase: Math.random() * Math.PI * 2,
    }));

    const shoots: {
      x: number; y: number; len: number; a: number; life: number; speed: number;
    }[] = [];

    const addShoot = () => {
      if (shoots.length < 3 && Math.random() < 0.012) {
        shoots.push({
          x: Math.random() * W * 0.7,
          y: Math.random() * H * 0.4,
          len: 100 + Math.random() * 80,
          a: Math.PI / 6 + Math.random() * (Math.PI / 8),
          life: 1,
          speed: 8 + Math.random() * 6,
        });
      }
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;

      stars.forEach((s) => {
        const alpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 0.008 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      addShoot();
      for (let i = shoots.length - 1; i >= 0; i--) {
        const sh = shoots[i];
        sh.life -= 0.022;
        if (sh.life <= 0) { shoots.splice(i, 1); continue; }
        const dx = Math.cos(sh.a) * sh.len;
        const dy = Math.sin(sh.a) * sh.len;
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - dx, sh.y - dy);
        grad.addColorStop(0, `rgba(253,214,119,${sh.life * 0.9})`);
        grad.addColorStop(1, "rgba(253,214,119,0)");
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - dx, sh.y - dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        sh.x += Math.cos(sh.a) * sh.speed;
        sh.y += Math.sin(sh.a) * sh.speed;
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
