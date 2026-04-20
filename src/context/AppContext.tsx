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
    const dbPlans = await storage.getPlans();
    if (dbPlans.length === 0) {
      // Seed default plans if none exist
      for (const plan of DEFAULT_PLANS) {
        await storage.setPlan({
          ...plan,
          id: plan.planId,
          createdAt: Date.now(),
          updatedAt: Date.now()
        } as any);
      }
      const seeded = await storage.getPlans();
      setPlans(seeded);
      setActivePlanId(seeded[0]?.id || seeded[0]?.planId || null);
    } else {
      setPlans(dbPlans);
      // Try to get from local storage preferred plan
      const savedActiveId = localStorage.getItem('activePlanId');
      setActivePlanId(savedActiveId || dbPlans[0]?.id || null);
    }
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
