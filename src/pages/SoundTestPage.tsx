import { useGameStore } from '@/store/gameStore';
import { MUSIC, SFX } from '@/audio/manifest';
import { audio } from '@/audio/AudioEngine';
import { Button } from '@/ui/Button';

export function SoundTestPage() {
  const goTo = useGameStore((s) => s.goTo);
  return (
    <div className="page select">
      <h2>Sound Test</h2>
      <p className="footnote">Audio entries are placeholders until real assets are added.</p>
      <h4>Music</h4>
      <div className="grid grid-2">
        {MUSIC.map((t) => (
          <button key={t.id} className="card sound-card" onClick={() => audio.playMusic(t.id)}>{t.id}</button>
        ))}
      </div>
      <h4>SFX</h4>
      <div className="grid grid-3">
        {SFX.map((t) => (
          <button key={t.id} className="card sound-card" onClick={() => audio.playSfx(t.id)}>{t.id}</button>
        ))}
      </div>
      <Button variant="ghost" onClick={() => { audio.stopMusic(); goTo('menu'); }}>Back</Button>
    </div>
  );
}
