import { useState, useEffect, useRef } from 'react';

interface BreathingGameProps {
  onComplete: () => void;
}

type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'ready';

const PHASES: { phase: BreathingPhase; duration: number; label: string }[] = [
  { phase: 'inhale', duration: 4000, label: 'INHALA' },
  { phase: 'hold1', duration: 4000, label: 'SOST\u00C9N' },
  { phase: 'exhale', duration: 4000, label: 'EXHALA' },
  { phase: 'hold2', duration: 4000, label: 'PAUSA' },
];

export const BreathingGame: React.FC<BreathingGameProps> = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('ready');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [circleScale, setCircleScale] = useState(1);
  const [progress, setProgress] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startBreathing = () => {
    setCurrentPhase('inhale');
    setPhaseIndex(0);
    setProgress(0);
    setIsHolding(false);
  };

  const advancePhase = () => {
    const nextIndex = phaseIndex + 1;
    if (nextIndex >= PHASES.length) {
      const newRounds = roundsCompleted + 1;
      setRoundsCompleted(newRounds);
      if (newRounds >= 3) {
        onComplete();
      } else {
        setCurrentPhase('ready');
        setPhaseIndex(0);
        setCircleScale(1);
        setProgress(0);
      }
    } else {
      setPhaseIndex(nextIndex);
      setCurrentPhase(PHASES[nextIndex].phase);
    }
  };

  useEffect(() => {
    if (currentPhase === 'ready') return;

    const phase = PHASES[phaseIndex];
    let startTime = Date.now();

    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(elapsed / phase.duration, 1));
    }, 50);

    timerRef.current = setTimeout(() => {
      advancePhase();
    }, phase.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentPhase, phaseIndex]);

  useEffect(() => {
    switch (currentPhase) {
      case 'inhale':
        setCircleScale(1.8);
        break;
      case 'hold1':
        setCircleScale(1.8);
        break;
      case 'exhale':
        setCircleScale(1);
        break;
      case 'hold2':
        setCircleScale(1);
        break;
    }
  }, [currentPhase]);

  const handleCirclePress = () => {
    if (currentPhase === 'hold1' || currentPhase === 'hold2') {
      setIsHolding(true);
    }
  };

  const handleCircleRelease = () => {
    setIsHolding(false);
  };

  return (
    <div className="minigame-container">
      <div className="minigame-title">Respiraci\u00F3n 4-4-4-4</div>

      {currentPhase === 'ready' ? (
        <>
          <div style={{ marginBottom: '30px', color: '#ccc' }}>
            Mant\u00E9n presionado el c\u00EDrculo cuando te lo indique.
            <br />
            Rondas completadas: {roundsCompleted}/3
          </div>
          <button className="minigame-option positive" onClick={startBreathing}>
            Comenzar respiraci\u00F3n
          </button>
        </>
      ) : (
        <>
          <div
            className={`breathing-circle ${isHolding ? 'active' : ''}`}
            style={{
              transform: `translate(-50%, -50%) scale(${circleScale})`,
              borderColor: currentPhase === 'hold1' || currentPhase === 'hold2'
                ? (isHolding ? '#4CAF50' : '#FF9800')
                : 'rgba(255, 255, 255, 0.5)'
            }}
            onMouseDown={handleCirclePress}
            onMouseUp={handleCircleRelease}
            onTouchStart={handleCirclePress}
            onTouchEnd={handleCircleRelease}
          >
            <div className="breathing-text">
              {PHASES[phaseIndex].label}
            </div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '150px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '8px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: '#FFD700',
              transition: 'width 0.05s linear'
            }} />
          </div>

          <div style={{ marginTop: '40px', color: '#aaa' }}>
            Ronda {roundsCompleted + 1} de 3
          </div>

          {(currentPhase === 'hold1' || currentPhase === 'hold2') && !isHolding && (
            <div className="feedback-text" style={{ color: '#FF9800' }}>
              \u00A1Mant\u00E9n presionado!
            </div>
          )}
        </>
      )}
    </div>
  );
};
