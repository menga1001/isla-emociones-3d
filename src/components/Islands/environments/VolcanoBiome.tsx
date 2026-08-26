import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VolcanoBiomeProps {
  emotionLevel: number;
}

export const IslandEnvironment: React.FC<VolcanoBiomeProps> = ({ emotionLevel }) => {
  const lavaRef = useRef<THREE.Mesh>(null);
  const smokeRef = useRef<THREE.Points>(null);

  const smokeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (lavaRef.current) {
      const material = lavaRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }

    if (smokeRef.current) {
      smokeRef.current.rotation.y += 0.002;
      const positions = smokeRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.01;
        if (positions[i + 1] > 8) {
          positions[i + 1] = 0;
        }
      }
      smokeRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const intensity = emotionLevel / 100;

  return (
    <group>
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a0a00" />
      </mesh>

      <mesh position={[0, 0, -5]}>
        <coneGeometry args={[3, 5, 8]} />
        <meshStandardMaterial color="#3d1a00" />
      </mesh>

      <mesh ref={lavaRef} position={[0, 2.5, -5]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF4500"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      <points ref={smokeRef} geometry={smokeGeometry}>
        <pointsMaterial
          size={0.3}
          color="#666"
          transparent
          opacity={0.4 * intensity}
        />
      </points>

      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 4;
        const z = Math.sin(angle) * 4;
        return (
          <mesh key={i} position={[x, 0.5, z]}>
            <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
            <meshStandardMaterial color="#2a1a00" />
          </mesh>
        );
      })}

      <pointLight position={[0, 3, -5]} intensity={2 * intensity} color="#FF4500" />
      <ambientLight intensity={0.3 + intensity * 0.2} color="#FF6600" />
    </group>
  );
};
