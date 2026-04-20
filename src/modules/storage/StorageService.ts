import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'vigor_vault_db';
const DB_VERSION = 1;

export interface DBPlan {
  id: string;
  planId?: string;
  name?: string;
  title?: string;
  blocks: any[];
  createdAt: number;
  updatedAt: number;
  targetAudience?: string;
  schedule: any[];
}

export interface DBLog {
  id: string;
  date: string; // YYYY-MM-DD
  type: 'workout' | 'metric';
  payload: any;
  createdAt: number;
}

class StorageService {
  private db: Promise<IDBPDatabase>;

  constructor() {
    this.db = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('plans')) {
          db.createObjectStore('plans', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('logs')) {
          db.createObjectStore('logs', { keyPath: 'id' });
          const logStore = db.transaction('logs', 'readonly').objectStore('logs');
          // Note: index creation is better here if needed, but we'll do in upgrade
        }
        // Metadata store
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata');
        }
      },
    });
    
    // Add indices in upgrade if needed, but for simple local app, range queries on keys often suffice
    // Actually, let's just use indices for logs by date
    this.db = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('plans')) {
          db.createObjectStore('plans', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('logs')) {
          const s = db.createObjectStore('logs', { keyPath: 'id' });
          s.createIndex('by-date', 'date');
        }
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata');
        }
      },
    });
  }

  async setPlan(plan: DBPlan) {
    const db = await this.db;
    await db.put('plans', plan);
  }

  async getPlans(): Promise<DBPlan[]> {
    const db = await this.db;
    return db.getAll('plans');
  }

  async deletePlan(id: string) {
    const db = await this.db;
    await db.delete('plans', id);
  }

  async addLog(log: DBLog) {
    const db = await this.db;
    await db.put('logs', log);
  }

  async getLogsByDateRange(start: string, end: string): Promise<DBLog[]> {
    const db = await this.db;
    const index = db.transaction('logs').store.index('by-date');
    return index.getAll(IDBKeyRange.bound(start, end));
  }

  async getAllLogs(): Promise<DBLog[]> {
    const db = await this.db;
    return db.getAll('logs');
  }

  async exportData(): Promise<string> {
    const plans = await this.getPlans();
    const logs = await this.getAllLogs();
    const data = {
      version: 2.0,
      timestamp: Date.now(),
      plans,
      logs
    };
    return JSON.stringify(data, null, 2);
  }

  async importData(jsonString: string) {
    const data = JSON.parse(jsonString);
    const db = await this.db;
    
    const tx = db.transaction(['plans', 'logs'], 'readwrite');
    // Clear and restore
    await tx.objectStore('plans').clear();
    await tx.objectStore('logs').clear();
    
    for (const plan of data.plans || []) {
      await tx.objectStore('plans').put(plan);
    }
    for (const log of data.logs || []) {
      await tx.objectStore('logs').put(log);
    }
    await tx.done;
  }
}

export const storage = new StorageService();
