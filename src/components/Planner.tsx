import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { storage, DBPlan } from '../modules/storage/StorageService';
import { Plus, Copy, Edit3, Trash2, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { WorkoutPlan } from '../types';

const ExerciseRow = ({ planId, dIdx, bIdx, eIdx, exercise, onUpdate }: any) => {
  const [name, setName] = useState(exercise.name);
  const [value, setValue] = useState(exercise.value || '');
  const [instructions, setInstructions] = useState(exercise.instructions || '');
  const [type, setType] = useState(exercise.type || 'reps');
  const [unit, setUnit] = useState(exercise.unit || 'reps');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setName(exercise.name);
    setValue(exercise.value || '');
    setInstructions(exercise.instructions || '');
    setType(exercise.type || 'reps');
    setUnit(exercise.unit || 'reps');
  }, [exercise]);

  const handleBlur = () => {
    if (name !== exercise.name || Number(value) !== exercise.value || instructions !== exercise.instructions || type !== exercise.type || unit !== exercise.unit) {
      onUpdate(planId, dIdx, bIdx, eIdx, { name, value: Number(value), instructions, type, unit });
    }
  };

  return (
    <div className="flex flex-col bg-black border border-zinc-800 rounded-xl group focus-within:border-primary/50 transition-colors overflow-hidden">
      <div className="flex items-center gap-2 p-2.5">
        <div className="w-5 h-5 shrink-0 flex items-center justify-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 hover:text-white p-1 transition-colors"
            >
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
        </div>
        <div className={cn(
          "w-1.5 h-6 rounded-full",
          exercise.type === 'rest' ? "bg-slate-700" : "bg-primary"
        )} />
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          onBlur={handleBlur}
          className={cn(
            "flex-1 bg-transparent border-none text-xs font-bold outline-none transition-colors",
            exercise.type === 'rest' ? "text-slate-400" : "text-white focus:text-primary"
          )}
        />
        <div className="flex items-center gap-1 bg-zinc-900 border-2 border-zinc-800 rounded-lg px-2 py-1 focus-within:border-primary focus-within:bg-black transition-all">
          <input 
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={handleBlur}
            className="w-10 bg-transparent border-none text-sm font-black text-center text-white outline-none"
          />
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
            <div className="p-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Target Type</h6>
                  <select 
                    value={type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      const newUnit = newType === 'time' || newType === 'rest' ? 'sec' : 'reps';
                      setType(newType);
                      setUnit(newUnit);
                      onUpdate(planId, dIdx, bIdx, eIdx, { ...exercise, type: newType, unit: newUnit, value: Number(value), instructions });
                    }}
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg text-xs py-2 px-3 text-slate-300 font-medium outline-none focus:border-primary appearance-none"
                  >
                    <option value="reps">Reps</option>
                    <option value="time">Time</option>
                    <option value="rest">Rest</option>
                  </select>
                </div>
                <div className="w-24">
                  <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Amount</h6>
                  <input 
                    type="number"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={handleBlur}
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg text-xs py-2 px-3 text-white font-bold outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Instructions</h6>
                <textarea 
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  onBlur={handleBlur}
                  className="w-full bg-black/50 border border-zinc-800 rounded-lg text-xs py-2 px-3 text-slate-300 font-medium leading-relaxed resize-none focus:border-primary transition-colors outline-none block"
                  rows={2}
                  placeholder="Add instructions, technique cues, etc..."
                />
              </div>
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

const DayView = ({ day, planId, dIdx, handleUpdateExercise }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden shadow-inner">
      <header 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-[10px] font-black text-white shadow-xl">
            D{day.day}
          </div>
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-tight">{day.dayName}</h5>
            <p className="text-[10px] text-primary italic font-bold tracking-widest uppercase">{day.focus}</p>
          </div>
        </div>
        <button className="text-slate-500 p-1">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </header>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-800"
          >
            <div className="p-4 space-y-4">
              {(!day.blocks || day.blocks.length === 0) && (
                <div className="p-4 rounded-xl bg-black border border-zinc-800 flex items-center justify-center">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">Rest Day</p>
                </div>
              )}
              {day.blocks?.map((block: any, bIdx: number) => (
                <div key={bIdx} className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 shadow-inner">
                  <div className="flex justify-between items-center mb-4">
                    <h6 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">
                      {block.blockName}
                    </h6>
                    <div className="px-2 py-0.5 bg-black border border-zinc-800 rounded text-[9px] font-black text-slate-400">
                      {block.rounds} RNDS
                    </div>
                  </div>
                  <div className="space-y-2">
                    {block.exercises.map((ex: any, eIdx: number) => (
                      <ExerciseRow 
                        key={eIdx}
                        planId={planId}
                        dIdx={dIdx}
                        bIdx={bIdx}
                        eIdx={eIdx}
                        exercise={ex}
                        onUpdate={handleUpdateExercise}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Planner() {
  const { plans, activePlanId, setActivePlan, refreshPlans } = useApp();
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(activePlanId);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleExpand = (planId: string) => {
    setExpandedPlanId(prev => prev === planId ? null : planId);
  };

  const handleUpdateExercise = async (planId: string, dIdx: number, bIdx: number, eIdx: number, updates: any) => {
    const plan = plans.find((p: any) => (p.planId || p.id) === planId) as DBPlan | undefined;
    if (!plan) return;
    
    // Deep clone to avoid mutating state directly
    const updatedPlan = JSON.parse(JSON.stringify(plan));
    const ex = updatedPlan.schedule[dIdx].blocks[bIdx].exercises[eIdx];
    
    if (updates.name !== undefined) ex.name = updates.name;
    if (updates.value !== undefined) ex.value = updates.value;
    if (updates.instructions !== undefined) ex.instructions = updates.instructions;
    if (updates.type !== undefined) ex.type = updates.type;
    if (updates.unit !== undefined) ex.unit = updates.unit;
    
    updatedPlan.updatedAt = Date.now();
    await storage.setPlan(updatedPlan);
    await refreshPlans();
  };

  return (
    <div className="space-y-6 pb-24">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Routines</h2>
          <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white">Plan Builder</h3>
        </div>
        <button className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-xl hover:bg-slate-200 transition-colors">
          <Plus size={24} />
        </button>
      </header>

      <section className="space-y-4">
        {plans.map((plan: any) => {
          const planId = plan.planId || plan.id;
          const isActive = planId === activePlanId;
          const isExpanded = planId === expandedPlanId;
          
          return (
            <motion.div
              key={planId}
              layout
              className={cn(
                "group relative bg-zinc-900 border rounded-[2rem] overflow-hidden transition-all shadow-xl",
                isActive ? "border-primary" : "border-zinc-800 hover:border-zinc-700"
              )}
            >
              {isActive && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl -mr-12 -mt-12 rounded-full pointer-events-none" />
              )}
              
              <div 
                className="p-6 cursor-pointer"
                onClick={() => {
                  setActivePlan(planId);
                  toggleExpand(planId);
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold uppercase tracking-tight text-white">{plan.title}</h4>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 italic">{plan.targetAudience}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {isActive && (
                      <div className="px-3 py-1 bg-primary text-black text-[9px] font-black rounded-full uppercase tracking-widest">Active</div>
                    )}
                    <div className="flex items-center gap-1 mt-auto" onClick={e => e.stopPropagation()}>
                      {deletingId === planId ? (
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            storage.deletePlan(planId).then(() => { refreshPlans(); setDeletingId(null); }); 
                          }} 
                          className="text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md bg-red-500/80 hover:bg-red-500 transition-colors shadow-lg"
                        >
                          Confirm
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setDeletingId(planId); 
                            setTimeout(() => setDeletingId(null), 3000); 
                          }} 
                          className="bg-black/40 border border-zinc-800/50 text-slate-500 hover:text-red-500 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                          title="Delete Plan"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {!isExpanded && (
                  <div className="flex -space-x-2">
                    {plan.schedule?.slice(0, 5).map((s: any, i: number) => (
                      <div key={i} className="w-7 h-7 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-[9px] font-bold text-slate-400">
                        D{s.day}
                      </div>
                    ))}
                    {plan.schedule?.length > 5 && (
                      <div className="w-7 h-7 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-[9px] font-bold text-slate-400">
                        +
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Expandable Schedule Area */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-zinc-800/80 bg-black/20"
                  >
                    <div className="p-6 space-y-8">
                      {(plan.schedule || []).map((day: any, dIdx: number) => (
                        <DayView 
                          key={dIdx}
                          day={day} 
                          planId={planId} 
                          dIdx={dIdx} 
                          handleUpdateExercise={handleUpdateExercise} 
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
