import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { storage } from '../modules/storage/StorageService';
import { Plus, ChevronRight, Copy, Trash2, Edit3, GripVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { WorkoutPlan } from '../types';

export default function Planner() {
  const { plans, activePlanId, setActivePlan } = useApp();

  return (
    <div className="space-y-6">
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
          const isSelected = plan.planId === activePlanId || plan.id === activePlanId;
          const planId = plan.planId || plan.id;
          
          return (
            <motion.div
              key={planId}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePlan(planId)}
              className={cn(
                "group relative bg-zinc-900 border rounded-[2rem] p-6 overflow-hidden transition-all shadow-xl",
                isSelected ? "border-primary" : "border-zinc-800 hover:border-zinc-700"
              )}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl -mr-12 -mt-12 rounded-full" />
              )}
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h4 className="text-xl font-bold uppercase tracking-tight text-white">{plan.title}</h4>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 italic">{plan.targetAudience}</p>
                </div>
                {isSelected && (
                  <div className="px-3 py-1 bg-primary text-black text-[9px] font-black rounded-full uppercase tracking-widest">Active</div>
                )}
              </div>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-zinc-800">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-7 h-7 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-[9px] font-bold text-slate-400">
                      D{i}
                    </div>
                  ))}
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <button className="p-3 bg-zinc-800 text-slate-400 hover:text-white rounded-xl transition-colors border border-zinc-700">
                    <Copy size={16} />
                  </button>
                  <button className="p-3 bg-zinc-800 text-slate-400 hover:text-white rounded-xl transition-colors border border-zinc-700">
                    <Edit3 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      <div className="bg-zinc-900/50 rounded-[2rem] p-8 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-zinc-700 mb-4">
           <Plus size={24} />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">New Architecture</p>
        <p className="text-[10px] text-slate-600 leading-relaxed font-medium max-w-[200px] uppercase">
          Build a modular performance plan with custom blocks.
        </p>
      </div>
    </div>
  );
}
