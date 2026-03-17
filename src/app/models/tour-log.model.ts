export interface TourLog {
  date: string;          // z. B. 2026-03-17
  time: string;          // z. B. 14:30
  rating: number;        // 0 bis 5
  difficulty: number;    // 0 bis 10
  totalDistanceKm: number;
  totalTimeMin: number;
  comment: string;
}