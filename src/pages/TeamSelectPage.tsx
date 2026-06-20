import { useGameStore } from '@/store/gameStore';
import { MONSTERS } from '@/monsters/data';
import { Button } from '@/ui/Button';

export function TeamSelectPage() {
  const selectedTeam = useGameStore((s) => s.selectedTeam);
  const toggle = useGameStore((s) => s.toggleTeamMember);
  const confirmTeam = useGameStore((s) => s.confirmTeam);
  const goTo = useGameStore((s) => s.goTo);
  const trainer = useGameStore((s) => s.playerTrainer);

  return (
    <div className="page select">
      <h2>{trainer?.name}, pick 2 Vectormon</h2>
      <div className="grid grid-3">
        {MONSTERS.map((m) => {
          const picked = selectedTeam.includes(m.id);
          return (
            <button
              key={m.id}
              className={`card monster-card type-${m.type} ${picked ? 'picked' : ''}`}
              onClick={() => toggle(m.id)}
            >
              <span className="orb" style={{ background: m.color }} />
              <span className="card-name">{m.name}</span>
              <span className="card-type">{m.type}</span>
            </button>
          );
        })}
      </div>
      <div className="row">
        <Button variant="ghost" onClick={() => goTo('trainerSelect')}>Back</Button>
        <Button disabled={selectedTeam.length !== 2} onClick={confirmTeam}>
          Start Battle ({selectedTeam.length}/2)
        </Button>
      </div>
    </div>
  );
}
