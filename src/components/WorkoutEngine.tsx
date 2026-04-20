import { useState, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useApp } from '../context/AppContext';
import { storage } from '../modules/storage/StorageService';
import { ChevronRight, ChevronLeft, Pause, Play, X, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function WorkoutEngine() {
  const {
    currentDay, currentExerciseIndex, currentBlockIndex, currentRound,
    timeLeft, isActive, isPaused, isWorkoutComplete,
    pauseWorkout, resumeWorkout, nextExercise, prevExercise, quitWorkout,
    duration, startTime
  } = useWorkout();

  const [showSummary, setShowSummary] = useState(false);
  const [isLogSaved, setIsLogSaved] = useState(false);

  useEffect(() => {
    if (isWorkoutComplete && !isLogSaved) {
      storage.addLog({
        id: `workout-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'workout',
        payload: {
          focus: currentDay?.focus,
          blocks: currentDay?.blocks.length,
          completedAt: Date.now(),
          duration: duration, // Capture total duration in seconds
          startTime: startTime
        },
        createdAt: Date.now()
      }).then(() => setIsLogSaved(true));
    }
  }, [isWorkoutComplete, isLogSaved, currentDay, duration, startTime]);

  if (isWorkoutComplete) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-primary" />
          </div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Session Complete</h2>
          <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs">Vigor Vault Logged</p>
        </motion.div>

        <div className="w-full bg-card border border-border p-6 rounded-2xl mb-8 space-y-4">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <span className="text-xs font-mono uppercase text-muted-foreground">Focus</span>
            <span className="font-bold uppercase italic">{currentDay?.focus}</span>
          </div>
          <div className="flex justify-between items-center border-b border-border pb-3">
            <span className="text-xs font-mono uppercase text-muted-foreground">Total Time</span>
            <span className="font-bold uppercase italic">{Math.floor(duration / 60)}m {duration % 60}s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase text-muted-foreground">Status</span>
            <span className="text-green-500 font-bold uppercase italic">Optimized</span>
          </div>
        </div>

        <button
          onClick={quitWorkout}
          className="w-full bg-primary py-4 rounded-xl font-black uppercase italic tracking-widest glow-primary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentBlock = currentDay?.blocks[currentBlockIndex];
  const currentExercise = currentBlock?.exercises[currentExerciseIndex];
  const nextExerciseInPlan = currentExerciseIndex < (currentBlock?.exercises.length || 0) - 1 
    ? currentBlock?.exercises[currentExerciseIndex + 1] 
    : (currentRound < (currentBlock?.rounds || 0)) 
      ? currentBlock?.exercises[0] 
      : currentDay?.blocks[currentBlockIndex + 1]?.exercises[0];

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col max-w-md mx-auto overflow-hidden font-sans py-3 md:py-6 relative">
      {/* Workout Header */}
      <header className="px-5 md:px-6 pt-2 pb-4 flex justify-between items-start shrink-0">
        <div className="flex flex-col pr-4">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-1">
            {currentDay?.dayName || "Workout"}
          </h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-snug">
            {currentDay?.focus || "Session Focus"}
          </p>
        </div>
        <button 
          onClick={quitWorkout}
          className="w-10 h-10 shrink-0 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors mt-1"
        >
          <X size={20} />
        </button>
      </header>

      {/* Main Exercise View (Bento Style) */}
      <main className="flex-1 px-5 md:px-6 flex flex-col justify-start pb-4 gap-2 min-h-0 overflow-y-auto no-scrollbar w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentBlockIndex}-${currentExerciseIndex}-${currentRound}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex flex-col gap-4 max-h-full w-full"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-5 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center w-full">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                <p className="text-[11px] md:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full shrink-0 truncate max-w-full">
                  {currentBlock?.blockName} • Round {currentRound} of {currentBlock?.rounds}
                </p>
                
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight mb-6 md:mb-8 text-white min-h-[3rem] flex items-center justify-center shrink-0 w-full">
                  {currentExercise?.name}
                </h1>

                {/* Progress Visual */}
                <div className="relative mb-6 md:mb-8 shrink-0">
                  {currentExercise?.type === 'time' || currentExercise?.type === 'rest' ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-zinc-800 flex items-center justify-center relative bg-black/40 shadow-inner">
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                          <motion.circle
                            cx="50" cy="50" r="47"
                            className="stroke-primary fill-none"
                            strokeWidth="3"
                            strokeDasharray="295"
                            animate={{ strokeDashoffset: 295 * (1 - timeLeft / (currentExercise?.value || 1)) }}
                            transition={{ duration: 1, ease: "linear" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-7xl font-bold tracking-tighter text-white tabular-nums">{timeLeft}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-zinc-800 flex flex-col items-center justify-center bg-black/40 shadow-inner">
                      <span className="text-7xl font-bold tracking-tighter text-white">{currentExercise?.value}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Reps</span>
                    </div>
                  )}
                </div>

                <div className="bg-black/40 rounded-2xl p-4 md:p-5 border border-zinc-700/50 w-full shrink-0">
                   <p className="text-xs md:text-sm font-semibold text-slate-300 leading-snug uppercase tracking-wide italic">
                    {currentExercise?.instructions || "Stay focused."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bento Controls */}
      <footer className="px-5 md:px-6 pb-8 pt-4 space-y-4 shrink-0 bg-background z-10 relative mt-auto border-t border-border/5">
        {nextExerciseInPlan && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-md">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Up Next</p>
              <p className="text-sm font-bold uppercase text-white truncate tracking-tight">{nextExerciseInPlan.name}</p>
            </div>
            <div className="text-[11px] font-bold bg-black border border-zinc-700 px-3 py-1.5 rounded-lg uppercase text-primary tracking-tighter shrink-0">
              {nextExerciseInPlan.value} {nextExerciseInPlan.unit}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={prevExercise}
            className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-slate-400 hover:text-white transition-all transform active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={currentExercise?.type === 'reps' ? nextExercise : isPaused ? resumeWorkout : pauseWorkout}
            className={cn(
              "flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-[0.1em] text-sm transition-all shadow-xl transform active:scale-95",
              currentExercise?.type === 'reps' ? "bg-white text-black" : (isPaused ? "bg-green-500 text-black px-4" : "bg-primary text-black px-4")
            )}
          >
            {currentExercise?.type === 'reps' ? (
              <>Done <ChevronRight size={16} /></>
            ) : isPaused ? (
              <>Resume <Play size={16} fill="black" /></>
            ) : (
              <>Hold <Pause size={16} fill="black" /></>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
