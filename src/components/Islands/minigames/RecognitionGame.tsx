import { useState } from 'react';

interface RecognitionGameProps {
  onComplete: () => void;
}

const signals = [
  { id: 1, text: "Los puños se aprietan", isAnger: true },
  { id: 2, text: "La cara se siente caliente", isAnger: true },
  { id: 3, text: "El corazón late más rápido", isAnger: true },
  { id: 4, text: "Se quiere gritar", isAnger: true },
  { id: 5, text: "Las manos tiemblan", isAnger: false },
  { id: 6, text: "Se siente pesadez en el pecho", isAnger: false },
  { id: 7, text: "Da gusto abrazar a alguien", isAnger: false },
  { id: 8, text: "Se quiere llorar de alegría", isAnger: false },
];

export const RecognitionGame: React.FC<RecognitionGameProps> = ({ onComplete }) => {
  const [currentSignal, setCurrentSignal] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [waitingRetry, setWaitingRetry] = useState(false);

  const handleChoice = (isAngerChoice: boolean) => {
    const signal = signals[currentSignal];
    const correct = isAngerChoice === signal.isAnger;

    setFeedback(correct
      ? "Correcto. Esa es una señal del enojo."
      : "No es señal de enojo. Puedes intentarlo de nuevo."
    );
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setWaitingRetry(false);
      setTimeout(() => {
        setFeedback(null);
        setIsCorrect(null);
        if (currentSignal < signals.length - 1) {
          setCurrentSignal(currentSignal + 1);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setWaitingRetry(true);
      setTimeout(() => {
        setFeedback(null);
        setIsCorrect(null);
      }, 2000);
    }
  };

  const signal = signals[currentSignal];

  return (
    <div className="minigame-container">
      <div className="minigame-title">¿Esta es una señal de enojo?</div>

      <div style={{
        fontSize: '1.5rem',
        padding: '30px',
        background: 'rgba(255, 69, 0, 0.3)',
        borderRadius: '15px',
        marginBottom: '30px',
        maxWidth: '500px'
      }}>
        "{signal.text}"
      </div>

      <div className="minigame-options">
        <button
          className="minigame-option positive"
          onClick={() => handleChoice(true)}
          disabled={feedback !== null && !waitingRetry}
        >
          Sí, es señal de enojo
        </button>
        <button
          className="minigame-option neutral"
          onClick={() => handleChoice(false)}
          disabled={feedback !== null && !waitingRetry}
        >
          No, no es enojo
        </button>
      </div>

      {waitingRetry && (
        <button
          className="menu-button"
          style={{ marginTop: '15px', fontSize: '0.9rem', padding: '10px 20px' }}
          onClick={() => {
            setFeedback(null);
            setIsCorrect(null);
            setWaitingRetry(false);
          }}
        >
          Intentar de nuevo
        </button>
      )}

      {feedback && (
        <div className="feedback-text" style={{ color: isCorrect ? '#4CAF50' : '#FF9800' }}>
          {feedback}
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#aaa' }}>
        Señal {currentSignal + 1} de {signals.length}
      </div>
    </div>
  );
};
