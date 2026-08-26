import { useGame } from '../../contexts/GameContext';

export const MenuScreen: React.FC = () => {
  const { dispatch } = useGame();

  const handleStart = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'hub' });
  };

  return (
    <>
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>

      <group position={[0, 2, 0]}>
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * 3;
          const z = Math.sin(angle) * 3;
          return (
            <mesh key={i} position={[x, Math.sin(i) * 0.5, z]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial
                color={['#FF4500', '#4A90D9', '#FFD700', '#7B2D8E', '#27AE60', '#FFD700'][i]}
                emissive={['#FF4500', '#4A90D9', '#FFD700', '#7B2D8E', '#27AE60', '#FFD700'][i]}
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        })}
      </group>
    </>
  );
};
