import { useGameStore } from '@/store/gameStore';
import { activeMonster } from '@/battle/engine';
import { HealthBar } from './HealthBar';
import { Button } from './Button';

export function BattleHud() {
  const player = useGameStore((s) => s.player);
  const opponent = useGameStore((s) => s.opponent);
  const phase = useGameStore((s) => s.phase);
  const busy = useGameStore((s) => s.busy);
  const log = useGameStore((s) => s.log);
  const playerMove = useGameStore((s) => s.playerMove);
  const cont = useGameStore((s) => s.continueAfterBattle);

  if (!player || !opponent) return null;
  const pMon = activeMonster(player);
  const oMon = activeMonster(opponent);

  return (
    <div className="hud">
      {/* Enemy team (top) */}
      <div className="hud-top">
        <HealthBar monster={oMon} align="right" />
        <div className="team-dots">
          {opponent.monsters.map((m, i) => (
            <span key={i} className={`dot ${m.fainted ? 'dead' : ''}`} />
          ))}
        </div>
      </div>

      {/* Player team (above controls) */}
      <div className="hud-bottom">
        <div className="team-dots">
          {player.monsters.map((m, i) => (
            <span key={i} className={`dot ${m.fainted ? 'dead' : ''}`} />
          ))}
        </div>
        <HealthBar monster={pMon} align="left" />

        <div className="log">
          {log.map((l) => (
            <p key={l.id}>{l.text}</p>
          ))}
        </div>

        {phase === 'select' && (
          <div className="moves">
            {pMon.moves.map((m) => (
              <button
                key={m.id}
                className={`move-btn type-${m.type} ${m.kind === 'signature' ? 'signature' : ''}`}
                disabled={busy}
                onClick={() => playerMove(m)}
              >
                <span className="move-name">{m.name}</span>
                <span className="move-meta">{m.type} · {m.power}</span>
              </button>
            ))}
          </div>
        )}

        {(phase === 'victory' || phase === 'defeat') && (
          <div className="battle-end">
            <h3>{phase === 'victory' ? 'Victory!' : 'Defeat'}</h3>
            <Button onClick={cont}>{phase === 'victory' ? 'Next Battle' : 'Back to Menu'}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
