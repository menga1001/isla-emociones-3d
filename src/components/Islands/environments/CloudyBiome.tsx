import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CloudyBiomeProps {
  intensityLevel: number;
}

export const CloudyBiome: React.FC<CloudyBiomeProps> = ({ intensityLevel }) => {
  const cloudsRef = useRef<THREE.Group>(null);
  const rainRef = useRef<THREE.Points>(null);

  const cloudPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      positions.push([
        (Math.random() - 0.5) * 30,
        3 + Math.random() * 5,
        (Math.random() - 0.5) * 30
      ]);
    }
    return positions;
  }, []);

  const rainGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.x += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.003;
        cloud.position.y += Math.sin(state.clock.elapsedTime * 0.3 + i * 0.5) * 0.002;
      });
    }

    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.08;
        if (positions[i + 1] < 0) {
          positions[i + 1] = 10;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const darkness = intensityLevel / 100;

  return (
    <group>
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={`rgb(${60 - darkness * 30}, ${70 - darkness * 30}, ${90 - darkness * 30})`} />
      </mesh>

      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 8, 0, Math.sin(angle) * 8]}>
            <cylinderGeometry args={[0.3, 0.5, 2, 8]} />
            <meshStandardMaterial color="#3a4a3a" />
          </mesh>
        );
      })}

      <group ref={cloudsRef}>
        {cloudPositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[1.5 + Math.random(), 8, 8]} />
            <meshStandardMaterial
              color={`rgb(${180 - darkness * 80}, ${180 - darkness * 80}, ${200 - darkness * 80})`}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      <points ref={rainRef} geometry={rainGeometry}>
        <pointsMaterial
          size={0.05}
          color="#8899bb"
          transparent
          opacity={0.4 + darkness * 0.3}
        />
      </points>

      <ambientLight intensity={0.3 - darkness * 0.15} color="#667799" />
      <directionalLight position={[5, 10, 5]} intensity={0.4 - darkness * 0.2} color="#aabbcc" />
    </group>
  );
};
