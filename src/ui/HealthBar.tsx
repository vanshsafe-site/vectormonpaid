import type { BattleMonster } from '@/types';

export function HealthBar({ monster, align }: { monster: BattleMonster; align: 'left' | 'right' }) {
  const pct = Math.round((monster.hp / monster.maxHp) * 100);
  const color = pct > 50 ? '#46d17f' : pct > 20 ? '#e0b13c' : '#e0533c';
  return (
    <div className={`hp-card hp-${align}`}>
      <div className="hp-head">
        <span className="hp-name">{monster.name}</span>
        {monster.status && <span className={`status-pill status-${monster.status}`}>{monster.status}</span>}
      </div>
      <div className="hp-track">
        <div className="hp-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
