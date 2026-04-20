import React, { useState } from 'react';
import { Save, Scale, Ruler, Heart, Activity, Moon, Zap, Coffee, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Tracking() {
  const [formType, setFormType] = useState<'daily' | 'weekly'>('daily');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // In a real app, we'd extract values from inputs
      // For this Bento demo, we'll log a structured entry
      await storage.addLog({
        id: `log-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'metric',
        payload: {
          category: formType,
          timestamp: Date.now()
        },
        createdAt: Date.now()
      });
      
      setTimeout(() => {
        setIsSaving(false);
        alert('Data persisted locally.');
      }, 500);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  const InputField = ({ icon: Icon, label, unit, type = "number", placeholder }: any) => (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center gap-4 transition-all focus-within:border-primary shadow-xl group">
      <div className="w-12 h-12 bg-black border border-zinc-800 rounded-xl flex items-center justify-center text-slate-500 group-focus-within:text-primary transition-colors">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="text-[9px] font-bold uppercase text-slate-500 tracking-widest mb-0.5">{label}</p>
        <input 
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none text-xl font-bold italic tracking-tight text-white placeholder:text-zinc-800" 
        />
      </div>
      {unit && <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{unit}</span>}
    </div>
  );

  return (
    <div className="space-y-6 pb-24">
      <header>
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Observation</h2>
        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white">Bio-Log</h3>
      </header>

      {/* Tab Switcher (Bento Style) */}
      <div className="flex p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-inner">
        <button 
          onClick={() => setFormType('daily')}
          className={cn(
            "flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all",
            formType === 'daily' ? "bg-white text-black shadow-lg" : "text-slate-500 hover:text-slate-300"
          )}
        >
          Daily Flow
        </button>
        <button 
          onClick={() => setFormType('weekly')}
          className={cn(
            "flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all",
            formType === 'weekly' ? "bg-white text-black shadow-lg" : "text-slate-500 hover:text-slate-300"
          )}
        >
          Weekly Report
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formType === 'daily' ? (
          <>
            <InputField icon={Activity} label="Steps Count" unit="Steps" placeholder="0" />
            <InputField icon={Zap} label="Work Capacity" unit="Kcal" placeholder="0" />
            <InputField icon={Moon} label="Sleep Recovery" unit="Hrs" placeholder="0.0" />
            <InputField icon={Coffee} label="CNS Arousal" unit="1-10" placeholder="5" />
            
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl focus-within:border-primary transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-black border border-zinc-800 rounded-xl flex items-center justify-center text-slate-500 group-focus-within:text-primary transition-colors">
                  <MessageSquare size={20} />
                </div>
                <p className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">Internal Narrative</p>
              </div>
              <textarea 
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-slate-300 placeholder:text-zinc-800 resize-none h-28"
                placeholder="Psychological state, pain points, or general feedback..."
              />
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <InputField icon={Scale} label="Body Mass" unit="KG" placeholder="0.0" />
            <InputField icon={Ruler} label="Visceral Fat (Waist)" unit="CM" placeholder="0.0" />
            <InputField icon={Heart} label="Vagal Tone (HRV)" unit="BPM" placeholder="0" />
            <InputField icon={Activity} label="Stamina Index" unit="1-100" placeholder="50" />
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSaving}
          className="w-full bg-primary h-16 rounded-[1.5rem] flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:bg-orange-600 transition-all disabled:opacity-50 mt-4 text-black"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Save size={18} />
              COMMIT TO LOCAL
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
