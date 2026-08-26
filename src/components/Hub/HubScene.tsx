import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { islandsConfig } from '../../config/islands';
import { useGame } from '../../contexts/GameContext';

interface HubSceneProps {
  onIslandSelect: (islandId: string) => void;
}

interface IslandPortalProps {
  island: typeof islandsConfig[0];
  position: [number, number, number];
  isUnlocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const IslandPortal: React.FC<IslandPortalProps> = ({
  island,
  position,
  isUnlocked,
  isCompleted,
  onClick
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const color = isUnlocked ? island.colors.primary : '#444';

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onClick={isUnlocked ? onClick : undefined}
          onPointerOver={() => isUnlocked && setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            wireframe={!isUnlocked}
          />
        </mesh>

        <Text
          position={[0, 1.8, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {island.icon}
        </Text>

        <Text
          position={[0, 2.3, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {island.name}
        </Text>

        {isCompleted && (
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.15}
            color="#4CAF50"
            anchorX="center"
            anchorY="middle"
          >
            Completada
          </Text>
        )}

        {!isUnlocked && (
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.15}
            color="#888"
            anchorX="center"
            anchorY="middle"
          >
            Bloqueada
          </Text>
        )}
      </Float>
    </group>
  );
};

export const HubScene: React.FC<HubSceneProps> = ({ onIslandSelect }) => {
  const { state } = useGame();

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[15, 64]} />
        <meshStandardMaterial
          color="#1a3a5c"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      <mesh position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14, 15, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </mesh>

      {islandsConfig.map((island, index) => {
        const angle = (index / islandsConfig.length) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <IslandPortal
            key={island.id}
            island={island}
            position={[x, 0, z]}
            isUnlocked={state.unlockedIslands.includes(island.id)}
            isCompleted={state.completedIslands.includes(island.id)}
            onClick={() => onIslandSelect(island.id)}
          />
        );
      })}

      <pointLight position={[0, 5, 0]} intensity={0.5} />
    </>
  );
};
