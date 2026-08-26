import { useState, useCallback } from 'react';
import { useGame } from '../../contexts/GameContext';
import { getIslandById } from '../../config/islands';
import { BreathingGame } from './minigames/BreathingGame';
import { RecognitionGame } from './minigames/RecognitionGame';
import { DecisionGame } from './minigames/DecisionGame';
import { IslandEnvironment } from './environments/VolcanoBiome';
import { FinalMessage } from '../UI/FinalMessage';

interface EnojoIslandProps {
  onBack: () => void;
}

export const EnojoIsland: React.FC<EnojoIslandProps> = ({ onBack }) => {
  const { state, dispatch } = useGame();
  const islandConfig = getIslandById('enojo');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleLevelComplete = useCallback((level: number) => {
    dispatch({ type: 'COMPLETE_LEVEL', payload: { islandId: 'enojo', level } });
    dispatch({ type: 'UPDATE_EMOTIONAL_METER', payload: state.emotionalMeter - 20 });

    if (level < 3) {
      dispatch({ type: 'SET_LEVEL', payload: (level + 1) as 1 | 2 | 3 });
    } else {
      dispatch({ type: 'COMPLETE_ISLAND', payload: 'enojo' });
      dispatch({ type: 'UNLOCK_TOOL', payload: 'enojo' });
      setShowFinalMessage(true);
    }
  }, [dispatch, state.emotionalMeter]);

  const handleFinalClose = () => {
    setShowFinalMessage(false);
    onBack();
  };

  if (showFinalMessage || state.completedIslands.includes('enojo')) {
    return (
      <FinalMessage
        title="Isla del Enojo Completada"
        message={islandConfig?.guideDialogue.finalMessage || ""}
        toolUnlocked="Respirar y hacer una pausa"
        onClose={handleFinalClose}
      />
    );
  }

  return (
    <>
      <IslandEnvironment emotionLevel={state.emotionalMeter} />

      <button className="back-button" onClick={onBack}>
        Volver al Hub
      </button>

      <div className="level-indicator">
        Nivel {state.currentLevel} - {islandConfig?.name}
      </div>

      {state.currentLevel === 1 && (
        <RecognitionGame onComplete={() => handleLevelComplete(1)} />
      )}

      {state.currentLevel === 2 && (
        <BreathingGame onComplete={() => handleLevelComplete(2)} />
      )}

      {state.currentLevel === 3 && (
        <DecisionGame onComplete={() => handleLevelComplete(3)} />
      )}
    </>
  );
};
