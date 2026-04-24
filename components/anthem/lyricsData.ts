export interface LyricLine {
  time: number; // seconds
  id: string;
  en: string;
}

export const LYRICS: LyricLine[] = [
  { time: 0,   id: "Dari segala penjuru kita bersatu",      en: "From every corner we unite" },
  { time: 5,   id: "Di bawah langit Yogyakarta yang biru",  en: "Under the blue sky of Yogyakarta" },
  { time: 10,  id: "UKM-UKM berdiri tegak bersama",         en: "Student organizations stand tall together" },
  { time: 15,  id: "Membawa semangat tanpa batas jiwa",     en: "Carrying boundless spirit of the soul" },
  { time: 21,  id: "GELEX! Gelanggang Expo kita",           en: "GELEX! Our Gelanggang Expo" },
  { time: 26,  id: "Panggung budaya dan kreasi",            en: "Stage of culture and creation" },
  { time: 31,  id: "Di sini mimpi-mimpi kita menyala",      en: "Here our dreams ignite" },
  { time: 36,  id: "Bersama kita lebih berarti",            en: "Together we mean more" },
  { time: 42,  id: "Olahraga, seni, dan rohani",            en: "Sports, arts, and spirituality" },
  { time: 47,  id: "Semua berpadu dalam harmoni",           en: "All fused in harmony" },
  { time: 52,  id: "UGM bangga, kita berjaya",              en: "UGM is proud, we triumph" },
  { time: 57,  id: "GELEX dua ribu dua puluh enam!",        en: "GELEX two thousand twenty-six!" },
  { time: 63,  id: "Mari bergabung, jangan ragu lagi",      en: "Come join us, don't hesitate anymore" },
  { time: 68,  id: "Temukan UKM yang sesuai hati",          en: "Find the UKM that suits your heart" },
  { time: 73,  id: "Bersama membangun generasi",            en: "Together building generations" },
  { time: 78,  id: "Gadjah Mada jaya selamanya!",          en: "Gadjah Mada glorious forever!" },
];

export const TOTAL_DURATION = 84; // seconds
