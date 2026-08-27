import { Canvas } from '@react-three/fiber';
import { GameProvider, useGame } from './contexts/GameContext';
import { CloudyBiome } from './components/Islands/environments/CloudyBiome';
import { TristezaIsland } from './components/Islands/TristezaIsland';
import { EmotionalMeter } from './components/UI/EmotionalMeter';
import { Inventory } from './components/UI/Inventory';
import { MenuScreen } from './components/UI/MenuScreen';
import './App.css';

const GameCanvas: React.FC = () => {
  const { state } = useGame();

  const handleBackToMenu = () => {
    window.location.reload();
  };

  return (
    <div className="game-container">
      {state.currentScreen === 'menu' && <MenuScreen />}

      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 60 }}
        style={{ background: '#1a1a2e' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {state.currentScreen === 'island' && (
          <CloudyBiome intensityLevel={30} />
        )}
      </Canvas>

      {state.currentScreen === 'island' && (
        <>
          <TristezaIsland onBack={handleBackToMenu} />
          <EmotionalMeter value={state.emotionalMeter} />
          <Inventory items={state.kitEmocional} />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameCanvas />
    </GameProvider>
  );
};

export default App;
