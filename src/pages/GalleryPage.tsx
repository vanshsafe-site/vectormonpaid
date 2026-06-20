import { useState } from 'react';
import { MONSTERS } from '@/monsters/data';
import { TRAINERS } from '@/trainers/data';
import { ARENA_CONFIG } from '@/arenas/arenaConfig';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/ui/Button';

type Tab = 'monsters' | 'trainers' | 'arenas';

export function GalleryPage() {
  const goTo = useGameStore((s) => s.goTo);
  const [tab, setTab] = useState<Tab>('monsters');

  return (
    <div className="page select">
      <h2>Galleries</h2>
      <div className="tabs">
        <button className={tab === 'monsters' ? 'on' : ''} onClick={() => setTab('monsters')}>Monsters</button>
        <button className={tab === 'trainers' ? 'on' : ''} onClick={() => setTab('trainers')}>Trainers</button>
        <button className={tab === 'arenas' ? 'on' : ''} onClick={() => setTab('arenas')}>Arenas</button>
      </div>

      {tab === 'monsters' && (
        <div className="grid grid-2">
          {MONSTERS.map((m) => (
            <div key={m.id} className={`card monster-card type-${m.type}`}>
              <span className="orb" style={{ background: m.color }} />
              <span className="card-name">{m.name}</span>
              <span className="card-type">{m.type}</span>
              <p className="lore">{m.description}</p>
            </div>
          ))}
        </div>
      )}
      {tab === 'trainers' && (
        <div className="grid grid-3">
          {TRAINERS.map((t) => (
            <div key={t.id} className="card trainer-card">
              <span className="avatar" style={{ background: t.color }}>{t.name[0]}</span>
              <span className="card-name">{t.name}</span>
            </div>
          ))}
        </div>
      )}
      {tab === 'arenas' && (
        <div className="grid grid-2">
          {Object.values(ARENA_CONFIG).map((a) => (
            <div key={a.id} className="card arena-card" style={{ background: a.groundColor }}>
              <span className="card-name">{a.name}</span>
              <span className="swatch" style={{ background: a.accent }} />
            </div>
          ))}
        </div>
      )}

      <Button variant="ghost" onClick={() => goTo('menu')}>Back</Button>
    </div>
  );
}
