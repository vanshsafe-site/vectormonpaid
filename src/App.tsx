import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useOrientation } from '@/hooks/useOrientation';
import { MenuPage } from '@/pages/MenuPage';
import { TrainerSelectPage } from '@/pages/TrainerSelectPage';
import { TeamSelectPage } from '@/pages/TeamSelectPage';
import { BattlePage } from '@/pages/BattlePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { SoundTestPage } from '@/pages/SoundTestPage';
import { RotateNotice } from '@/ui/RotateNotice';

export function App() {
  const screen = useGameStore((s) => s.screen);
  const goTo = useGameStore((s) => s.goTo);
  const { isLandscape } = useOrientation();

  useEffect(() => {
    goTo('menu');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-frame">
      {isLandscape && <RotateNotice />}
      {screen === 'menu' && <MenuPage />}
      {screen === 'trainerSelect' && <TrainerSelectPage />}
      {screen === 'teamSelect' && <TeamSelectPage />}
      {screen === 'battle' && <BattlePage />}
      {screen === 'gallery' && <GalleryPage />}
      {screen === 'soundTest' && <SoundTestPage />}
    </div>
  );
}
