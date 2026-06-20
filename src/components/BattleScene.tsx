import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Arena } from '@/arenas/Arena';
import { MonsterModel } from './MonsterModel';
import { TypeParticles } from './TypeParticles';
import { CameraRig } from './CameraRig';
import { useGameStore } from '@/store/gameStore';
import { activeMonster } from '@/battle/engine';

/** The 3D battle stage: arena, both active monsters, particles, cameras, bloom. */
export function BattleScene() {
  const player = useGameStore((s) => s.player);
  const opponent = useGameStore((s) => s.opponent);
  const arena = useGameStore((s) => s.arena);
  const cameraMode = useGameStore((s) => s.cameraMode);

  if (!player || !opponent) return null;
  const pMon = activeMonster(player);
  const oMon = activeMonster(opponent);
  const attacking = cameraMode === 'attack' || cameraMode === 'critical' || cameraMode === 'hit';

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 3, 9], fov: 50 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#05060a']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />

      <CameraRig mode={cameraMode} />
      <Arena arena={arena} />
      <TypeParticles type={pMon.type} />

      {/* Player monster (front-left), opponent (back-right). */}
      <group position={[-2.2, 0, 1.5]}>
        <MonsterModel monster={pMon} facing={1} attacking={attacking} />
      </group>
      <group position={[2.2, 0, -1.5]}>
        <MonsterModel monster={oMon} facing={-1} attacking={attacking} />
      </group>

      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
