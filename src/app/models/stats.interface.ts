export interface Stats {
  firstEntry: Date;
  daysCompleted: number;
  percentageCompleted: number;
  moodCount: { happy: number; medium: number; sad: number };
}
