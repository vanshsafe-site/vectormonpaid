import type { Trainer } from '@/types';

// 12 original trainers. Names are placeholders.
export const TRAINERS: Trainer[] = [
  { id: 'alex', name: 'Alex', gender: 'male', color: '#4f7cff' },
  { id: 'kai', name: 'Kai', gender: 'male', color: '#2bb3a3' },
  { id: 'rex', name: 'Rex', gender: 'male', color: '#d65a2b' },
  { id: 'zane', name: 'Zane', gender: 'male', color: '#7a5cff' },
  { id: 'leo', name: 'Leo', gender: 'male', color: '#e0a92b' },
  { id: 'finn', name: 'Finn', gender: 'male', color: '#2b9ed6' },
  { id: 'maya', name: 'Maya', gender: 'female', color: '#ff5c97' },
  { id: 'luna', name: 'Luna', gender: 'female', color: '#9b7cff' },
  { id: 'iris', name: 'Iris', gender: 'female', color: '#cf5cff' },
  { id: 'nova', name: 'Nova', gender: 'female', color: '#ff7c4f' },
  { id: 'skye', name: 'Skye', gender: 'female', color: '#4fd6ff' },
  { id: 'aria', name: 'Aria', gender: 'female', color: '#ff4f6d' },
];

export const TRAINERS_BY_ID: Record<string, Trainer> = Object.fromEntries(
  TRAINERS.map((t) => [t.id, t]),
);
