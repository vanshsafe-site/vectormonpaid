import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ElementType } from '@/types';

const TYPE_COLOR: Record<ElementType, string> = {
  fire: '#ff6a2b',
  water: '#3fc6ff',
  nature: '#5fd86f',
};

/** Ambient per-type particle field (embers / mist / pollen). */
export function TypeParticles({ type, count = 60 }: { type: ElementType; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = Math.random() * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + delta * (type === 'water' ? -0.3 : 0.4);
      if (y > 8) y = 0;
      if (y < 0) y = 8;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={TYPE_COLOR[type]} size={0.12} transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}
