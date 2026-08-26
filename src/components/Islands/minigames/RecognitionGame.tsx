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

  const handleChoice = (isAngerChoice: boolean) => {
    const signal = signals[currentSignal];
    const correct = isAngerChoice === signal.isAnger;

    setFeedback(correct
      ? "\u00A1Correcto! Esa es una se\u00F1al del enojo."
      : "No es se\u00F1al de enojo, pero est\u00E1 bien identificarlo."
    );
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setIsCorrect(null);
      if (currentSignal < signals.length - 1) {
        setCurrentSignal(currentSignal + 1);
      } else {
        onComplete();
      }
    }, 1500);
  };

  const signal = signals[currentSignal];

  return (
    <div className="minigame-container">
      <div className="minigame-title">\u00BFEsta es una se\u00F1al de enojo?</div>

      <div style={{
        fontSize: '1.8rem',
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
        >
          \u00A1S\u00ED! Es se\u00F1al de enojo
        </button>
        <button
          className="minigame-option neutral"
          onClick={() => handleChoice(false)}
        >
          No, no es enojo
        </button>
      </div>

      {feedback && (
        <div className="feedback-text" style={{ color: isCorrect ? '#4CAF50' : '#FF9800' }}>
          {feedback}
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#aaa' }}>
        Se\u00F1al {currentSignal + 1} de {signals.length}
      </div>
    </div>
  );
};
