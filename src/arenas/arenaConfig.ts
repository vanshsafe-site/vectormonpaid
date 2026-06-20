import type { ArenaId } from '@/store/gameStore';

export interface ArenaConfig {
  id: ArenaId;
  name: string;
  fogColor: string;
  groundColor: string;
  accent: string;
  ambient: number;
}

export const ARENA_CONFIG: Record<ArenaId, ArenaConfig> = {
  crystalForest: {
    id: 'crystalForest',
    name: 'Crystal Forest',
    fogColor: '#0c2a22',
    groundColor: '#13352b',
    accent: '#5fe3b0',
    ambient: 0.55,
  },
  volcanicCrater: {
    id: 'volcanicCrater',
    name: 'Volcanic Crater',
    fogColor: '#2a0c08',
    groundColor: '#3a1410',
    accent: '#ff6a2b',
    ambient: 0.5,
  },
  skyTemple: {
    id: 'skyTemple',
    name: 'Sky Temple',
    fogColor: '#16243f',
    groundColor: '#22324f',
    accent: '#afd4ff',
    ambient: 0.7,
  },
  cyberGrid: {
    id: 'cyberGrid',
    name: 'Cyber Grid',
    fogColor: '#0a0a18',
    groundColor: '#10102a',
    accent: '#ff2bd0',
    ambient: 0.45,
  },
};
