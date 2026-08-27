import { useState } from 'react';

interface EstrategiaBajaProps {
  onSelectStrategy: (strategy: string) => void;
}

export const EstrategiaBaja: React.FC<EstrategiaBajaProps> = ({ onSelectStrategy }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handlePathSelect = (path: string) => {
    setSelectedPath(path);
    setStep(1);
  };

  const reevaluationSteps = [
    { title: "Identifica el pensamiento", question: "¿Qué estás pensando sobre la situación?", options: ["Todo está perdido", "Esto es difícil pero puedo manejarlo", "Nunca voy a mejorar", "Es una situación difícil, pero no define todo"], correct: 1 },
    { title: "Busca otra perspectiva", question: "¿Qué otra forma hay de ver esto?", options: ["Solo hay una forma de verlo", "Puedo encontrar algo positivo en esto", "Todo es malo", "Hay cosas que no puedo cambiar, pero sí otras que sí"], correct: 3 },
  ];

  if (selectedPath === 'reevaluacion') {
    const currentStep = reevaluationSteps[step];
    if (!currentStep) {
      return (
        <div className="minigame-container">
          <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>Nueva perspectiva encontrada</h2>
          <p style={{ color: '#ccc', marginBottom: '20px', maxWidth: '500px' }}>
            Puedes reconocer que una situación es difícil sin asumir que todo está perdido. Esta habilidad se llama reevaluación cognitiva.
          </p>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💎</div>
          <p style={{ color: '#FFD700', marginBottom: '20px' }}>Herramienta obtenida: Cristal de perspectiva</p>
          <button className="menu-button" onClick={() => onSelectStrategy('Cristal de perspectiva')}>Continuar</button>
        </div>
      );
    }

    return (
      <div className="minigame-container">
        <div className="minigame-title">{currentStep.title}</div>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>{currentStep.question}</p>
        <div className="minigame-options">
          {currentStep.options.map((option, i) => (
            <button
              key={i}
              className={`minigame-option ${i === currentStep.correct ? '' : 'neutral'}`}
              onClick={() => {
                if (i === currentStep.correct) {
                  setFeedback('');
                  setStep(step + 1);
                } else {
                  setFeedback('Esa no es la mejor opción. Intenta otra vez.');
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && <p style={{ color: '#FF9800', marginTop: '15px' }}>{feedback}</p>}
      </div>
    );
  }

  if (selectedPath === 'atencion') {
    return (
      <div className="minigame-container">
        <div className="minigame-title">Redirige tu atención</div>
        <p style={{ color: '#aaa', marginBottom: '20px', maxWidth: '500px' }}>
          El despliegue atencional consiste en redirigir tu foco de atención hacia un estímulo neutral.
        </p>
        <p style={{ color: '#ccc', marginBottom: '20px' }}>Cuenta cuántas veces aparece el color azul:</p>
        <div style={{ fontSize: '3rem', marginBottom: '20px', letterSpacing: '20px' }}>🔴 🔵 🟡 🟢 🔴 🔵</div>
        <div className="minigame-options">
          <button className="minigame-option" onClick={() => setFeedback('No es correcto. Observa bien los colores.')}>1 vez</button>
          <button className="minigame-option correct" onClick={() => { setFeedback(''); setStep(1); }}>2 veces</button>
          <button className="minigame-option" onClick={() => setFeedback('No es correcto. Observa bien los colores.')}>3 veces</button>
        </div>
        {feedback && <p style={{ color: '#FF9800', marginTop: '15px' }}>{feedback}</p>}
        {step === 1 && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#4CAF50' }}>Correcto</h3>
            <p style={{ color: '#ccc', marginBottom: '15px', maxWidth: '500px' }}>
              Redirigir la atención puede darte un respiro y ayudarte a ver la situación con mayor claridad.
            </p>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⭐</div>
            <p style={{ color: '#FFD700', marginBottom: '15px' }}>Herramienta obtenida: Estrella de atención</p>
            <button className="menu-button" onClick={() => onSelectStrategy('Estrella de atención')}>Continuar</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="minigame-container">
      <div className="minigame-title">Elige una estrategia</div>
      <p style={{ color: '#aaa', marginBottom: '25px', maxWidth: '500px' }}>
        Para una intensidad baja, estas estrategias pueden serte útiles:
      </p>
      <div className="minigame-options">
        <button className="minigame-option" onClick={() => handlePathSelect('reevaluacion')} style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>🔄</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Cambia la perspectiva</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Reevaluación cognitiva</div>
            </div>
          </div>
        </button>
        <button className="minigame-option" onClick={() => handlePathSelect('atencion')} style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>🎯</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Redirige tu atención</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Despliegue atencional</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
