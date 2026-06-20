import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { CameraMode } from '@/store/gameStore';

const target = new THREE.Vector3(0, 0.5, 0);

/** Cinematic camera driven by the current battle camera mode. */
export function CameraRig({ mode }: { mode: CameraMode }) {
  const { camera } = useThree();
  const shake = useRef(0);
  const freeze = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    let desired: THREE.Vector3;

    switch (mode) {
      case 'attack':
        desired = new THREE.Vector3(0, 1.4, 6.5);
        break;
      case 'hit':
        desired = new THREE.Vector3(0, 1.8, 8);
        shake.current = 0.25;
        break;
      case 'critical':
        desired = new THREE.Vector3(0, 1.6, 6);
        shake.current = 0.5;
        freeze.current = 0.15;
        break;
      case 'victory':
        desired = new THREE.Vector3(Math.sin(t * 0.4) * 4, 2.2, 7);
        break;
      case 'idle':
      default:
        // Slow orbit around the arena.
        desired = new THREE.Vector3(Math.sin(t * 0.15) * 9, 3.2, Math.cos(t * 0.15) * 9 + 2);
        break;
    }

    const speed = freeze.current > 0 ? delta * 1.5 : delta * 4;
    camera.position.lerp(desired, Math.min(1, speed));

    // Apply decaying shake.
    if (shake.current > 0.001) {
      camera.position.x += (Math.random() - 0.5) * shake.current;
      camera.position.y += (Math.random() - 0.5) * shake.current;
      shake.current *= 0.85;
    }
    freeze.current = Math.max(0, freeze.current - delta);

    camera.lookAt(target);
  });

  return null;
}
