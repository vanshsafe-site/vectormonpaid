import { useGameStore } from '@/store/gameStore';
import { Button } from '@/ui/Button';

export function MenuPage() {
  const goTo = useGameStore((s) => s.goTo);
  const startEndless = useGameStore((s) => s.startEndless);
  const save = useGameStore((s) => s.save);

  return (
    <div className="page menu">
      <h1 className="title">VECTORMON</h1>
      <p className="subtitle">Small Scope. Massive Polish.</p>
      {save.champion && <p className="champion-tag">★ Champion Unlocked</p>}
      <div className="menu-actions">
        <Button onClick={() => goTo('trainerSelect')}>Battle</Button>
        <Button variant="ghost" onClick={startEndless}>Endless Mode</Button>
        <Button variant="ghost" onClick={() => goTo('gallery')}>Galleries</Button>
        <Button variant="ghost" onClick={() => goTo('soundTest')}>Sound Test</Button>
      </div>
      <p className="footnote">Wins: {save.wins} · Trainers beaten: {save.defeatedTrainerIds.length}/11</p>
    </div>
  );
}
