import { useState, useCallback } from 'react';
import { useGame } from '../../contexts/GameContext';
import { getIslandById } from '../../config/islands';
import { FinalMessage } from '../UI/FinalMessage';
import { IdentificarEmocion } from './minigames/IdentificarEmocion';
import { EspejoEmocional } from './minigames/EspejoEmocional';
import { SelectorIntensidad } from './minigames/SelectorIntensidad';
import { EstrategiaBaja } from './minigames/EstrategiaBaja';
import { EstrategiaMedia } from './minigames/EstrategiaMedia';
import { EstrategiaAlta } from './minigames/EstrategiaAlta';
import { AtraviesaNube } from './minigames/AtraviesaNube';
import { CierreTristeza } from './minigames/CierreTristeza';

type TristezaStage =
  | 'intro'
  | 'identificar'
  | 'espejo'
  | 'intensidad'
  | 'estrategia'
  | 'reevaluacion'
  | 'desafio'
  | 'cierre'
  | 'final';

interface TristezaIslandProps {
  onBack: () => void;
}

const stageLabels: Record<TristezaStage, string> = {
  intro: 'Bienvenida',
  identificar: 'Identificar',
  espejo: 'Manifestaciones',
  intensidad: 'Intensidad',
  estrategia: 'Estrategia',
  reevaluacion: 'Reevaluación',
  desafio: 'Desafío Final',
  cierre: 'Cierre',
  final: 'Completada',
};

export const TristezaIsland: React.FC<TristezaIslandProps> = ({ onBack }) => {
  const { state, dispatch } = useGame();
  const islandConfig = getIslandById('tristeza');
  const [stage, setStage] = useState<TristezaStage>('intro');
  const [intensity, setIntensity] = useState<'baja' | 'media' | 'alta' | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [toolsCollected, setToolsCollected] = useState<string[]>([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleComplete = useCallback(() => {
    dispatch({ type: 'COMPLETE_ISLAND', payload: 'tristeza' });
    dispatch({ type: 'UNLOCK_TOOL', payload: 'tristeza' });
    setShowFinalMessage(true);
  }, [dispatch]);

  const handleFinalClose = () => {
    setShowFinalMessage(false);
    onBack();
  };

  const addTool = (tool: string) => {
    if (!toolsCollected.includes(tool)) {
      setToolsCollected([...toolsCollected, tool]);
    }
  };

  if (showFinalMessage || state.completedIslands.includes('tristeza')) {
    return (
      <FinalMessage
        title="Isla de la Tristeza Completada"
        message={islandConfig?.guideDialogue.finalMessage || ""}
        toolUnlocked="Expresar y buscar apoyo"
        onClose={handleFinalClose}
      />
    );
  }

  const getDialogue = () => {
    if (!islandConfig) return '';
    const { guideDialogue } = islandConfig;
    switch (stage) {
      case 'intro': return guideDialogue.intro;
      case 'identificar': return guideDialogue.level1Start;
      case 'espejo': return guideDialogue.level2Start;
      case 'intensidad': return guideDialogue.level3Start;
      case 'cierre': return guideDialogue.level3Complete;
      default: return guideDialogue.level2Start;
    }
  };

  return (
    <>
      <button className="back-button" onClick={onBack}>
        Volver al Hub
      </button>

      <div className="level-indicator">
        Isla de la Tristeza — {stageLabels[stage]}
      </div>

      {stage === 'intro' && (
        <div className="tristeza-intro">
          <div className="tristeza-intro-content">
            <h2>Valle de las Nubes</h2>
            <p>La tristeza es una emoción que puede aparecer ante pérdidas, separaciones, decepciones o cambios significativos.</p>
            <p>A lo largo de esta isla vas a reconocerla, identificar su intensidad y aprender estrategias concretas para afrontarla.</p>
            <p>No se trata de eliminar la emoción, sino de encontrar maneras de gestionarla.</p>
            <button className="menu-button" onClick={() => setStage('identificar')}>
              COMENZAR
            </button>
          </div>
        </div>
      )}

      {stage === 'identificar' && (
        <IdentificarEmocion onComplete={() => setStage('espejo')} />
      )}

      {stage === 'espejo' && (
        <EspejoEmocional onComplete={() => setStage('intensidad')} />
      )}

      {stage === 'intensidad' && (
        <SelectorIntensidad
          onSelect={(level) => {
            setIntensity(level);
            setStage('estrategia');
          }}
        />
      )}

      {stage === 'estrategia' && intensity && (
        <>
          {intensity === 'baja' && (
            <EstrategiaBaja
              onSelectStrategy={(strategy) => {
                setSelectedStrategy(strategy);
                addTool(strategy);
                setStage('reevaluacion');
              }}
            />
          )}
          {intensity === 'media' && (
            <EstrategiaMedia
              onSelectStrategy={(strategy) => {
                setSelectedStrategy(strategy);
                addTool(strategy);
                setStage('reevaluacion');
              }}
            />
          )}
          {intensity === 'alta' && (
            <EstrategiaAlta
              onSelectStrategy={(strategy) => {
                setSelectedStrategy(strategy);
                addTool(strategy);
                setStage('reevaluacion');
              }}
            />
          )}
        </>
      )}

      {stage === 'reevaluacion' && (
        <div className="tristeza-reevaluacion">
          <div className="minigame-container">
            <h2>Vuelve a evaluar tu estado</h2>
            <p style={{ color: '#aaa', marginBottom: '20px' }}>Compara con la intensidad que identificaste al inicio. ¿Cambió algo?</p>
            <SelectorIntensidad
              onSelect={(newIntensity) => {
                setIntensity(newIntensity);
                setStage('desafio');
              }}
              isReevaluation
            />
          </div>
        </div>
      )}

      {stage === 'desafio' && (
        <AtraviesaNube
          strategy={selectedStrategy}
          onComplete={() => setStage('cierre')}
        />
      )}

      {stage === 'cierre' && (
        <CierreTristeza
          tools={toolsCollected}
          onComplete={handleComplete}
        />
      )}

      <div className="dialog-box">
        <div className="dialog-speaker">{islandConfig?.name}</div>
        <div className="dialog-text">{getDialogue()}</div>
      </div>
    </>
  );
};
