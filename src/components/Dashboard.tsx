import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useWorkout } from '../context/WorkoutContext';
import { DayPlan } from '../types';
import { TrendingUp, Calendar, Info, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

const DashboardExerciseRow = ({ exercise }: { exercise: any; key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const hasDetails = !!(exercise.instructions || exercise.focus || exercise.breathing);

  return (
    <div className="flex flex-col bg-black border border-zinc-800 rounded-xl overflow-hidden transition-colors hover:border-zinc-700">
      <div 
        className={cn("flex items-center gap-3 p-3", hasDetails && "cursor-pointer")}
        onClick={() => hasDetails && setIsOpen(!isOpen)}
      >
        <div className="w-4 h-4 flex items-center justify-center">
          {hasDetails && (
            <button className="text-slate-600 hover:text-white transition-colors">
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>
        <div className={cn(
          "w-1.5 h-6 rounded-full",
          exercise.type === 'rest' ? "bg-slate-700" : "bg-primary"
        )} />
        <div className="flex-1">
          <p className={cn(
            "text-xs font-bold uppercase",
            exercise.type === 'rest' ? "text-slate-400" : "text-white"
          )}>
            {exercise.name}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1">
          <span className="text-sm font-black text-white">{exercise.value}</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{exercise.unit}</span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-800 bg-zinc-900/50"
          >
            <div className="p-4 space-y-3">
              {exercise.instructions && (
                <div>
                  <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Instructions</h6>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{exercise.instructions}</p>
                </div>
              )}
              {exercise.focus && (
                <div>
                  <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Focus</h6>
                  <p className="text-[10px] text-primary italic font-bold tracking-widest uppercase">{exercise.focus}</p>
                </div>
              )}
              {exercise.breathing && (
                <div>
                  <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Breathing</h6>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{exercise.breathing}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Dashboard() {
  const { plans, activePlanId, setActivePlan } = useApp();
  const { startWorkout } = useWorkout();

  const [selectedPlanId, setSelectedPlanId] = useState<string>(activePlanId);
  const [selectedDayName, setSelectedDayName] = useState<string>(format(new Date(), 'EEEE'));

  useEffect(() => {
    setSelectedPlanId(activePlanId);
  }, [activePlanId]);

  const activePlan = plans.find(p => (p as any).planId === selectedPlanId || (p as any).id === selectedPlanId) || plans.find(p => (p as any).planId === activePlanId || (p as any).id === activePlanId);
  const todayPlan = activePlan?.schedule.find(s => s.dayName === selectedDayName);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Mock scoring for now
  const bedroomScore = 84;

  return (
    <div className="space-y-6 pb-14 pt-4">
      {/* ROUTINE & DAY SELECTOR */}
      <section className="px-2 space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-2">Planned Routine</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-2">
            {plans.map((p: any) => {
              const pId = p.planId || p.id;
              const isSelected = pId === selectedPlanId;
              return (
                <button
                  key={pId}
                  onClick={() => setSelectedPlanId(pId)}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                    isSelected 
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                      : "bg-zinc-900 text-slate-500 border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  {p.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-2">Schedule Day</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-2">
            {daysOfWeek.map((day) => {
              const isSelected = day === selectedDayName;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDayName(day)}
                  className={cn(
                    "flex-shrink-0 w-11 h-11 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border flex flex-col items-center justify-center",
                    isSelected 
                      ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                      : "bg-zinc-900 text-slate-500 border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CURRENT WORKOUT: Activity Hub - NOW FIRST */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-12 -mt-12 rounded-full pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Target Protocol</h2>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              {todayPlan?.focus || "Recovery Ready"}
            </h3>
          </div>
          <div className="bg-zinc-800 text-slate-400 font-black px-3 py-1 rounded text-[10px] uppercase tracking-widest border border-zinc-700">32 MIN</div>
        </div>
        
        {todayPlan && todayPlan.blocks.length > 0 ? (
          <div className="space-y-6 relative z-10">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => startWorkout(todayPlan)}
              className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-slate-200 transition-colors uppercase tracking-[0.15em] text-xs shadow-xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Launch Session</span>
            </motion.button>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedPlanId}-${selectedDayName}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {todayPlan.blocks.map((block: any, bIdx: number) => (
                    <div key={bIdx} className="bg-black/40 border border-zinc-800/80 rounded-2xl p-4 shadow-inner">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">
                          {block.blockName}
                        </h6>
                        <div className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-black text-slate-400">
                          {block.rounds} RNDS
                        </div>
                      </div>
                      <div className="space-y-2">
                        {block.exercises.map((ex: any, eIdx: number) => (
                          <DashboardExerciseRow key={eIdx} exercise={ex} />
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="bg-black/20 rounded-2xl p-8 flex flex-col items-center justify-center border border-dashed border-zinc-800">
            <Calendar className="text-zinc-700 mb-2" size={24} />
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">REST PROTOCOL ACTIVE</p>
          </div>
        )}
      </section>

      {/* PRIMARY METRIC: Bedroom Score - NOW LOWER */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 shadow-xl">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
        
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Performance Index</h2>
            <p className="text-xs text-slate-500 leading-tight italic">Heuristic Bedroom Score</p>
          </div>

          <div className="py-8 flex flex-col items-center">
            <span className="text-7xl font-black tracking-tighter text-white">{bedroomScore}</span>
            <div className="text-green-500 text-[11px] font-bold mt-2 uppercase tracking-wider bg-green-500/10 px-2 py-0.5 rounded">
              +4.2% <span className="text-slate-600 font-normal ml-1 lowercase">vs last week</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex justify-between text-[10px] border-b border-zinc-800 pb-2">
              <span className="text-slate-400 font-bold tracking-widest uppercase">STAMINA</span>
              <span className="text-primary font-black uppercase italic">ELITE</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400 font-bold tracking-widest uppercase">CONSISTENCY</span>
              <span className="text-primary font-black uppercase italic">OPTIMAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* BIOMETRICS Grid */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between h-40 shadow-xl">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Biometrics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Weight</p>
            <p className="text-2xl font-bold tracking-tighter italic text-white">82.4<span className="text-xs font-normal ml-1 not-italic opacity-50">kg</span></p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Waist</p>
            <p className="text-2xl font-bold tracking-tighter italic text-primary">34.5<span className="text-xs font-normal ml-1 text-slate-100 not-italic opacity-50">in</span></p>
          </div>
        </div>
      </section>

      {/* Info Notice */}
      <section className="bg-zinc-800/10 border border-zinc-800/50 rounded-[2.5rem] p-6 flex gap-3 items-start backdrop-blur-sm shadow-xl">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <Info size={16} />
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider">
          <span className="text-primary font-bold mr-1 italic underline">SYSTEM ADVISORY:</span>
          Your "Phase 1" data suggests bumping volume on Monday's Main Circuit (+1 set).
        </p>
      </section>
    </div>
  );
}
