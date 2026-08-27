import { useState } from 'react';

interface IdentificarEmocionProps {
  onComplete: () => void;
}

const situations = [
  {
    description: "Tu compañero de piso se mudó a otra ciudad y ahora vivirás solo. Miras las fotos de cuando vivían juntos.",
    correct: "tristeza",
    feedbackCorrect: "La tristeza aparece cuando percibimos una pérdida o una separación de algo o alguien que nos importa.",
    feedbackOther: "Diferentes personas pueden reaccionar de forma distinta. La tristeza se asocia especialmente con experiencias de pérdida, separación o cambio significativo."
  },
  {
    description: "Recibiste una noticia inesperada: el proyecto en el que trabajabas meses fue cancelado sin explicación.",
    correct: "tristeza",
    feedbackCorrect: "Ante una pérdida o decepción significativa, la tristeza es una respuesta emocional común.",
    feedbackOther: "Esta situación puede generar distintas emociones. La tristeza suele aparecer cuando algo importante para nosotros se interrumpe o cambia."
  },
  {
    description: "Llevas tiempo sin ver a tus amigos cercanos. Hoy viste una publicación donde estaban reunidos sin ti.",
    correct: "tristeza",
    feedbackCorrect: "Sentirse excluido o percibir una distancia en las relaciones puede activar la tristeza.",
    feedbackOther: "Esta situación puede despertar varias emociones. La tristeza frecuentemente aparece cuando nos sentimos desconectados de quienes nos importan."
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
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setFeedbackText('');
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setFeedbackText('');
    if (currentSituation < situations.length - 1) {
      setCurrentSituation(currentSituation + 1);
    } else {
      onComplete();
    }
  };

  const situation = situations[currentSituation];

  return (
    <div className="minigame-container">
      <div className="minigame-title">¿Qué emoción está presente en esta situación?</div>

      <div style={{
        fontSize: '1.1rem',
        padding: '25px',
        background: 'rgba(74, 144, 217, 0.3)',
        borderRadius: '15px',
        marginBottom: '25px',
        maxWidth: '500px',
        lineHeight: '1.6'
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
            disabled={showFeedback}
          >
            {emotion}
          </button>
        ))}
      </div>

      {showFeedback && (
        <>
          <div className="feedback-text" style={{
            color: isCorrect ? '#4CAF50' : '#FF9800',
            maxWidth: '500px',
            top: '20%'
          }}>
            {feedbackText}
          </div>
          <div style={{ marginTop: '20px' }}>
            {isCorrect ? (
              <button className="menu-button" onClick={handleNext}>
                {currentSituation < situations.length - 1 ? 'SIGUIENTE' : 'CONTINUAR'}
              </button>
            ) : (
              <button className="menu-button" onClick={handleRetry}>
                INTENTAR DE NUEVO
              </button>
            )}
          </div>
        </>
      )}

      <div style={{ marginTop: '20px', color: '#aaa' }}>
        {currentSituation + 1} de {situations.length}
      </div>
    </div>
  );
};
