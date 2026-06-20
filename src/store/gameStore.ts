import { create } from 'zustand';
import type {
  BattleLogEntry,
  BattlePhase,
  BattleTeam,
  Move,
  Trainer,
} from '@/types';
import { TRAINERS } from '@/trainers/data';
import { MONSTERS } from '@/monsters/data';
import { ShuffleBag } from '@/utils/shuffleBag';
import { shuffle } from '@/utils/rng';
import {
  createTeam,
  activeMonster,
  teamDefeated,
  effectiveSpeed,
  performAttack,
  applyBurnTick,
  chooseAiMove,
} from '@/battle/engine';
import { audio } from '@/audio/AudioEngine';
import { loadSave, persistSave, type SaveData } from './persistence';

export type Screen =
  | 'menu'
  | 'trainerSelect'
  | 'teamSelect'
  | 'battle'
  | 'gallery'
  | 'soundTest';

export type ArenaId = 'crystalForest' | 'volcanicCrater' | 'skyTemple' | 'cyberGrid';
const ARENAS: ArenaId[] = ['crystalForest', 'volcanicCrater', 'skyTemple', 'cyberGrid'];

export type CameraMode = 'idle' | 'attack' | 'hit' | 'critical' | 'victory';

let logId = 0;

interface GameState {
  screen: Screen;
  save: SaveData;

  playerTrainer: Trainer | null;
  selectedTeam: string[];
  endlessMode: boolean;

  bag: ShuffleBag<Trainer> | null;
  currentOpponent: Trainer | null;

  phase: BattlePhase;
  player: BattleTeam | null;
  opponent: BattleTeam | null;
  arena: ArenaId;
  cameraMode: CameraMode;
  log: BattleLogEntry[];
  busy: boolean;

  // navigation
  goTo: (screen: Screen) => void;
  chooseTrainer: (trainer: Trainer) => void;
  toggleTeamMember: (speciesId: string) => void;
  startEndless: () => void;
  confirmTeam: () => void;

  // battle
  playerMove: (move: Move) => void;
  continueAfterBattle: () => void;
  setCamera: (mode: CameraMode) => void;
}

function pushLog(entries: BattleLogEntry[], lines: string[]): BattleLogEntry[] {
  const next = [...entries];
  for (const text of lines) next.push({ id: ++logId, text });
  return next.slice(-6);
}

function randomTeamFor(): string[] {
  return shuffle(MONSTERS.map((m) => m.id)).slice(0, 2);
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'menu',
  save: loadSave(),

  playerTrainer: null,
  selectedTeam: [],
  endlessMode: false,

  bag: null,
  currentOpponent: null,

  phase: 'intro',
  player: null,
  opponent: null,
  arena: 'crystalForest',
  cameraMode: 'idle',
  log: [],
  busy: false,

  goTo: (screen) => {
    if (screen === 'menu') audio.playMusic('menu');
    if (screen === 'trainerSelect') audio.playMusic('trainerSelect');
    set({ screen });
  },

  chooseTrainer: (trainer) => {
    const pool = TRAINERS.filter((t) => t.id !== trainer.id);
    set({
      playerTrainer: trainer,
      bag: new ShuffleBag(pool),
      selectedTeam: [],
      screen: 'teamSelect',
    });
    audio.playSfx('confirm');
  },

  toggleTeamMember: (speciesId) => {
    const { selectedTeam } = get();
    if (selectedTeam.includes(speciesId)) {
      set({ selectedTeam: selectedTeam.filter((id) => id !== speciesId) });
    } else if (selectedTeam.length < 2) {
      set({ selectedTeam: [...selectedTeam, speciesId] });
    }
    audio.playSfx('click');
  },

  startEndless: () => {
    set({ endlessMode: true });
    get().goTo('trainerSelect');
  },

  confirmTeam: () => {
    const { playerTrainer, selectedTeam, bag } = get();
    if (!playerTrainer || selectedTeam.length !== 2 || !bag) return;
    startNextBattle(set, get, playerTrainer, selectedTeam, bag);
  },

  setCamera: (mode) => set({ cameraMode: mode }),

  playerMove: (move) => {
    const state = get();
    if (state.busy || state.phase !== 'select' || !state.player || !state.opponent) return;
    void resolveTurn(set, get, move);
  },

  continueAfterBattle: () => {
    const { playerTrainer, selectedTeam, bag, phase } = get();
    if (phase === 'defeat') {
      get().goTo('menu');
      return;
    }
    if (!playerTrainer || !bag) return;
    startNextBattle(set, get, playerTrainer, selectedTeam, bag);
  },
}));

function startNextBattle(
  set: (partial: Partial<GameState>) => void,
  get: () => GameState,
  trainer: Trainer,
  team: string[],
  bag: ShuffleBag<Trainer>,
): void {
  const opponent = bag.next();
  const arena = ARENAS[(get().save.wins) % ARENAS.length];
  const playerTeam = createTeam(trainer, team);
  const opponentTeam = createTeam(opponent, randomTeamFor());
  audio.playMusic('battle');
  set({
    screen: 'battle',
    currentOpponent: opponent,
    player: playerTeam,
    opponent: opponentTeam,
    arena,
    phase: 'select',
    cameraMode: 'idle',
    busy: false,
    log: pushLog([], [`${opponent.name} wants to battle!`, 'Choose your move.']),
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function resolveTurn(
  set: (partial: Partial<GameState>) => void,
  get: () => GameState,
  playerMove: Move,
): Promise<void> {
  const player = get().player!;
  const opponent = get().opponent!;
  const pMon = activeMonster(player);
  const oMon = activeMonster(opponent);
  const oMove = chooseAiMove(oMon, pMon);

  set({ busy: true, phase: 'resolving' });

  // Determine order by effective speed.
  const playerFirst = effectiveSpeed(pMon) >= effectiveSpeed(oMon);
  const order: Array<'player' | 'opponent'> = playerFirst
    ? ['player', 'opponent']
    : ['opponent', 'player'];

  for (const side of order) {
    if (teamDefeated(player) || teamDefeated(opponent)) break;
    const atk = side === 'player' ? pMon : oMon;
    const def = side === 'player' ? oMon : pMon;
    if (atk.fainted) continue;
    const move = side === 'player' ? playerMove : oMove;

    audio.playSfx('attack');
    set({ cameraMode: 'attack' });
    await delay(450);

    const result = performAttack(atk, def, move);
    if (result.critical) {
      audio.playSfx('critical');
      set({ cameraMode: 'critical' });
    } else if (!result.missed) {
      audio.playSfx('hit');
      set({ cameraMode: 'hit' });
    }
    set({ log: pushLog(get().log, result.log), player: { ...player }, opponent: { ...opponent } });
    await delay(650);
    set({ cameraMode: 'idle' });

    // Handle a fainted active: auto-switch to next available.
    if (def.fainted) {
      const defTeam = side === 'player' ? opponent : player;
      const nextIdx = defTeam.monsters.findIndex((m) => !m.fainted);
      if (nextIdx >= 0) {
        defTeam.activeIndex = nextIdx;
        set({
          player: { ...player },
          opponent: { ...opponent },
          log: pushLog(get().log, [`${defTeam.trainer.name} sent out ${defTeam.monsters[nextIdx].name}!`]),
        });
        await delay(500);
      }
    }
  }

  // End-of-turn burn ticks for both active monsters.
  for (const mon of [activeMonster(player), activeMonster(opponent)]) {
    if (teamDefeated(player) || teamDefeated(opponent)) break;
    const tick = applyBurnTick(mon);
    if (tick.log.length) {
      set({ log: pushLog(get().log, tick.log), player: { ...player }, opponent: { ...opponent } });
      await delay(450);
    }
  }

  // Resolve outcome.
  if (teamDefeated(opponent)) {
    finishVictory(set, get);
    return;
  }
  if (teamDefeated(player)) {
    audio.playMusic('defeat');
    set({ phase: 'defeat', cameraMode: 'idle', busy: false, log: pushLog(get().log, ['You were defeated\u2026']) });
    return;
  }

  set({ phase: 'select', busy: false });
}

function finishVictory(
  set: (partial: Partial<GameState>) => void,
  get: () => GameState,
): void {
  audio.playMusic('victory');
  const state = get();
  const opponentId = state.currentOpponent?.id;
  const save: SaveData = { ...state.save };
  save.wins += 1;
  if (opponentId && !save.defeatedTrainerIds.includes(opponentId)) {
    save.defeatedTrainerIds.push(opponentId);
  }
  // Champion when all 11 opponents have been beaten at least once.
  if (save.defeatedTrainerIds.length >= TRAINERS.length - 1) save.champion = true;
  persistSave(save);
  set({
    phase: 'victory',
    cameraMode: 'victory',
    busy: false,
    save,
    log: pushLog(get().log, ['You won the battle!']),
  });
}
