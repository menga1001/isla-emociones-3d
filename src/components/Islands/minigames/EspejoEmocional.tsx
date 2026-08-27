import { useState } from 'react';

interface EspejoEmocionalProps {
  onComplete: () => void;
}

const manifestations = [
  { id: 1, text: "Llorar o tener ganas de llorar", isSadness: true, icon: "😢" },
  { id: 2, text: "Sentir el pecho pesado", isSadness: true, icon: "💔" },
  { id: 3, text: "No tener ganas de hacer nada", isSadness: true, icon: "😔" },
  { id: 4, text: "Pensar que las cosas no van a mejorar", isSadness: true, icon: "💭" },
  { id: 5, text: "Querer estar solo", isSadness: true, icon: "🏠" },
  { id: 6, text: "Sentir que no tienes energía", isSadness: true, icon: "🔋" },
  { id: 7, text: "Sonreír y reír mucho", isSadness: false, icon: "😄" },
  { id: 8, text: "Sentir mucha fuerza para hacer cosas", isSadness: false, icon: "💪" },
];

export const EspejoEmocional: React.FC<EspejoEmocionalProps> = ({ onComplete }) => {
  const [found, setFound] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInteraction = (manifestation: typeof manifestations[0]) => {
    if (manifestation.isSadness && !found.includes(manifestation.id)) {
      setFound([...found, manifestation.id]);
      setFeedback(`¡Bien! "${manifestation.text}" es una manifestación de la tristeza.`);
    } else if (!manifestation.isSadness) {
      setFeedback("Esa no es una manifestación de la tristeza. Intenta con otra.");
    } else {
      setFeedback("Ya encontraste esa manifestación.");
    }

    setTimeout(() => setFeedback(null), 2000);

    if (manifestation.isSadness && found.length + 1 >= 5) {
      setTimeout(onComplete, 2000);
    }
  };

  return (
    <div className="minigame-container">
      <div className="minigame-title">El Espejo Emocional</div>

      <p style={{ color: '#aaa', marginBottom: '20px', maxWidth: '500px' }}>
        La tristeza puede manifestarse de diferentes maneras. Observa las señales y descubre cuáles pueden estar relacionadas con esta emoción.
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
            className={`minigame-option ${found.includes(m.id) ? 'correct' : 'neutral'}`}
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
        Manifestaciones encontradas: {found.length} / 5
      </div>
    </div>
  );
};
