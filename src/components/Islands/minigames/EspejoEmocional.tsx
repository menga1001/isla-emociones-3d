import { useState } from 'react';

interface EspejoEmocionalProps {
  onComplete: () => void;
}

const manifestations = [
  { id: 1, text: "Ganas de llorar o llanto", isSadness: true, icon: "😢" },
  { id: 2, text: "Sensación de peso en el pecho", isSadness: true, icon: "💔" },
  { id: 3, text: "Falta de motivación o energía", isSadness: true, icon: "😔" },
  { id: 4, text: "Pensamientos de que no mejorará", isSadness: true, icon: "💭" },
  { id: 5, text: "Deseo de aislarse o estar solo", isSadness: true, icon: "🏠" },
  { id: 6, text: "Agotamiento sin razón física aparente", isSadness: true, icon: "🔋" },
  { id: 7, text: "Risa frecuente y ganas de socializar", isSadness: false, icon: "😄" },
  { id: 8, text: "Sensación de energía y ganas de actuar", isSadness: false, icon: "💪" },
];

export const EspejoEmocional: React.FC<EspejoEmocionalProps> = ({ onComplete }) => {
  const [found, setFound] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [waitingRetry, setWaitingRetry] = useState(false);
  const [lastClicked, setLastClicked] = useState<number | null>(null);

  const handleInteraction = (manifestation: typeof manifestations[0]) => {
    if (manifestation.isSadness && !found.includes(manifestation.id)) {
      setFound([...found, manifestation.id]);
      setFeedback(`"${manifestation.text}" es una manifestación común de la tristeza.`);
      setWaitingRetry(false);
      setTimeout(() => setFeedback(null), 2000);

      if (found.length + 1 >= 5) {
        setTimeout(onComplete, 2000);
      }
    } else if (!manifestation.isSadness) {
      setFeedback("Esa no está directamente relacionada con la tristeza. Intenta con otra.");
      setLastClicked(manifestation.id);
      setWaitingRetry(true);
      setTimeout(() => setFeedback(null), 2000);
    } else {
      setFeedback("Ya identificaste esa manifestación.");
      setWaitingRetry(false);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="minigame-container">
      <div className="minigame-title">Manifestaciones de la tristeza</div>

      <p style={{ color: '#aaa', marginBottom: '20px', maxWidth: '500px' }}>
        La tristeza se manifiesta de distintas formas en el cuerpo y la mente. Identifica cuáles de estas señales están relacionadas con esta emoción.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px',
        maxWidth: '600px',
        width: '100%'
      }}>
        {manifestations.map((m) => (
          <button
            key={m.id}
            className={`minigame-option ${found.includes(m.id) ? 'correct' : (waitingRetry && lastClicked === m.id ? 'wrong' : 'neutral')}`}
            onClick={() => handleInteraction(m)}
            style={{
              padding: '15px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{m.icon}</div>
            <div style={{ fontSize: '0.9rem' }}>{m.text}</div>
          </button>
        ))}
      </div>

      {feedback && (
        <div className="feedback-text" style={{ top: '15%' }}>
          {feedback}
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#aaa' }}>
        Señales encontradas: {found.length} / 5
      </div>
    </div>
  );
};
