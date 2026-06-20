// Audio manifest. Real OGG/MP3 files live under /public/audio. Entries with an
// empty `src` are placeholders so the game runs without committing copyrighted
// audio; the audio engine no-ops on empty sources.

export interface TrackDef {
  id: string;
  src: string;
  loop: boolean;
  volume: number;
}

export const MUSIC: TrackDef[] = [
  { id: 'menu', src: '', loop: true, volume: 0.6 },
  { id: 'trainerSelect', src: '', loop: true, volume: 0.6 },
  { id: 'battle', src: '', loop: true, volume: 0.6 },
  { id: 'fireRemix', src: '', loop: true, volume: 0.6 },
  { id: 'waterRemix', src: '', loop: true, volume: 0.6 },
  { id: 'natureRemix', src: '', loop: true, volume: 0.6 },
  { id: 'victory', src: '', loop: false, volume: 0.7 },
  { id: 'defeat', src: '', loop: false, volume: 0.7 },
];

export const SFX: TrackDef[] = [
  // UI
  { id: 'hover', src: '', loop: false, volume: 0.5 },
  { id: 'click', src: '', loop: false, volume: 0.6 },
  { id: 'confirm', src: '', loop: false, volume: 0.7 },
  // Battle
  { id: 'attack', src: '', loop: false, volume: 0.7 },
  { id: 'hit', src: '', loop: false, volume: 0.7 },
  { id: 'critical', src: '', loop: false, volume: 0.9 },
  { id: 'victorySfx', src: '', loop: false, volume: 0.8 },
  { id: 'defeatSfx', src: '', loop: false, volume: 0.8 },
  // Environment
  { id: 'wind', src: '', loop: true, volume: 0.3 },
  { id: 'lava', src: '', loop: true, volume: 0.3 },
  { id: 'water', src: '', loop: true, volume: 0.3 },
  { id: 'forest', src: '', loop: true, volume: 0.3 },
];

export type MusicId = (typeof MUSIC)[number]['id'];
export type SfxId = (typeof SFX)[number]['id'];
