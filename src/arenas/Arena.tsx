import { useMemo } from 'react';
import * as THREE from 'three';
import type { ArenaId } from '@/store/gameStore';
import { ARENA_CONFIG } from './arenaConfig';

/**
 * Procedural placeholder arena. Each arena id gets its own palette plus a few
 * signature props (crystals, lava pools, floating islands, neon grid) built
 * from primitives so the game renders with no external art assets.
 */
export function Arena({ arena }: { arena: ArenaId }) {
  const cfg = ARENA_CONFIG[arena];

  const props = useMemo(() => {
    const items: { pos: [number, number, number]; scale: number; rot: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 6 + (i % 3);
      items.push({
        pos: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius - 1],
        scale: 0.6 + ((i * 7) % 5) * 0.25,
        rot: angle,
      });
    }
    return items;
  }, []);

  return (
    <group>
      <fog attach="fog" args={[cfg.fogColor, 10, 30]} />
      <hemisphereLight intensity={cfg.ambient} color={cfg.accent} groundColor={cfg.groundColor} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <circleGeometry args={[16, 48]} />
        <meshStandardMaterial color={cfg.groundColor} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Signature props (instanced-style loop of primitives) */}
      {props.map((p, i) => (
        <ArenaProp key={i} arena={arena} accent={cfg.accent} {...p} />
      ))}
    </group>
  );
}

function ArenaProp({
  arena,
  accent,
  pos,
  scale,
  rot,
}: {
  arena: ArenaId;
  accent: string;
  pos: [number, number, number];
  scale: number;
  rot: number;
}) {
  const emissive = new THREE.Color(accent);
  if (arena === 'crystalForest') {
    return (
      <mesh position={pos} rotation={[0, rot, 0]} scale={[scale, scale * 2.5, scale]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color={accent} emissive={emissive} emissiveIntensity={0.5} roughness={0.2} />
      </mesh>
    );
  }
  if (arena === 'volcanicCrater') {
    return (
      <mesh position={[pos[0], -0.85, pos[2]]} scale={[scale * 1.4, 0.3, scale * 1.4]}>
        <cylinderGeometry args={[0.8, 1, 0.4, 8]} />
        <meshStandardMaterial color="#ff4a1a" emissive={emissive} emissiveIntensity={0.9} />
      </mesh>
    );
  }
  if (arena === 'skyTemple') {
    return (
      <mesh position={[pos[0], pos[1] + 1 + (scale % 1), pos[2]]} scale={[scale, scale * 0.4, scale]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#dfe9ff" emissive={emissive} emissiveIntensity={0.3} />
      </mesh>
    );
  }
  return (
    <mesh position={[pos[0], 0, pos[2]]} rotation={[0, rot, 0]} scale={[scale * 0.4, scale * 3, scale * 0.4]}>
      <boxGeometry args={[0.4, 1, 0.4]} />
      <meshStandardMaterial color="#10102a" emissive={emissive} emissiveIntensity={1} wireframe />
    </mesh>
  );
}
