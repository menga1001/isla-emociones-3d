import { useState } from 'react';

interface DecisionGameProps {
  onComplete: () => void;
}

interface Situation {
  description: string;
  options: {
    text: string;
    type: 'regulative' | 'impulsive' | 'neutral';
    feedback: string;
  }[];
}

const situations: Situation[] = [
  {
    description: "Alguien tomó tu libro sin pedirte permiso y lo está usando.",
    options: [
      { text: "Gritar y arrebatar el libro", type: 'impulsive', feedback: "Gritar puede escalar el conflicto. Intenta otra opción." },
      { text: "Respirar profundo y decir '¿Me puedes devolver mi libro?'", type: 'regulative', feedback: "Respirar te ayuda a calmarte y hablar con respeto es la mejor opción." },
      { text: "Irte enojado sin decir nada", type: 'impulsive', feedback: "Callar cuando estás enojado puede hacer que el enojo crezca. Prueba otra forma." },
      { text: "Hacer una pausa y luego pedir el libro", type: 'regulative', feedback: "La pausa te da tiempo para pensar antes de actuar. Buena decisión." },
    ]
  },
  {
    description: "Un compañero se burló de ti frente a todos.",
    options: [
      { text: "Golpear al compañero", type: 'impulsive', feedback: "La violencia nunca es la respuesta. Puedes elegir otra opción." },
      { text: "Insultarlo de vuelta", type: 'impulsive', feedback: "Responder con insultos solo genera más conflicto. Intenta otra cosa." },
      { text: "Respirar, alejarse y después hablar con alguien de confianza", type: 'regulative', feedback: "Alejarte te da espacio para calmarte, y hablar con alguien puede ayudarte." },
      { text: "Decir 'No me gusta que hagas eso' con calma", type: 'regulative', feedback: "Expresar cómo te sientes con respeto es una habilidad importante." },
    ]
  },
  {
    description: "Alguien empujó sin querer y se te cayó tu comida al suelo.",
    options: [
      { text: "Empujar a la persona de vuelta", type: 'impulsive', feedback: "Empujar de vuelta puede hacer que alguien se lastime. Elige otra opción." },
      { text: "Llorar sin hacer nada", type: 'neutral', feedback: "Está bien llorar, pero también puedes expresar lo que sientes con palabras." },
      { text: "Respirar y decir 'Cuidado, se me cayó mi comida'", type: 'regulative', feedback: "Mantuviste la calma y expresaste lo que pasó. Eso es lo correcto." },
      { text: "Irte sin decir nada", type: 'impulsive', feedback: "Alejarte sin hablar puede generar más confusión. Prueba comunicarte." },
    ]
  }
];

export const DecisionGame: React.FC<DecisionGameProps> = ({ onComplete }) => {
  const [currentSituation, setCurrentSituation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isRegulative, setIsRegulative] = useState(false);
  const [waitingRetry, setWaitingRetry] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    const situation = situations[currentSituation];
    const option = situation.options[optionIndex];

    setSelectedOption(optionIndex);
    setFeedbackText(option.feedback);
    setIsRegulative(option.type === 'regulative');
    setShowFeedback(true);

    if (option.type === 'regulative') {
      setWaitingRetry(false);
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
        if (currentSituation < situations.length - 1) {
          setCurrentSituation(currentSituation + 1);
        } else {
          onComplete();
        }
      }, 3000);
    } else {
      setWaitingRetry(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 2500);
    }
  };

  const situation = situations[currentSituation];

  return (
    <div className="minigame-container">
      <div className="minigame-title">¿Qué haces?</div>

      <div style={{
        fontSize: '1.1rem',
        padding: '20px',
        background: 'rgba(255, 69, 0, 0.3)',
        borderRadius: '15px',
        marginBottom: '30px',
        maxWidth: '500px'
      }}>
        {situation.description}
      </div>

      <div className="minigame-options">
        {situation.options.map((option, index) => (
          <button
            key={index}
            className={`minigame-option ${
              selectedOption === index
                ? (option.type === 'regulative' ? 'correct' : 'wrong')
                : 'neutral'
            }`}
            onClick={() => handleOptionSelect(index)}
            disabled={showFeedback && !waitingRetry}
          >
            {option.text}
          </button>
        ))}
      </div>

      {waitingRetry && (
        <button
          className="menu-button"
          style={{ marginTop: '15px', fontSize: '0.9rem', padding: '10px 20px' }}
          onClick={() => {
            setShowFeedback(false);
            setSelectedOption(null);
            setWaitingRetry(false);
          }}
        >
          Intentar de nuevo
        </button>
      )}

      {showFeedback && (
        <div className="feedback-text" style={{
          color: isRegulative ? '#4CAF50' : '#FF9800',
          maxWidth: '500px'
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
