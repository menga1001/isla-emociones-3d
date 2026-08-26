import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { getIslandById } from '../../config/islands';

export const DialogBox: React.FC = () => {
  const { state } = useGame();
  const [dialogText, setDialogText] = useState<string | null>(null);
  const [speaker, setSpeaker] = useState<string>('');
  const [actions, setActions] = useState<{ label: string; onClick: () => void; type: 'positive' | 'negative' | 'neutral' }[]>([]);

  useEffect(() => {
    if (state.currentScreen === 'island' && state.currentIsland) {
      const islandConfig = getIslandById(state.currentIsland);
      if (islandConfig) {
        const { guideDialogue } = islandConfig;
        let text = '';

        switch (state.currentLevel) {
          case 1:
            text = state.completedLevels[`${state.currentIsland}-1`]
              ? guideDialogue.level1Complete
              : guideDialogue.level1Start;
            break;
          case 2:
            text = state.completedLevels[`${state.currentIsland}-2`]
              ? guideDialogue.level2Complete
              : guideDialogue.level2Start;
            break;
          case 3:
            text = state.completedLevels[`${state.currentIsland}-3`]
              ? guideDialogue.level3Complete
              : guideDialogue.level3Start;
            break;
        }

        setDialogText(text);
        setSpeaker(islandConfig.name);
      }
    } else if (state.currentScreen === 'hub') {
      setDialogText(null);
    }
  }, [state.currentScreen, state.currentIsland, state.currentLevel, state.completedLevels]);

  if (!dialogText) return null;

  return (
    <div className="dialog-box">
      <div className="dialog-speaker">{speaker}</div>
      <div className="dialog-text">{dialogText}</div>
      <div className="dialog-continue">Toca para continuar...</div>
    </div>
  );
};
