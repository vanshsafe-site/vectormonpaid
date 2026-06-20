import { useGameStore } from '@/store/gameStore';
import { TRAINERS } from '@/trainers/data';
import { Button } from '@/ui/Button';

export function TrainerSelectPage() {
  const chooseTrainer = useGameStore((s) => s.chooseTrainer);
  const goTo = useGameStore((s) => s.goTo);

  return (
    <div className="page select">
      <h2>Choose Your Trainer</h2>
      <div className="grid grid-3">
        {TRAINERS.map((t) => (
          <button key={t.id} className="card trainer-card" onClick={() => chooseTrainer(t)}>
            <span className="avatar" style={{ background: t.color }}>{t.name[0]}</span>
            <span className="card-name">{t.name}</span>
          </button>
        ))}
      </div>
      <Button variant="ghost" onClick={() => goTo('menu')}>Back</Button>
    </div>
  );
}
