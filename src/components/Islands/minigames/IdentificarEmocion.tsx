import { useState } from 'react';

interface IdentificarEmocionProps {
  onComplete: () => void;
}

const situations = [
  {
    description: "Un personaje está sentado solo, mirando una foto de alguien querido.",
    correct: "tristeza",
    feedbackCorrect: "¡CORRECTO! La tristeza puede aparecer ante situaciones que percibimos como pérdidas, separaciones, decepciones o cambios importantes.",
    feedbackOther: "Esta situación puede generar diferentes emociones dependiendo de la persona y del contexto. La tristeza suele relacionarse especialmente con experiencias de pérdida, separación, decepción o cambio significativo."
  },
  {
    description: "Alguien recibe una carta con malas noticias sobre un amigo que se mudó lejos.",
    correct: "tristeza",
    feedbackCorrect: "¡CORRECTO! La separación de personas importantes puede generar tristeza.",
    feedbackOther: "Esta situación puede generar diferentes emociones. La tristeza aparece frecuentemente cuando nos separamos de alguien que nos importa."
  },
  {
    description: "Un personaje ve a otros jugando juntos mientras está solo.",
    correct: "tristeza",
    feedbackCorrect: "¡CORRECTO! Sentirse excluido o solo puede generar tristeza.",
    feedbackOther: "Esta situación puede generar diferentes emociones. La tristeza suele aparecer cuando nos sentimos solos o separados de los demás."
  }
];

export const IdentificarEmocion: React.FC<IdentificarEmocionProps> = ({ onComplete }) => {
  const [currentSituation, setCurrentSituation] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleAnswer = (answer: string) => {
    const situation = situations[currentSituation];
    const correct = answer === situation.correct;

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setFeedbackText(correct ? situation.feedbackCorrect : situation.feedbackOther);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentSituation < situations.length - 1) {
        setCurrentSituation(currentSituation + 1);
      } else {
        onComplete();
      }
    }, 3000);
  };

  const situation = situations[currentSituation];

  return (
    <div className="minigame-container">
      <div className="minigame-title">¿Qué emoción podría estar sintiendo el personaje?</div>

      <div style={{
        fontSize: '1.2rem',
        padding: '25px',
        background: 'rgba(74, 144, 217, 0.3)',
        borderRadius: '15px',
        marginBottom: '25px',
        maxWidth: '500px',
        lineHeight: '1.5'
      }}>
        {situation.description}
      </div>

      <div className="minigame-options">
        {['Alegría', 'Tristeza', 'Enojo', 'Miedo'].map((emotion) => (
          <button
            key={emotion}
            className={`minigame-option ${
              selectedAnswer === emotion
                ? (emotion === 'Tristeza' ? 'correct' : 'wrong')
                : 'neutral'
            }`}
            onClick={() => handleAnswer(emotion.toLowerCase())}
            disabled={selectedAnswer !== null}
          >
            {emotion}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="feedback-text" style={{
          color: isCorrect ? '#4CAF50' : '#FF9800',
          maxWidth: '500px',
          top: '20%'
        }}>
          {feedbackText}
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#aaa' }}>
        Situación {currentSituation + 1} de {situations.length}
      </div>
    </div>
  );
};
