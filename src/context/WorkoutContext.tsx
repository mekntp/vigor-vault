import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Exercise, WorkoutBlock, DayPlan } from '../types';

interface WorkoutContextType {
  currentDay: DayPlan | null;
  currentExerciseIndex: number;
  currentBlockIndex: number;
  currentRound: number;
  timeLeft: number;
  isActive: boolean;
  isPaused: boolean;
  isWorkoutComplete: boolean;
  startWorkout: (day: DayPlan) => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  nextExercise: () => void;
  prevExercise: () => void;
  quitWorkout: () => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [currentDay, setCurrentDay] = useState<DayPlan | null>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startWorkout = (day: DayPlan) => {
    setCurrentDay(day);
    setCurrentBlockIndex(0);
    setCurrentExerciseIndex(0);
    setCurrentRound(1);
    setIsActive(true);
    setIsPaused(false);
    setIsWorkoutComplete(false);
    
    const firstExercise = day.blocks[0]?.exercises[0];
    if (firstExercise?.type === 'time' || firstExercise?.type === 'rest') {
      setTimeLeft(firstExercise.value);
    }
  };

  const nextExercise = () => {
    if (!currentDay) return;
    
    const currentBlock = currentDay.blocks[currentBlockIndex];
    if (currentExerciseIndex < currentBlock.exercises.length - 1) {
      // Next exercise in same block
      const nextIdx = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIdx);
      const nextEx = currentBlock.exercises[nextIdx];
      if (nextEx.type === 'time' || nextEx.type === 'rest') setTimeLeft(nextEx.value);
    } else {
      // End of block exercises
      if (currentRound < currentBlock.rounds) {
        // Next round
        setCurrentRound(r => r + 1);
        setCurrentExerciseIndex(0);
        const nextEx = currentBlock.exercises[0];
        if (nextEx.type === 'time' || nextEx.type === 'rest') setTimeLeft(nextEx.value);
      } else {
        // Next block
        if (currentBlockIndex < currentDay.blocks.length - 1) {
          const nextBIdx = currentBlockIndex + 1;
          setCurrentBlockIndex(nextBIdx);
          setCurrentExerciseIndex(0);
          setCurrentRound(1);
          const nextEx = currentDay.blocks[nextBIdx].exercises[0];
          if (nextEx.type === 'time' || nextEx.type === 'rest') setTimeLeft(nextEx.value);
        } else {
          // Finished
          setIsWorkoutComplete(true);
          setIsActive(false);
        }
      }
    }
  };

  const prevExercise = () => {
    // Basic back logic
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(i => i - 1);
    }
  };

  const pauseWorkout = () => setIsPaused(true);
  const resumeWorkout = () => setIsPaused(false);
  const quitWorkout = () => {
    setIsActive(false);
    setCurrentDay(null);
  };

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive && !isPaused) {
      // Auto advance
      const currentBlock = currentDay?.blocks[currentBlockIndex];
      const currentEx = currentBlock?.exercises[currentExerciseIndex];
      if (currentEx?.type === 'time' || currentEx?.type === 'rest') {
        nextExercise();
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused, timeLeft]);

  return (
    <WorkoutContext.Provider value={{
      currentDay, currentExerciseIndex, currentBlockIndex, currentRound,
      timeLeft, isActive, isPaused, isWorkoutComplete,
      startWorkout, pauseWorkout, resumeWorkout, nextExercise, prevExercise, quitWorkout
    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) throw new Error('useWorkout must be used within WorkoutProvider');
  return context;
}
