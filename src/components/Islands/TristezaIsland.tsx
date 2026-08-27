import { useState, useCallback } from 'react';
import { useGame } from '../../contexts/GameContext';
import { getIslandById } from '../../config/islands';
import { CloudyBiome } from './environments/CloudyBiome';
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
    if (stage === 'intro') return islandConfig.guideDialogue.intro;
    if (stage === 'identificar') return islandConfig.guideDialogue.level1Start;
    if (stage === 'cierre') return islandConfig.guideDialogue.level3Complete;
    return islandConfig.guideDialogue.level2Start;
  };

  return (
    <>
      <CloudyBiome intensityLevel={intensity === 'alta' ? 80 : intensity === 'media' ? 50 : 30} />

      <button className="back-button" onClick={onBack}>
        Volver al Hub
      </button>

      <div className="level-indicator">
        Isla de la Tristeza — {stage === 'intro' ? 'Bienvenida' : stage === 'identificar' ? 'Etapa 1: Identificar' : stage === 'espejo' ? 'Etapa 2: Manifestaciones' : stage === 'intensidad' ? 'Etapa 3: Intensidad' : stage === 'estrategia' ? 'Estrategia' : stage === 'desafio' ? 'Desafío Final' : stage === 'cierre' ? 'Cierre' : 'Completada'}
      </div>

      {stage === 'intro' && (
        <div className="tristeza-intro">
          <div className="tristeza-intro-content">
            <h2>¡Bienvenido al Valle de las Nubes!</h2>
            <p>La tristeza es una emoción que puede aparecer ante pérdidas, separaciones, decepciones, rechazos o cambios significativos.</p>
            <p>En esta isla aprenderás a reconocerla, identificar su intensidad y utilizar diferentes estrategias para afrontarla.</p>
            <p>Tu misión será encontrar las herramientas que te permitan continuar el recorrido.</p>
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
            <h2>¿Cómo está ahora tu tristeza?</h2>
            <p style={{ color: '#aaa', marginBottom: '20px' }}>Compara con la intensidad que identificaste al inicio.</p>
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
