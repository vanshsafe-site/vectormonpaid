import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { BattleMonster } from '@/types';

/**
 * Placeholder monster model built from primitives, tinted by the species accent
 * color and shaped slightly by type. Real GLB models can replace this later.
 */
export function MonsterModel({
  monster,
  facing,
  attacking,
}: {
  monster: BattleMonster;
  facing: 1 | -1;
  attacking: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const baseX = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Idle bob.
    group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
    // Lunge toward center when attacking.
    const target = attacking ? facing * 0.9 : 0;
    baseX.current = THREE.MathUtils.lerp(baseX.current, target, delta * 8);
    group.current.position.x = baseX.current;
  });

  const color = monster.color;
  const emissive = new THREE.Color(color);

  return (
    <group ref={group} rotation={[0, facing > 0 ? Math.PI / 5 : -Math.PI / 5, 0]}>
      {/* Body */}
      <mesh castShadow>
        <icosahedronGeometry args={[0.85, monster.type === 'nature' ? 1 : 0]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.25} roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.95, 0.1]} castShadow>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.3} roughness={0.3} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.18, 1.0, 0.5]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#06070a" />
      </mesh>
      <mesh position={[-0.18, 1.0, 0.5]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#06070a" />
      </mesh>
    </group>
  );
}
