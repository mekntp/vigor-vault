export interface Exercise {
  name: string;
  type: 'time' | 'reps' | 'rest';
  value: number;
  unit: 'sec' | 'reps';
  instructions?: string;
  focus?: string;
  breathing?: string;
}

export interface WorkoutBlock {
  blockName: string;
  rounds: number;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  planId: string;
  id?: string;
  title: string;
  targetAudience: string;
  primaryGoals: string[];
  globalRules: Record<string, string>;
  progression: Record<string, string>;
  schedule: DayPlan[];
  transferBenefits: Record<string, string>;
  createdAt?: number;
  updatedAt?: number;
}

export interface DayPlan {
  day: number;
  dayName: string;
  focus: string;
  blocks: WorkoutBlock[];
}

export interface SessionLog {
  planId: string;
  dayIndex: number;
  completedAt: number;
  duration: number;
  score?: number;
}

export interface WeeklyMetrics {
  weight: number;
  waist: number;
  restingHR: number;
  energy: number;
  sexStamina: number;
  sleepQuality: number;
  stress: number;
  steps?: number;
  calories?: number;
  sleepHours?: number;
  notes?: string;
}
