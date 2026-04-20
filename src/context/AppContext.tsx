import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage, DBPlan } from '../modules/storage/StorageService';
import { DEFAULT_PLANS } from '../constants';
import { WorkoutPlan } from '../types';

interface AppContextType {
  plans: (WorkoutPlan | DBPlan)[];
  activePlanId: string | null;
  setActivePlan: (id: string) => void;
  refreshPlans: () => Promise<void>;
  isInitialized: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<(WorkoutPlan | DBPlan)[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const refreshPlans = async () => {
    let dbPlans = await storage.getPlans();
    
    // Always ensure the new optimized plan is available for the user
    const hasOptimized = dbPlans.find(p => p.id === 'phase-1-optimized' || (p as any).planId === 'phase-1-optimized');
    
    if (dbPlans.length === 0 || !hasOptimized) {
      // Seed default plans if none exist or if the new optimized one is missing
      for (const plan of DEFAULT_PLANS) {
        // If it's the missing one, or if no plans at all, add it
        if (dbPlans.length === 0 || !dbPlans.find(p => p.id === plan.planId)) {
          await storage.setPlan({
            ...plan,
            id: plan.planId,
            createdAt: Date.now(),
            updatedAt: Date.now()
          } as any);
        }
      }
      dbPlans = await storage.getPlans();
    }

    setPlans(dbPlans);
    // Try to get from local storage preferred plan
    const savedActiveId = localStorage.getItem('activePlanId');
    setActivePlanId(savedActiveId || dbPlans.find(p => p.id === 'phase-1-optimized')?.id || dbPlans[0]?.id || null);
  };

  useEffect(() => {
    refreshPlans().then(() => setIsInitialized(true));
  }, []);

  const setActivePlan = (id: string) => {
    setActivePlanId(id);
    localStorage.setItem('activePlanId', id);
  };

  return (
    <AppContext.Provider value={{ plans, activePlanId, setActivePlan, refreshPlans, isInitialized }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within AppProvider');
  return context;
}
