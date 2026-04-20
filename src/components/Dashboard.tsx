import { useApp } from '../context/AppContext';
import { useWorkout } from '../context/WorkoutContext';
import { DayPlan } from '../types';
import { TrendingUp, Calendar, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { plans, activePlanId } = useApp();
  const { startWorkout } = useWorkout();

  const activePlan = plans.find(p => (p as any).planId === activePlanId || (p as any).id === activePlanId);
  const today = format(new Date(), 'EEEE');
  const todayPlan = activePlan?.schedule.find(s => s.dayName === today);

  // Mock scoring for now
  const bedroomScore = 84;

  return (
    <div className="space-y-6 pb-10">
      {/* PRIMARY METRIC: Bedroom Score */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 shadow-2xl">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
        
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Bedroom Score</h2>
            <p className="text-xs text-slate-500 leading-tight italic">Heuristic Performance Index</p>
          </div>

          <div className="py-8 flex flex-col items-center">
            <span className="text-8xl font-black tracking-tighter text-primary">{bedroomScore}</span>
            <div className="text-green-500 text-[11px] font-bold mt-2 uppercase tracking-wider bg-green-500/10 px-2 py-0.5 rounded">
              +4.2% <span className="text-slate-600 font-normal ml-1 lowercase">vs last week</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex justify-between text-[10px] border-b border-zinc-800 pb-2">
              <span className="text-slate-400 font-bold tracking-widest uppercase">STAMINA</span>
              <span className="text-primary font-black uppercase italic">ELITE</span>
            </div>
            <div className="flex justify-between text-[10px] border-b border-zinc-800 pb-2">
              <span className="text-slate-400 font-bold tracking-widest uppercase">RECOVERY</span>
              <span className="text-primary font-black uppercase italic">92%</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400 font-bold tracking-widest uppercase">CONSISTENCY</span>
              <span className="text-primary font-black uppercase italic">OPTIMAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT WORKOUT: Activity Hub */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Next Session</h2>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              {todayPlan?.focus || "Recovery Ready"}
            </h3>
          </div>
          <div className="bg-primary text-black font-black px-3 py-1 rounded text-[10px] uppercase tracking-widest">32 MIN</div>
        </div>
        
        {todayPlan && todayPlan.blocks.length > 0 ? (
          <>
            <div className="bg-black/40 rounded-2xl p-4 border border-zinc-800/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 text-[10px] font-bold italic text-primary">GIF</div>
              <div className="flex-grow">
                <p className="text-sm font-bold text-white uppercase tracking-tight">{todayPlan.blocks[0].exercises[0].name}</p>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                  {todayPlan.blocks[0].exercises[0].value} {todayPlan.blocks[0].exercises[0].unit} • Chest, Core
                </p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => startWorkout(todayPlan)}
              className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-slate-200 transition-colors uppercase tracking-[0.15em] text-xs shadow-xl"
            >
              Start Workout
            </motion.button>
          </>
        ) : (
          <div className="bg-black/20 rounded-2xl p-8 flex flex-col items-center justify-center border border-dashed border-zinc-800">
            <Calendar className="text-zinc-700 mb-2" size={24} />
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">REST PROTOCOL ACTIVE</p>
          </div>
        )}
      </section>

      {/* BIOMETRICS Grid */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between h-40 shadow-xl">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Biometrics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Weight</p>
            <p className="text-2xl font-bold tracking-tighter italic">82.4<span className="text-xs font-normal ml-1 not-italic opacity-50">kg</span></p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Waist</p>
            <p className="text-2xl font-bold tracking-tighter italic text-primary">34.5<span className="text-xs font-normal ml-1 text-slate-100 not-italic opacity-50">in</span></p>
          </div>
        </div>
        <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Resting HR</p>
          <p className="text-lg font-bold tracking-tighter">58 <span className="text-[10px] text-green-500 font-bold ml-1 uppercase">-2 bpm</span></p>
        </div>
      </section>

      {/* Info Notice */}
      <section className="bg-zinc-800/50 border border-zinc-800 rounded-[2.5rem] p-6 flex gap-3 items-start backdrop-blur-sm shadow-xl">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <Info size={16} />
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider">
          <span className="text-primary font-bold mr-1">System Intelligence:</span>
          Your "Phase 1" progression suggests adding +2 reps to all main circuit exercises starting next Monday.
        </p>
      </section>
    </div>
  );
}
