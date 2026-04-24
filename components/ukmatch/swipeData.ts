export type ScoreKey =
  | "aktif"
  | "kreatif"
  | "kompetitif"
  | "sosial"
  | "spiritual"
  | "akademik"
  | "outdoor"
  | "pertunjukan";

export type Scores = Record<ScoreKey, number>;

export interface UKMCard {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  accent: string;
  keywords: [string, string, string];
  caption: string;
  detail: string;          // longer description shown on swipe-up modal
  activities: string[];    // bullet list of what members do
  weights: Partial<Scores>;
}

export interface PrefQuestion {
  q: string;
  options: { label: string; icon: string; scores: Partial<Scores> }[];
}

// ─── Preference questions ────────────────────────────────────
export const PREF_QUESTIONS: PrefQuestion[] = [
  {
    q: "Kegiatan yang bikin kamu semangat?",
    options: [
      {
        label: "Gerak & tantangan fisik",
        icon: "⚡",
        scores: { aktif: 3, kompetitif: 1, outdoor: 1 },
      },
      {
        label: "Eksplorasi kreatif & seni",
        icon: "🎨",
        scores: { kreatif: 3, pertunjukan: 1 },
      },
      {
        label: "Ngobrol, kolaborasi, komunitas",
        icon: "🤝",
        scores: { sosial: 3, pertunjukan: 1 },
      },
      {
        label: "Belajar & riset hal baru",
        icon: "🧠",
        scores: { akademik: 3, kreatif: 1 },
      },
    ],
  },
  {
    q: "Kamu lebih nyaman di posisi mana?",
    options: [
      {
        label: "Tampil di depan / panggung",
        icon: "🎤",
        scores: { pertunjukan: 3, aktif: 1 },
      },
      {
        label: "Behind the scenes / teknis",
        icon: "🎬",
        scores: { kreatif: 2, akademik: 2 },
      },
      {
        label: "Pemimpin & pengorganisir",
        icon: "🗺️",
        scores: { sosial: 2, kompetitif: 2 },
      },
      {
        label: "Pengabdi setia & sukarelawan",
        icon: "🌱",
        scores: { sosial: 2, spiritual: 2 },
      },
    ],
  },
  {
    q: "Vibe lingkungan yang kamu mau?",
    options: [
      {
        label: "Alam & udara segar",
        icon: "🏔️",
        scores: { outdoor: 3, aktif: 2 },
      },
      {
        label: "Kompetisi & menang",
        icon: "🏆",
        scores: { kompetitif: 3, aktif: 1 },
      },
      {
        label: "Komunitas hangat & rohani",
        icon: "✨",
        scores: { spiritual: 3, sosial: 2 },
      },
      {
        label: "Studio & ruang berkreasi",
        icon: "🎭",
        scores: { kreatif: 3, pertunjukan: 1 },
      },
    ],
  },
];

// ─── UKM Cards ───────────────────────────────────────────────
export const UKM_CARDS: UKMCard[] = [
  {
    id: "psm",
    name: "PSM Gadjah Mada",
    emoji: "🎵",
    gradient: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    accent: "#a78bfa",
    keywords: ["Suara", "Harmoni", "Panggung"],
    caption: "Paduan suara mahasiswa bergengsi, tampil di panggung nasional hingga internasional.",
    detail: "PSM Gadjah Mada adalah unit paduan suara mahasiswa UGM yang telah berdiri sejak puluhan tahun dan menjadi salah satu paduan suara kampus paling prestisius di Indonesia. Anggotanya rutin tampil di acara-acara besar kampus, festival musik, hingga kompetisi tingkat nasional dan internasional.",
    activities: ["Latihan vokal rutin 3x seminggu", "Pentas di acara wisuda & dies natalis UGM", "Kompetisi paduan suara nasional", "Rekaman & produksi album", "Kunjungan budaya antar kampus"],
    weights: { kreatif: 3, pertunjukan: 3, sosial: 2 },
  },
  {
    id: "voli",
    name: "UKM Voli UGM",
    emoji: "🏐",
    gradient: "linear-gradient(135deg,#0ea5e9,#0284c7)",
    accent: "#38bdf8",
    keywords: ["Tim", "Smes", "Turnamen"],
    caption: "Spike keras, kerja tim solid, dan semangat juang yang nggak pernah padam.",
    detail: "UKM Voli UGM adalah wadah bagi mahasiswa yang ingin mengembangkan kemampuan bola voli di level serius. Tim putra dan putri rutin bertanding di liga mahasiswa, Pekan Olahraga Mahasiswa Nasional (POMNAS), dan kompetisi antar-PTN.",
    activities: ["Latihan fisik & teknik 4x seminggu", "Laga persahabatan antar kampus", "Turnamen POMNAS & Libama", "Sport clinic bersama pelatih profesional", "Gathering & bonding tim"],
    weights: { aktif: 3, kompetitif: 3, sosial: 2 },
  },
  {
    id: "mapagama",
    name: "MAPAGAMA",
    emoji: "🏔️",
    gradient: "linear-gradient(135deg,#059669,#065f46)",
    accent: "#34d399",
    keywords: ["Ekspedisi", "Alam", "Survival"],
    caption: "Mendaki puncak, menyusuri gua, dan menjelajahi alam liar bersama komunitas tangguh.",
    detail: "MAPAGAMA (Mahasiswa Pecinta Alam Gadjah Mada) adalah salah satu organisasi pecinta alam tertua dan terprestisius di Indonesia. Anggotanya terlatih dalam pendakian gunung, penelusuran gua, arung jeram, dan kegiatan konservasi alam.",
    activities: ["Pendakian gunung-gunung tinggi Indonesia", "Ekspedisi spelunking (penelusuran gua)", "Arung jeram & olahraga air", "Pelatihan survival & SAR", "Kampanye konservasi lingkungan"],
    weights: { outdoor: 3, aktif: 3, sosial: 2 },
  },
  {
    id: "js",
    name: "Jamaah Shalahuddin",
    emoji: "🌙",
    gradient: "linear-gradient(135deg,#0369a1,#1e3a5f)",
    accent: "#7dd3fc",
    keywords: ["Dakwah", "Ukhuwah", "Kajian"],
    caption: "Komunitas Islam terbesar UGM, aktif dalam dakwah, kajian, dan pengabdian masyarakat.",
    detail: "Jamaah Shalahuddin (JS) adalah organisasi kerohanian Islam mahasiswa UGM yang menjadi salah satu lembaga dakwah kampus terbesar di Indonesia. JS menawarkan komunitas yang hangat, kajian ilmiah Islam, dan program pengabdian masyarakat yang nyata.",
    activities: ["Kajian Islam rutin & halaqah", "Program ramadan & pesantren kilat", "Bakti sosial & pengabdian masyarakat", "Festival & pameran keislaman", "Pengiriman dai ke daerah terpencil"],
    weights: { spiritual: 3, sosial: 3, akademik: 1 },
  },
  {
    id: "teater",
    name: "Teater UFO UGM",
    emoji: "🎭",
    gradient: "linear-gradient(135deg,#dc2626,#7f1d1d)",
    accent: "#fca5a5",
    keywords: ["Akting", "Drama", "Ekspresi"],
    caption: "Pentas teatrikal yang memadukan seni peran, sastra, dan kritik sosial.",
    detail: "Teater UFO UGM adalah kelompok teater mahasiswa yang dikenal dengan karya-karyanya yang berani, eksploratif, dan kritis. Mereka memproduksi pertunjukan yang menggabungkan seni peran, puisi, musik, dan tata artistik yang memukau.",
    activities: ["Latihan acting & improvisasi", "Produksi pementasan drama & monolog", "Workshop sutradara & penulisan naskah", "Pertunjukan di festival teater nasional", "Diskusi & bedah karya sastra"],
    weights: { kreatif: 3, pertunjukan: 3, sosial: 1 },
  },
  {
    id: "basket",
    name: "UKM Basket UGM",
    emoji: "🏀",
    gradient: "linear-gradient(135deg,#f97316,#c2410c)",
    accent: "#fb923c",
    keywords: ["Dribble", "Slam Dunk", "Liga"],
    caption: "Lapangan basket, keringat, dan chemistry tim yang terbangun lewat latihan intens.",
    detail: "UKM Basket UGM memiliki tim putra dan putri yang aktif berkompetisi di liga mahasiswa regional dan nasional. Dengan fasilitas lapangan yang memadai dan program latihan terstruktur, UKM ini menjadi tempat berkembang bagi atlet basket kampus.",
    activities: ["Latihan teknik & taktik 5x seminggu", "Kompetisi DBL & liga mahasiswa", "Scrimmage dengan tim kampus lain", "Coaching clinic dari pelatih berpengalaman", "Fun match & turnamen internal"],
    weights: { aktif: 3, kompetitif: 3, sosial: 2 },
  },
  {
    id: "kmk",
    name: "KMK UGM",
    emoji: "✝️",
    gradient: "linear-gradient(135deg,#1d4ed8,#1e3a8a)",
    accent: "#93c5fd",
    keywords: ["Iman", "Komunitas", "Pelayanan"],
    caption: "Keluarga Mahasiswa Kristen yang hangat, aktif dalam pelayanan dan pengembangan diri.",
    detail: "Keluarga Mahasiswa Kristen (KMK) UGM adalah persekutuan mahasiswa Kristen yang berfokus pada pertumbuhan iman, persaudaraan, dan pelayanan sosial. KMK menyediakan komunitas yang suportif bagi mahasiswa Kristen selama masa kuliah.",
    activities: ["Ibadah & renungan mingguan", "Kelompok kecil & pemuridan", "Retret rohani semesteran", "Bakti sosial & pelayanan masyarakat", "Perayaan hari besar Kristen"],
    weights: { spiritual: 3, sosial: 3 },
  },
  {
    id: "foto",
    name: "UKM Fotografi UGM",
    emoji: "📷",
    gradient: "linear-gradient(135deg,#374151,#111827)",
    accent: "#9ca3af",
    keywords: ["Frame", "Momen", "Estetika"],
    caption: "Mengabadikan keindahan dunia lewat lensa, dari street photography hingga portrait.",
    detail: "UKM Fotografi UGM adalah komunitas fotografer mahasiswa yang aktif mengeksplorasi berbagai genre fotografi. Dari street photography di kota Yogyakarta hingga landscape alam Indonesia, anggotanya mengasah mata artistik dan kemampuan teknis bersama.",
    activities: ["Photo walk & hunting foto mingguan", "Workshop editing Lightroom & Photoshop", "Pameran foto mahasiswa", "Kompetisi fotografi kampus & nasional", "Dokumentasi acara-acara UGM"],
    weights: { kreatif: 3, outdoor: 1, akademik: 1 },
  },
  {
    id: "esports",
    name: "Esports UGM",
    emoji: "🎮",
    gradient: "linear-gradient(135deg,#7c3aed,#db2777)",
    accent: "#c084fc",
    keywords: ["Gaming", "Strategi", "Tournament"],
    caption: "Bertarung di dunia digital — MLBB, Valorant, hingga turnamen nasional.",
    detail: "Esports UGM adalah unit kegiatan mahasiswa yang berfokus pada olahraga elektronik kompetitif. Tim-tim mereka aktif bertanding di berbagai game populer seperti Mobile Legends, Valorant, PUBG Mobile, dan FIFA, baik di level kampus maupun nasional.",
    activities: ["Sesi latihan & scrimmage harian", "Turnamen internal antar divisi", "Kompetisi Gemastik & liga esports nasional", "Coaching session bersama pro player", "Streaming & konten kreator gaming"],
    weights: { kompetitif: 3, sosial: 2, akademik: 1 },
  },
  {
    id: "ksr",
    name: "KSR PMI UGM",
    emoji: "🩺",
    gradient: "linear-gradient(135deg,#dc2626,#b91c1c)",
    accent: "#fca5a5",
    keywords: ["Donor Darah", "P3K", "Baksos"],
    caption: "Korps sukarelawan yang siap siaga, berdedikasi menolong sesama kapan pun dibutuhkan.",
    detail: "Korps Sukarela PMI UGM adalah unit kepalangmerahan yang melatih mahasiswa menjadi relawan terampil di bidang pertolongan pertama, penanggulangan bencana, dan pengabdian masyarakat. Mereka sering terjun langsung saat terjadi bencana di sekitar Yogyakarta.",
    activities: ["Pelatihan P3K & pertolongan pertama", "Kegiatan donor darah rutin", "Simulasi tanggap bencana", "Bakti sosial ke daerah terpencil", "Kolaborasi dengan PMI Kota Yogyakarta"],
    weights: { sosial: 3, aktif: 2 },
  },
  {
    id: "selam",
    name: "UKM Selam UGM",
    emoji: "🤿",
    gradient: "linear-gradient(135deg,#0891b2,#164e63)",
    accent: "#67e8f9",
    keywords: ["Menyelam", "Laut", "Eksplorasi"],
    caption: "Menyelami kedalaman laut, menjelajahi terumbu karang, dan merasakan bebas di bawah air.",
    detail: "UKM Selam UGM membuka pintu bagi mahasiswa untuk menyelami keindahan bawah laut Indonesia. Dengan program sertifikasi selam internasional (PADI/SSI), anggotanya dilatih untuk menjadi penyelam yang kompeten dan bertanggung jawab terhadap ekosistem laut.",
    activities: ["Latihan renang & freediving di kolam", "Sertifikasi selam PADI Open Water", "Ekspedisi selam ke perairan Indonesia", "Survei & konservasi terumbu karang", "Kompetisi selam mahasiswa nasional"],
    weights: { outdoor: 3, aktif: 3, kompetitif: 1 },
  },
  {
    id: "film",
    name: "UKM Film UGM",
    emoji: "🎬",
    gradient: "linear-gradient(135deg,#78350f,#1c1917)",
    accent: "#fbbf24",
    keywords: ["Sinema", "Sutradara", "Cerita"],
    caption: "Dari ide ke layar lebar — produksi film pendek, dokumenter, dan festival film mahasiswa.",
    detail: "UKM Film UGM adalah rumah bagi para sineas muda UGM yang bersemangat bercerita lewat gambar bergerak. Dari penulisan skenario, penyutradaraan, sinematografi, hingga pascaproduksi — semua dipelajari dan dipraktikkan bersama dalam komunitas yang kreatif.",
    activities: ["Workshop penulisan skenario & penyutradaraan", "Produksi film pendek & dokumenter", "Pemutaran film & diskusi sinema", "Pengiriman ke festival film mahasiswa nasional", "Kolaborasi dengan sineas profesional"],
    weights: { kreatif: 3, pertunjukan: 2, akademik: 2 },
  },
  {
    id: "tari",
    name: "Tari Gaya Yogyakarta",
    emoji: "💃",
    gradient: "linear-gradient(135deg,#be185d,#831843)",
    accent: "#f9a8d4",
    keywords: ["Klasik", "Gerak", "Budaya"],
    caption: "Pelestarian seni tari Jawa klasik yang anggun — dari Bedhaya hingga tari kontemporer.",
    detail: "UKM Tari Gaya Yogyakarta melestarikan dan mengembangkan seni tari Jawa klasik gaya Yogyakarta. Anggotanya belajar dari maestro tari UGM, tampil di berbagai acara budaya, dan menjadi duta budaya Jawa ke forum-forum seni nasional.",
    activities: ["Latihan tari klasik Jawa 3x seminggu", "Pentas di acara budaya & diplomatik", "Festival tari nasional & internasional", "Workshop koreografi kontemporer", "Pengajaran tari ke masyarakat umum"],
    weights: { kreatif: 3, pertunjukan: 3, aktif: 2 },
  },
  {
    id: "karate",
    name: "UKM Karate UGM",
    emoji: "🥋",
    gradient: "linear-gradient(135deg,#1f2937,#374151)",
    accent: "#e5e7eb",
    keywords: ["Kata", "Kumite", "Disiplin"],
    caption: "Seni bela diri yang membangun fisik, mental, dan karakter juara.",
    detail: "UKM Karate UGM melatih mahasiswa dalam seni bela diri karate dengan pendekatan holistik — fisik, mental, dan spiritual. Di bawah pelatih berpengalaman dan berlisensi nasional, anggotanya berkembang dari sabuk putih hingga menjadi atlet berprestasi.",
    activities: ["Latihan kata & kumite harian", "Ujian kenaikan sabuk berkala", "Kompetisi POMNAS & kejuaraan nasional", "Pertukaran dengan dojo karate lain", "Pelatihan fisik & meditasi"],
    weights: { aktif: 3, kompetitif: 3, spiritual: 1 },
  },
  {
    id: "debate",
    name: "English Debate UGM",
    emoji: "🎤",
    gradient: "linear-gradient(135deg,#1e40af,#1e3a8a)",
    accent: "#93c5fd",
    keywords: ["Argumen", "Logika", "Kompetisi"],
    caption: "Asah kemampuan berpikir kritis dan berbicara meyakinkan di panggung debat internasional.",
    detail: "English Debate UGM melatih mahasiswa untuk berdebat secara logis, terstruktur, dan persuasif dalam Bahasa Inggris. Komunitas ini mendorong anggotanya untuk berpikir kritis tentang isu-isu global dan menyampaikan argumen dengan percaya diri di depan publik.",
    activities: ["Latihan debat & public speaking mingguan", "Kompetisi debat nasional & NUDC", "Workshop penulisan argumen", "Simulasi debat internasional (WUDC format)", "Mentoring dari alumni debater nasional"],
    weights: { akademik: 3, pertunjukan: 2, kompetitif: 2 },
  },
  {
    id: "kopma",
    name: "KOPMA UGM",
    emoji: "🏪",
    gradient: "linear-gradient(135deg,#15803d,#14532d)",
    accent: "#86efac",
    keywords: ["Bisnis", "Koperasi", "Wirausaha"],
    caption: "Belajar bisnis nyata dari kampus — koperasi mahasiswa terbesar dengan usaha aktif.",
    detail: "KOPMA UGM adalah koperasi mahasiswa yang mengelola bisnis nyata di lingkungan kampus. Anggotanya mendapat pengalaman langsung dalam manajemen bisnis, keuangan, pemasaran, dan kewirausahaan — sambil tetap kuliah!",
    activities: ["Pengelolaan toko & unit usaha koperasi", "Pelatihan manajemen bisnis & keuangan", "Lomba karya tulis & bisnis mahasiswa", "Magang di unit usaha KOPMA", "Kunjungan studi ke koperasi nasional"],
    weights: { sosial: 2, akademik: 3, kompetitif: 1 },
  },
  {
    id: "kmhd",
    name: "KMHD UGM",
    emoji: "🌸",
    gradient: "linear-gradient(135deg,#b45309,#78350f)",
    accent: "#fcd34d",
    keywords: ["Hindu", "Dharma", "Budaya"],
    caption: "Wadah mahasiswa Hindu UGM untuk pengembangan spiritual, budaya, dan persaudaraan.",
    detail: "Keluarga Mahasiswa Hindu Dharma (KMHD) UGM adalah persekutuan mahasiswa Hindu yang aktif dalam kegiatan keagamaan, pelestarian budaya Bali/Hindu, dan pengembangan diri. Komunitas ini menjadi rumah kedua bagi mahasiswa Hindu dari seluruh Indonesia.",
    activities: ["Persembahyangan bersama & hari raya Hindu", "Pelatihan tari Bali & gamelan", "Dharma wacana & diskusi filosofi Hindu", "Pengiriman delegasi ke Pesta Kesenian Bali", "Bakti sosial & kegiatan adat"],
    weights: { spiritual: 3, sosial: 2, kreatif: 1 },
  },
  {
    id: "bulu",
    name: "UKM Bulutangkis",
    emoji: "🏸",
    gradient: "linear-gradient(135deg,#d97706,#92400e)",
    accent: "#fde68a",
    keywords: ["Smash", "Rally", "Agility"],
    caption: "Dari latihan rutin hingga kompetisi nasional — ayo buktikan skill di lapangan!",
    detail: "UKM Bulutangkis UGM mengembangkan atlet bulutangkis dari level pemula hingga kompetitif. Dengan tradisi prestasi yang kuat di kompetisi mahasiswa nasional, UKM ini memadukan latihan serius dengan suasana kekeluargaan yang hangat.",
    activities: ["Latihan teknik & footwork 4x seminggu", "Turnamen internal & antar kampus", "Kompetisi POMNAS & kejuaraan nasional", "Coaching clinic dari mantan atlet nasional", "Liga bulutangkis mahasiswa Yogyakarta"],
    weights: { aktif: 3, kompetitif: 2, sosial: 2 },
  },
];

// ─── Helpers ──────────────────────────────────────────────────
export function emptyScores(): Scores {
  return {
    aktif: 0, kreatif: 0, kompetitif: 0, sosial: 0,
    spiritual: 0, akademik: 0, outdoor: 0, pertunjukan: 0,
  };
}

export function addScores(base: Scores, delta: Partial<Scores>, multiplier = 1): Scores {
  const out = { ...base };
  for (const k of Object.keys(delta) as ScoreKey[]) {
    out[k] += (delta[k] ?? 0) * multiplier;
  }
  return out;
}

export function calcMatch(userScores: Scores, card: UKMCard): number {
  let dot = 0;
  let cardMag = 0;
  for (const k of Object.keys(card.weights) as ScoreKey[]) {
    dot += (card.weights[k] ?? 0) * (userScores[k] ?? 0);
    cardMag += (card.weights[k] ?? 0) ** 2;
  }
  const userMag = Math.sqrt(
    (Object.values(userScores) as number[]).reduce((s, v) => s + v * v, 0)
  );
  if (cardMag === 0 || userMag === 0) return 0;
  const cosine = dot / (Math.sqrt(cardMag) * userMag);
  // scale 0-100, cosine already 0-1 for non-negative scores
  return Math.round(Math.min(100, Math.max(55, cosine * 100 + 45)));
}
