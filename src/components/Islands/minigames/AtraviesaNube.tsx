import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtraviesaNubeProps {
  strategy: string | null;
  onComplete: () => void;
}

const CloudChallenge: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const cloudRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useFrame(() => {
    if (cloudRef.current && progress > 0) {
      const scale = 1 - (progress / 100) * 0.7;
      cloudRef.current.scale.set(scale, scale, scale);
      const material = cloudRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.8 - (progress / 100) * 0.5;
    }
  });

  const handleClick = () => {
    const newProgress = Math.min(progress + 20, 100);
    setProgress(newProgress);

    if (newProgress >= 100) {
      setShowMessage(true);
      setTimeout(onComplete, 2000);
    }
  };

  return (
    <group>
      <mesh
        ref={cloudRef}
        position={[0, 2, 0]}
        onClick={handleClick}
      >
        <sphereGeometry args={[3, 16, 16]} />
        <meshStandardMaterial
          color="#8899bb"
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#3a4a5a" />
      </mesh>

      <ambientLight intensity={0.3} color="#667799" />

      {showMessage && (
        <mesh position={[0, 4, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
};

export const AtraviesaNube: React.FC<AtraviesaNubeProps> = ({ strategy, onComplete }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  if (showInstructions) {
    return (
      <div className="minigame-container">
        <div className="minigame-title">Atraviesa la nube</div>
        <p style={{ color: '#ccc', marginBottom: '20px', maxWidth: '500px', lineHeight: '1.6' }}>
          La tristeza no tiene que desaparecer para que puedas continuar. Este desafío simboliza avanzar a pesar de la emoción, utilizando la estrategia que elegiste.
        </p>

        <div style={{
          padding: '20px',
          background: 'rgba(136, 153, 187, 0.2)',
          borderRadius: '15px',
          marginBottom: '25px',
          maxWidth: '400px'
        }}>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
            Estrategia seleccionada: <strong style={{ color: '#FFD700' }}>{strategy}</strong>
          </p>
        </div>

        <p style={{ color: '#aaa', marginBottom: '20px' }}>
          Haz clic en la nube para comenzar a atravesarla.
        </p>

        <button className="menu-button" onClick={() => setShowInstructions(false)}>
          COMENZAR
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CloudChallenge onComplete={onComplete} />
      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        textAlign: 'center',
        zIndex: 15
      }}>
        <p style={{ fontSize: '1.1rem' }}>Haz clic en la nube para avanzar</p>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>La nube se disipará poco a poco</p>
      </div>
    </div>
  );
};
