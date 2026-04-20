import { WeeklyMetrics, SessionLog } from '../../types';

export function calculateBedroomScore(metrics: Partial<WeeklyMetrics>, workoutHistory: SessionLog[]) {
  // Heuristic weights
  // Stamina (30%)
  // HR Health (20%)
  // Energy (15%)
  // Waist (15%) - lower is better relative to height/standard
  // Consistency (20%)
  
  const baseStamina = metrics.sexStamina || 50;
  const hrScore = Math.max(0, 100 - ((metrics.restingHR || 70) - 50) * 2); 
  const energyScore = (metrics.energy || 5) * 10;
  const waistScore = metrics.waist ? Math.max(0, 100 - (metrics.waist - 80) * 2) : 50;
  
  const recentWorkouts = workoutHistory.slice(-7).length;
  const consistencyScore = (recentWorkouts / 7) * 100;

  const score = (
    (baseStamina * 0.3) +
    (hrScore * 0.2) +
    (energyScore * 0.15) +
    (waistScore * 0.15) +
    (consistencyScore * 0.2)
  );

  return Math.round(Number.isNaN(score) ? 50 : Math.min(100, Math.max(0, score)));
}
