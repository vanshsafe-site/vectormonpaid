import { Suspense } from 'react';
import { BattleScene } from '@/components/BattleScene';
import { BattleHud } from '@/ui/BattleHud';

export function BattlePage() {
  return (
    <div className="page battle-page">
      <div className="scene-layer">
        <Suspense fallback={<div className="loading">Loading arena…</div>}>
          <BattleScene />
        </Suspense>
      </div>
      <div className="hud-layer">
        <BattleHud />
      </div>
    </div>
  );
}
