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
    description: "Alguien tom\u00F3 tu libro sin pedirte permiso y lo est\u00E1 usando.",
    options: [
      { text: "Gritar y arrebatar el libro", type: 'impulsive', feedback: "Entiendo que est\u00E1s enojado. Gritar puede hacer que la otra persona se asuste o se enoje tambi\u00E9n." },
      { text: "Respirar profundo y decir '\u00BFMe puedes devolver mi libro?'", type: 'regulative', feedback: "\u00A1Excelente! Respirar te ayuda a calmarte y hablar con respeto es la mejor opci\u00F3n." },
      { text: "Ir \u00E1ngrimo sin decir nada", type: 'impulsive', feedback: "Callar cuando est\u00E0s enojado puede hacer que el enojo crezca. Es mejor expresarlo con palabras." },
      { text: "Hacer una pausa y luego pedir el libro", type: 'regulative', feedback: "Muy bien. La pausa te da tiempo para pensar antes de actuar." },
    ]
  },
  {
    description: "Un compa\u00F1ero se burl\u00F3 de ti frente a todos.",
    options: [
      { text: "Golpear al compa\u00F1ero", type: 'impulsive', feedback: "La violencia nunca es la respuesta. Golpear puede hacer que las cosas empeoren mucho." },
      { text: "Insultarlo de vuelta", type: 'impulsive', feedback: "Responder con insultos solo genera m\u00E1s conflicto. No es una buena soluci\u00F3n." },
      { text: "Respirar, alejarse y despu\u00E9s hablar con un adulto", type: 'regulative', feedback: "\u00A1Muy bien! Alejarte te da espacio para calmarte, y un adulto puede ayudarte." },
      { text: "Decir 'No me gusta que hagas eso' con calma", type: 'regulative', feedback: "\u00A1Excelente! Expresar c\u00F3mo te sientes con respeto es muy valiente." },
    ]
  },
  {
    description: "Alguien empuj\u00F3 sin querer y se te cay\u00F3 tu comida al suelo.",
    options: [
      { text: "Empujar a la persona de vuelta", type: 'impulsive', feedback: "Empujar de vuelta puede hacer que alguien se lastime. No es una buena opci\u00F3n." },
      { text: "Llorar sin hacer nada", type: 'neutral', feedback: "Est\u00E1 bien llorar a veces, pero tambi\u00E9n puedes expresar lo que sientes con palabras." },
      { text: "Respirar y decir 'Cuidado, se me cay\u00F3 mi comida'", type: 'regulative', feedback: "\u00A1Muy bien! Mantuviste la calma y expresaste lo que pas\u00F3." },
      { text: "Irte sin decir nada", type: 'impulsive', feedback: "Alejarte sin hablar puede hacer que la otra persona no sepa lo que pas\u00F3." },
    ]
  }
];

export const DecisionGame: React.FC<DecisionGameProps> = ({ onComplete }) => {
  const [currentSituation, setCurrentSituation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isRegulative, setIsRegulative] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    const situation = situations[currentSituation];
    const option = situation.options[optionIndex];

    setSelectedOption(optionIndex);
    setFeedbackText(option.feedback);
    setIsRegulative(option.type === 'regulative');
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);

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
      <div className="minigame-title">\u00BFQu\u00E9 haces?</div>

      <div style={{
        fontSize: '1.2rem',
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
            disabled={selectedOption !== null}
          >
            {option.text}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="feedback-text" style={{
          color: isRegulative ? '#4CAF50' : '#FF9800',
          maxWidth: '500px'
        }}>
          {feedbackText}
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#aaa' }}>
        Situaci\u00F3n {currentSituation + 1} de {situations.length}
      </div>
    </div>
  );
};
