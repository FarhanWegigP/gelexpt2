export type Category = "olahraga" | "seni" | "rohani" | "khusus";

export interface QuizOption {
  text: string;
  scores: Partial<Record<Category, number>>;
}

export interface QuizQuestion {
  id: number;
  text: string;
  emoji: string;
  options: QuizOption[];
  mood: "curious" | "excited" | "amazed" | "thinking";
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Bagaimana kamu biasanya menghabiskan waktu luang?",
    emoji: "⏰",
    mood: "curious",
    options: [
      { text: "Bergerak aktif — olahraga, latihan, atau kompetisi fisik", scores: { olahraga: 3 } },
      { text: "Berkreasi — melukis, menyanyi, menulis, atau berkarya seni", scores: { seni: 3 } },
      { text: "Berefleksi — membaca, berdoa, atau merenung sendiri", scores: { rohani: 2, khusus: 1 } },
      { text: "Bersosialisasi — ngobrol, diskusi, atau membangun relasi", scores: { rohani: 1, khusus: 2 } },
    ],
  },
  {
    id: 2,
    text: "Peran apa yang paling nyaman bagimu dalam sebuah tim?",
    emoji: "🤝",
    mood: "excited",
    options: [
      { text: "Pemimpin di depan — menggerakkan dan memotivasi semua orang", scores: { olahraga: 2, khusus: 1 } },
      { text: "Eksekutor di belakang — memastikan semuanya berjalan lancar", scores: { khusus: 3 } },
      { text: "Kreator ide — mencetuskan gagasan-gagasan segar dan inovatif", scores: { seni: 2, khusus: 1 } },
      { text: "Penjaga harmoni — menjaga kebersamaan dan kenyamanan tim", scores: { rohani: 3 } },
    ],
  },
  {
    id: 3,
    text: "Jenis pencapaian apa yang paling membuatmu bangga?",
    emoji: "🏆",
    mood: "amazed",
    options: [
      { text: "Menang kompetisi — menjadi yang terbaik di bidangku", scores: { olahraga: 3 } },
      { text: "Tampil di panggung — diakui karena ekspresi dan karyaku", scores: { seni: 3 } },
      { text: "Membantu orang lain — melihat orang-orang di sekitarku tumbuh", scores: { rohani: 3 } },
      { text: "Menciptakan sesuatu — hasil karya nyata yang bisa dilihat", scores: { seni: 2, khusus: 1 } },
    ],
  },
  {
    id: 4,
    text: "Lingkungan mana yang paling membuatmu berkembang?",
    emoji: "🌱",
    mood: "thinking",
    options: [
      { text: "Lapangan terbuka — bergerak, keringat, dan semangat tim", scores: { olahraga: 3 } },
      { text: "Studio kreatif — penuh warna, suara, dan ekspresi tanpa batas", scores: { seni: 3 } },
      { text: "Ruang diskusi intelektual — penuh argumen, data, dan analisis", scores: { khusus: 3 } },
      { text: "Komunitas spiritual — tenang, bermakna, dan penuh nilai", scores: { rohani: 3 } },
    ],
  },
  {
    id: 5,
    text: "Kata mana yang paling menggambarkan dirimu?",
    emoji: "✨",
    mood: "curious",
    options: [
      { text: "Kompetitif — selalu ingin menjadi yang terbaik", scores: { olahraga: 3 } },
      { text: "Ekspresif — mudah mengungkapkan perasaan lewat seni", scores: { seni: 3 } },
      { text: "Analitis — suka berpikir dalam dan mencari jawaban", scores: { khusus: 3 } },
      { text: "Empatik — peka terhadap perasaan orang lain", scores: { rohani: 3 } },
    ],
  },
  {
    id: 6,
    text: "Apa yang paling ingin kamu dapatkan dari UKM?",
    emoji: "🎯",
    mood: "excited",
    options: [
      { text: "Prestasi dan trofi — rekam jejak atas kemampuanku", scores: { olahraga: 3 } },
      { text: "Pengalaman tampil — ruang untuk berekspresi", scores: { seni: 3 } },
      { text: "Jaringan dan relasi — koneksi luas yang berguna", scores: { khusus: 2, rohani: 1 } },
      { text: "Pertumbuhan diri — menjadi versi diriku yang lebih baik", scores: { rohani: 2, khusus: 1 } },
    ],
  },
  {
    id: 7,
    text: "Bagaimana reaksimu saat menghadapi tantangan besar?",
    emoji: "⚡",
    mood: "amazed",
    options: [
      { text: "Langsung terjun dan coba — belajar dari kegagalan", scores: { olahraga: 3 } },
      { text: "Rencanakan dulu dengan matang — persiapan adalah kunci", scores: { khusus: 3 } },
      { text: "Cari inspirasi dari orang lain — karya mereka menyemangatiku", scores: { seni: 2, khusus: 1 } },
      { text: "Minta dukungan komunitas — bersama pasti lebih kuat", scores: { rohani: 3 } },
    ],
  },
  {
    id: 8,
    text: "Bayangkan hari ideal di kampus. Pilihanmu adalah...",
    emoji: "📅",
    mood: "thinking",
    options: [
      { text: "Latihan fisik di pagi hari, sore ikut sesi sparring", scores: { olahraga: 3 } },
      { text: "Latihan seni, rehearsal, lalu nonton penampilan teman", scores: { seni: 3 } },
      { text: "Diskusi, riset, menulis laporan, lalu presentasi", scores: { khusus: 3 } },
      { text: "Kegiatan sosial, kajian, ibadah bersama, dan refleksi", scores: { rohani: 3 } },
    ],
  },
];

export interface UKMResult {
  name: string;
  short: string;
  headline: string;
  desc: string;
  why: string;
  examples: string[];
  color: string;
  emoji: string;
  constellation: [number, number][];
  constLinks: [number, number][];
}

export const UKM_RESULTS: Record<Category, UKMResult> = {
  olahraga: {
    name: "UKM Olahraga",
    short: "OLAHRAGA UGM",
    headline: "Orbit Atletik & Kompetisi",
    desc: "Jiwamu adalah kompetisi dan semangat juang. Kamu akan berkembang pesat di UKM Olahraga — tempatmu berlatih keras, berprestasi, dan menemukan tim yang sama-sama lapar akan kemenangan.",
    why: "Berdasarkan jawabanmu, kamu paling cocok dengan lingkungan yang menantang secara fisik, berorientasi pada prestasi, dan penuh semangat tim.",
    examples: ["UKM Voli UGM", "UKM Basket UGM", "Esports UGM", "UKM Bulutangkis"],
    color: "#f97316",
    emoji: "⚡",
    constellation: [[100,20],[70,70],[130,70],[50,110],[150,110],[100,55]],
    constLinks: [[0,2],[0,1],[1,3],[2,4],[3,5],[4,5],[1,5],[2,5]],
  },
  seni: {
    name: "Komunitas Seni",
    short: "SENI & BUDAYA",
    headline: "Orbit Ekspresi & Kreasi",
    desc: "Kreativitasmu adalah kekuatan terbesarmu. Komunitas seni di UGM akan memberimu panggung untuk berekspresi, berkolaborasi, dan menciptakan karya yang meninggalkan jejak.",
    why: "Pola jawabanmu menunjukkan jiwa ekspresif dan orientasi pada kreasi. Kamu akan bersinar di lingkungan penuh seni dan pertunjukan.",
    examples: ["Paduan Suara Mahasiswa", "Tari Gaya Yogyakarta", "UFO Teater UGM", "UKM Fotografi"],
    color: "#a855f7",
    emoji: "🎨",
    constellation: [[100,15],[60,55],[85,90],[115,90],[140,55],[100,60]],
    constLinks: [[0,1],[0,4],[1,2],[4,3],[2,5],[3,5],[1,5],[4,5]],
  },
  rohani: {
    name: "UKM Rohani",
    short: "SPIRITUAL CAMPUS",
    headline: "Orbit Nilai & Makna",
    desc: "Empati dan kedalaman batinmu adalah anugerah. Di UKM Rohani, kamu akan menemukan komunitas yang mengedepankan nilai, kebersamaan, dan pertumbuhan jiwa yang bermakna.",
    why: "Jawabanmu mencerminkan jiwa yang empatik, orientasi pada harmoni, dan keinginan untuk tumbuh secara spiritual bersama komunitas.",
    examples: ["Jamaah Shalahuddin", "KMHD UGM", "Misa Kampus UGM", "KMK UGM"],
    color: "#06b6d4",
    emoji: "☮️",
    constellation: [[100,20],[140,60],[125,105],[75,105],[60,60],[100,65]],
    constLinks: [[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[1,5],[3,5]],
  },
  khusus: {
    name: "UKM Minat Khusus",
    short: "MINAT & KEPEMIMPINAN",
    headline: "Orbit Intelektual & Kepemimpinan",
    desc: "Analisis tajam dan jiwa kepemimpinanmu butuh ruang yang tepat. UKM Minat Khusus akan menantangmu untuk berpikir kritis, berkarya nyata, dan memimpin perubahan.",
    why: "Pola jawabanmu menunjukkan orientasi analitis kuat, kemampuan strategi, dan dorongan untuk menciptakan dampak yang terukur.",
    examples: ["MAPAGAMA", "KOPMA UGM", "UKESMA", "KSI UGM"],
    color: "#10b981",
    emoji: "🔬",
    constellation: [[100,15],[55,70],[80,115],[120,115],[145,70],[100,75]],
    constLinks: [[0,1],[0,4],[1,2],[4,3],[2,5],[3,5],[1,5],[4,5]],
  },
};

export const GANTARI_MOODS = {
  curious:  { expr: "🤔", tip: "Menarik!" },
  excited:  { expr: "😄", tip: "Bagus!" },
  amazed:   { expr: "✨", tip: "Wow!" },
  thinking: { expr: "💭", tip: "Hmm..." },
};
