import { useState } from 'react';
import { Home, Dumbbell, ClipboardList, BarChart2, Settings, Play } from 'lucide-react';
import { useApp } from './context/AppContext';
import { useWorkout } from './context/WorkoutContext';
import { cn } from './lib/utils';
import Dashboard from './components/Dashboard';
import Planner from './components/Planner';
import Tracking from './components/Tracking';
import Analytics from './components/Analytics';
import SettingsView from './components/SettingsView';
import WorkoutEngine from './components/WorkoutEngine';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'home' | 'planner' | 'tracking' | 'analytics' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { isInitialized } = useApp();
  const { isActive: isWorkoutActive } = useWorkout();

  if (!isInitialized) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs">Initializing Vigor Vault</p>
      </div>
    );
  }

  if (isWorkoutActive) {
    return <WorkoutEngine />;
  }

  const tabs = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'planner', icon: Dumbbell, label: 'Plans' },
    { id: 'tracking', icon: ClipboardList, label: 'Log' },
    { id: 'analytics', icon: BarChart2, label: 'Stats' },
    { id: 'settings', icon: Settings, label: 'More' },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground max-w-md mx-auto relative overflow-hidden font-sans">
      {/* Top Header / App Shell */}
      <header className="px-6 pt-10 pb-2 flex justify-between items-end z-10">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
            Vigor Vault <span className="text-primary text-[10px] align-top border border-primary/30 px-1.5 py-0.5 rounded">v2.0</span>
          </h1>
          <p className="text-muted-foreground text-[10px] mt-1 uppercase tracking-[0.2em] font-semibold">Phase 1: Foundation • Offline</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">Database</p>
            <p className="text-[10px] text-green-500 flex items-center gap-1 font-bold">● Local</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-32 scroll-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'home' && <Dashboard />}
            {activeTab === 'planner' && <Planner />}
            {activeTab === 'tracking' && <Tracking />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'settings' && <SettingsView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav Overlay (Floating Style) */}
      <nav className="fixed bottom-8 left-0 right-0 px-6 z-20 flex justify-center pointer-events-none">
        <div className="bg-card/80 backdrop-blur-2xl border border-border px-4 py-2 rounded-full flex gap-1 shadow-2xl pointer-events-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300 flex items-center justify-center",
                  isActive ? "bg-primary text-black" : "text-muted-foreground hover:text-white"
                )}
              >
                <Icon size={18} strokeWidth={isActive ? 3 : 2} />
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
