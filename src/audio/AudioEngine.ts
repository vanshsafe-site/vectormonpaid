import { Howl, Howler } from 'howler';
import { MUSIC, SFX, type TrackDef } from './manifest';

/**
 * Thin Howler wrapper. Tracks with empty `src` are treated as silent no-ops so
 * the build and gameplay work without bundling any audio files.
 */
class AudioEngine {
  private howls = new Map<string, Howl | null>();
  private currentMusic: string | null = null;
  private muted = false;

  private ensure(def: TrackDef): Howl | null {
    if (this.howls.has(def.id)) return this.howls.get(def.id) ?? null;
    if (!def.src) {
      this.howls.set(def.id, null);
      return null;
    }
    const howl = new Howl({ src: [def.src], loop: def.loop, volume: def.volume });
    this.howls.set(def.id, howl);
    return howl;
  }

  playMusic(id: string): void {
    if (this.currentMusic === id) return;
    this.stopMusic();
    const def = MUSIC.find((t) => t.id === id);
    if (!def) return;
    this.currentMusic = id;
    this.ensure(def)?.play();
  }

  stopMusic(): void {
    if (!this.currentMusic) return;
    const def = MUSIC.find((t) => t.id === this.currentMusic);
    if (def) this.ensure(def)?.stop();
    this.currentMusic = null;
  }

  playSfx(id: string): void {
    const def = SFX.find((t) => t.id === id);
    if (!def) return;
    this.ensure(def)?.play();
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    Howler.mute(this.muted);
    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }
}

export const audio = new AudioEngine();
