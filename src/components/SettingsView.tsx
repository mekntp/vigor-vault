import { storage } from '../modules/storage/StorageService';
import { Download, Upload, ShieldCheck, Database, Info, HardDrive } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function SettingsView() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await storage.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vigor_vault_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        await storage.importData(content);
        window.location.reload();
      };
      reader.readAsText(file);
    } catch (err) {
      console.error(err);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 font-sans">
      <header>
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Configuration</h2>
        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white">System Ops</h3>
      </header>

      {/* Security Info (Wide Bento Card) */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 p-8 shadow-2xl flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-green-500/5 opacity-50 blur-3xl pointer-events-none" />
        <div className="w-20 h-20 rounded-full bg-black border border-zinc-800 flex items-center justify-center text-green-500 mb-6 shadow-xl relative z-10">
          <ShieldCheck size={40} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2 relative z-10 italic">Zero-Cloud Integrity</h3>
        <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-[0.15em] max-w-xs relative z-10">
          All performance metrics are stored strictly in your device's hardware enclave. No cloud, no trackers, absolute privacy.
        </p>
      </section>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Export Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-primary transition-all group shadow-xl"
        >
          <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
            <Download size={24} />
          </div>
          <div className="text-left flex-1">
            <h4 className="text-lg font-bold text-white uppercase tracking-tight italic">Export Routine</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Backup local data enclave</p>
          </div>
          {isExporting && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
        </motion.button>

        {/* Restore Card */}
        <motion.label
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-blue-500 transition-all group shadow-xl cursor-pointer"
        >
          <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-colors">
            <Upload size={24} />
          </div>
          <div className="text-left flex-1">
            <h4 className="text-lg font-bold text-white uppercase tracking-tight italic">Restore Data</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Load tactical backup</p>
          </div>
          <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          {isImporting && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
        </motion.label>
      </div>

      {/* Storage Hub */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-black border border-zinc-800 rounded-xl flex items-center justify-center text-slate-500">
             <Database size={18} />
           </div>
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">Storage Allocation</h3>
        </div>
        
        <div className="space-y-3">
          <div className="h-4 w-full bg-black border border-zinc-800 rounded-full overflow-hidden shadow-inner p-1">
            <div className="h-full bg-primary rounded-full w-[8%] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
             <span className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-primary" />
               Vault Database: ~450 KB
             </span>
             <span className="opacity-40 italic">Quota Responsive</span>
          </div>
        </div>
      </section>

      {/* System Footer */}
      <div className="flex flex-col items-center pt-10 pb-4">
        <div className="flex items-center gap-2 text-zinc-800 mb-2">
          <HardDrive size={12} />
          <div className="h-px w-24 bg-zinc-800" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Engine v2.0</span>
          <div className="h-px w-24 bg-zinc-800" />
        </div>
        <p className="text-[8px] text-zinc-900 font-black uppercase tracking-[0.8em]">Vigor Vault Logic</p>
      </div>
    </div>
  );
}
