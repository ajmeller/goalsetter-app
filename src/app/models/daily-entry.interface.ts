import { Goal } from './goal.interface';

export interface DailyEntry {
  dailyId: number;
  date: Date;
  completed: boolean;
  comment: string;
  mood: string;
  goal: Goal;
}
