import { Canvas } from '@react-three/fiber';
import { GameProvider, useGame } from './contexts/GameContext';
import { HubScene } from './components/Hub/HubScene';
import { EnojoIsland } from './components/Islands/EnojoIsland';
import { EmotionalMeter } from './components/UI/EmotionalMeter';
import { Inventory } from './components/UI/Inventory';
import { DialogBox } from './components/UI/DialogBox';
import { MenuScreen } from './components/UI/MenuScreen';
import './App.css';

const GameCanvas: React.FC = () => {
  const { state, dispatch } = useGame();

  const handleIslandSelect = (islandId: string) => {
    dispatch({ type: 'SELECT_ISLAND', payload: islandId });
    dispatch({ type: 'SET_SCREEN', payload: 'island' });
  };

  const handleBackToHub = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'hub' });
    dispatch({ type: 'SELECT_ISLAND', payload: '' });
  };

  return (
    <div className="game-container">
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

        {state.currentScreen === 'menu' && (
          <MenuScreen />
        )}

        {state.currentScreen === 'hub' && (
          <HubScene onIslandSelect={handleIslandSelect} />
        )}

        {state.currentScreen === 'island' && state.currentIsland === 'enojo' && (
          <EnojoIsland onBack={handleBackToHub} />
        )}
      </Canvas>

      {state.currentScreen !== 'menu' && (
        <>
          <EmotionalMeter value={state.emotionalMeter} />
          <Inventory items={state.kitEmocional} />
        </>
      )}

      {state.currentScreen === 'hub' && (
        <div className="hub-ui">
          <h1 className="hub-title">Isla de las Emociones</h1>
          <p className="hub-subtitle">Selecciona una isla para comenzar tu aventura</p>
        </div>
      )}

      <DialogBox />
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
