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
    pauseWorkout, resumeWorkout, nextExercise, prevExercise, quitWorkout
  } = useWorkout();

  const [preStartCountdown, setPreStartCountdown] = useState(10);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (preStartCountdown > 0 && !isPaused) {
      const timer = setInterval(() => setPreStartCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [preStartCountdown, isPaused]);

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
          completedAt: Date.now()
        },
        createdAt: Date.now()
      }).then(() => setIsLogSaved(true));
    }
  }, [isWorkoutComplete, isLogSaved, currentDay]);

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

  if (preStartCountdown > 0) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(230,0,0,0.15),transparent_70%)]" />
        </div>
        
        <motion.div
          key={preStartCountdown}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="relative z-10"
        >
          <span className="text-[12rem] font-black italic tracking-tighter leading-none text-primary">{preStartCountdown}</span>
        </motion.div>
        
        <div className="mt-12 text-center relative z-10 px-8">
          <p className="text-xs font-bold font-mono tracking-[0.3em] uppercase text-muted-foreground mb-4">Starting Session</p>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 text-white">{currentDay?.focus}</h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Get ready for {currentDay?.blocks[0].exercises[0].name}</p>
        </div>

        <button
          onClick={() => setPreStartCountdown(0)}
          className="absolute bottom-12 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10"
        >
          Skip Countdown
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
    <div className="h-screen w-full bg-background flex flex-col max-w-md mx-auto overflow-hidden font-sans">
      {/* Workout Header */}
      <header className="px-8 pt-12 pb-6 flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
            BLOCK {currentBlockIndex + 1} • ROUND {currentRound}/{currentBlock?.rounds}
          </p>
          <h2 className="text-xl font-bold uppercase tracking-tight text-white">{currentBlock?.blockName}</h2>
        </div>
        <button 
          onClick={quitWorkout}
          className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </header>

      {/* Main Exercise View (Bento Style) */}
      <main className="flex-1 px-8 flex flex-col justify-center gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentBlockIndex}-${currentExerciseIndex}-${currentRound}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-6 border border-primary/20 px-3 py-1 rounded-full">Active Intent</p>
                
                <h1 className="text-3xl font-bold uppercase tracking-tight leading-tight mb-10 text-white min-h-[4rem] flex items-center">
                  {currentExercise?.name}
                </h1>

                {/* Progress Visual */}
                <div className="relative mb-10">
                  {currentExercise?.type === 'time' || currentExercise?.type === 'rest' ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-48 h-48 rounded-full border-4 border-zinc-800 flex items-center justify-center relative bg-black/40 shadow-inner">
                        <svg className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none">
                          <motion.circle
                            cx="100" cy="100" r="96"
                            className="stroke-primary fill-none"
                            strokeWidth="4"
                            strokeDasharray="603"
                            animate={{ strokeDashoffset: 603 * (1 - timeLeft / (currentExercise?.value || 1)) }}
                            transition={{ duration: 1, ease: "linear" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-7xl font-bold tracking-tighter text-white tabular-nums">{timeLeft}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 rounded-full border-4 border-zinc-800 flex flex-col items-center justify-center bg-black/40 shadow-inner">
                      <span className="text-8xl font-bold tracking-tighter text-white">{currentExercise?.value}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Repetitions</span>
                    </div>
                  )}
                </div>

                <div className="bg-black/30 rounded-2xl p-4 border border-zinc-800 w-full max-w-xs">
                   <p className="text-[10px] font-medium text-slate-400 leading-relaxed uppercase tracking-wider italic">
                    {currentExercise?.instructions || "Maintain strict form and controlled breathing."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bento Controls */}
      <footer className="px-8 pb-12 pt-6 space-y-6">
        {nextExerciseInPlan && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 group transition-all hover:bg-zinc-800">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border border-zinc-800 text-slate-400 group-hover:text-primary transition-colors">
              <ChevronRight size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Next activity</p>
              <p className="text-xs font-bold uppercase text-white truncate tracking-tight">{nextExerciseInPlan.name}</p>
            </div>
            <div className="text-[10px] font-bold bg-black border border-zinc-800 px-2 py-1 rounded uppercase text-primary tracking-tighter">
              {nextExerciseInPlan.value} {nextExerciseInPlan.unit}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={prevExercise}
            className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center text-slate-500 hover:text-white transition-all transform hover:scale-105"
          >
            <ChevronLeft />
          </button>
          
          <button
            onClick={currentExercise?.type === 'reps' ? nextExercise : isPaused ? resumeWorkout : pauseWorkout}
            className={cn(
              "flex-1 h-16 rounded-[1.5rem] flex items-center justify-center gap-3 font-bold uppercase tracking-[0.15em] text-xs transition-all shadow-2xl transform active:scale-95",
              currentExercise?.type === 'reps' ? "bg-white text-black shadow-white/10" : (isPaused ? "bg-green-500 text-black shadow-green-500/20" : "bg-primary text-black shadow-primary/20")
            )}
          >
            {currentExercise?.type === 'reps' ? (
              <>COMMIT Set <ChevronRight size={18} /></>
            ) : isPaused ? (
              <>Resume Flow <Play size={18} fill="black" /></>
            ) : (
              <>Hold Pattern <Pause size={18} fill="black" /></>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
