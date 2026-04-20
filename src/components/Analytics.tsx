import { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TrendingUp, Ruler, Heart, Award, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { storage } from '../modules/storage/StorageService';
import { format, subDays, startOfDay, isSameDay } from 'date-fns';

const mockData = [
  { date: 'Mon', stamina: 40, weight: 85, hr: 72 },
  { date: 'Tue', stamina: 42, weight: 84.8, hr: 70 },
  { date: 'Wed', stamina: 45, weight: 84.5, hr: 68 },
  { date: 'Thu', stamina: 48, weight: 84.5, hr: 71 },
  { date: 'Fri', stamina: 55, weight: 84.2, hr: 65 },
  { date: 'Sat', stamina: 58, weight: 84.0, hr: 64 },
  { date: 'Sun', stamina: 60, weight: 83.8, hr: 63 },
];

export default function Analytics() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    storage.getAllLogs().then(setLogs);
  }, []);

  const volumeData = useMemo(() => {
    // Generate last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        date: format(date, 'EEE'),
        fullDate: date,
        minutes: 0
      };
    });

    logs.forEach(log => {
      if (log.type === 'workout' && log.payload?.duration) {
        const logDate = new Date(log.createdAt || log.payload.completedAt);
        const dayMatch = last7Days.find(d => isSameDay(d.fullDate, logDate));
        if (dayMatch) {
          dayMatch.minutes += Math.floor(log.payload.duration / 60);
        }
      }
    });

    return last7Days;
  }, [logs]);

  const heatmap = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      day: i,
      level: Math.floor(Math.random() * 4)
    }));
  }, []);

  return (
    <div className="space-y-6 pb-24 font-sans">
      <header>
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Intelligence</h2>
        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white">Performance Intel</h3>
      </header>

      {/* Heatmap Section */}
      <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Consistency Matrix</h3>
          <div className="flex gap-1.5">
             {[0, 1, 2, 3].map(l => (
               <div key={l} className={`w-2.5 h-2.5 rounded ${l === 0 ? 'bg-black border border-zinc-800' : l === 1 ? 'bg-primary/20' : l === 2 ? 'bg-primary/50' : 'bg-primary'}`} />
             ))}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {heatmap.map((d) => (
            <div 
              key={d.day} 
              className={`aspect-square rounded-lg ${
                d.level === 0 ? 'bg-black border border-zinc-800' : 
                d.level === 1 ? 'bg-primary/20' : 
                d.level === 2 ? 'bg-primary/50' : 'bg-primary'
              } shadow-inner transition-transform hover:scale-110 cursor-pointer`} 
            />
          ))}
        </div>
      </section>

      {/* Primary Trend (Bento Wide) */}
      <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
         <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
         
         <div className="flex items-center justify-between mb-8 relative z-10">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-[1rem] bg-black border border-zinc-800 flex items-center justify-center text-primary shadow-xl">
               <TrendingUp size={20} />
             </div>
             <div>
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Stamina Trend</h3>
               <p className="text-lg font-bold text-white uppercase tracking-tight">V02 Max Estimated</p>
             </div>
           </div>
           <div className="text-right">
             <span className="text-2xl font-bold tracking-tighter text-primary">64.2</span>
             <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest">+5.2%</p>
           </div>
         </div>
         
         <div className="h-40 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={mockData}>
               <defs>
                 <linearGradient id="colorStamina" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                   <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <Area type="monotone" dataKey="stamina" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorStamina)" />
               <Tooltip cursor={{ stroke: '#27272a', strokeWidth: 2 }} contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '10px', color: '#fff' }} />
             </AreaChart>
           </ResponsiveContainer>
         </div>
      </section>

      {/* Grid of smaller stats */}
      <div className="grid grid-cols-1 gap-4">
        <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2.5rem] shadow-xl">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-blue-500 shadow-lg">
               <Heart size={18} />
             </div>
             <div className="flex-1">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Recovery</h3>
               <p className="text-sm font-bold text-white uppercase tracking-tight">Resting Heart Rate</p>
             </div>
             <p className="text-xl font-bold tracking-tighter">58 <span className="text-[10px] font-normal opacity-50 ml-1">bpm</span></p>
           </div>
           <div className="h-24 w-full opacity-60">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={mockData}>
                 <Line type="monotone" dataKey="hr" stroke="#3b82f6" strokeWidth={3} dot={false} />
                 <Tooltip contentStyle={{ display: 'none' }} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2.5rem] shadow-xl">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-slate-300 shadow-lg">
               <Ruler size={18} />
             </div>
             <div className="flex-1">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Geometry</h3>
               <p className="text-sm font-bold text-white uppercase tracking-tight">Weight Variance</p>
             </div>
             <p className="text-xl font-bold tracking-tighter">82.4 <span className="text-[10px] font-normal opacity-50 ml-1">kg</span></p>
           </div>
           <div className="h-20 w-full opacity-40">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={mockData}>
                 <Line type="monotone" dataKey="weight" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </section>
      </div>

      {/* TRAINING VOLUME: Real Data */}
      <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-[1rem] bg-black border border-zinc-800 flex items-center justify-center text-primary shadow-xl">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Training Volume</h3>
            <p className="text-lg font-bold text-white uppercase tracking-tight">Active Minutes / Week</p>
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: '#27272a', opacity: 0.1 }}
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
              />
              <Bar 
                dataKey="minutes" 
                fill="#f97316" 
                radius={[6, 6, 0, 0]} 
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Insight Notice (Bento Style) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-primary border border-primary/20 rounded-[2.5rem] p-8 text-black shadow-[0_20px_50px_rgba(249,115,22,0.2)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
            <Award size={20} />
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Insight v2</h4>
        </div>
        <p className="text-base font-bold leading-tight italic">
          "Correlation confirmed: Morning ER spikes follow days with HRV above 65. Maintain existing sleep protocol for optimal stamina conversion."
        </p>
      </motion.div>
    </div>
  );
}
