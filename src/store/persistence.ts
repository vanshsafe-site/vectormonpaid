// LocalStorage-backed persistence for progress and unlocks.

const KEY = 'vectormon.save.v1';

export interface SaveData {
  champion: boolean;
  wins: number;
  defeatedTrainerIds: string[];
  unlockedMonsterIds: string[];
}

export const EMPTY_SAVE: SaveData = {
  champion: false,
  wins: 0,
  defeatedTrainerIds: [],
  unlockedMonsterIds: [],
};

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY_SAVE };
    return { ...EMPTY_SAVE, ...(JSON.parse(raw) as Partial<SaveData>) };
  } catch {
    return { ...EMPTY_SAVE };
  }
}

export function persistSave(data: SaveData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors (private mode, quota, etc.).
  }
}
