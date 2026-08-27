import { useState } from 'react';

interface EstrategiaAltaProps {
  onSelectStrategy: (strategy: string) => void;
}

export const EstrategiaAlta: React.FC<EstrategiaAltaProps> = ({ onSelectStrategy }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [waitingRetry, setWaitingRetry] = useState(false);

  if (selectedPath === 'aceptacion') {
    const steps = [
      { title: "Reconocer", text: "Estoy sintiendo una tristeza muy intensa.", icon: "👁️" },
      { title: "Comprender", text: "Esta emoción es fuerte porque algo muy importante para mí ocurrió.", icon: "🧠" },
      { title: "Aceptar", text: "Puedo sentir esta tristeza intensa sin juzgarme. Es una emoción válida.", icon: "💚" },
    ];

    if (step >= steps.length) {
      return (
        <div className="minigame-container">
          <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>Reconocer lo que sientes es el primer paso para comenzar a afrontarlo.</h2>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌱</div>
          <p style={{ color: '#FFD700', marginBottom: '20px' }}>Herramienta obtenida: Semilla de aceptación</p>
          <button className="menu-button" onClick={() => onSelectStrategy('Semilla de aceptación')}>
            Continuar
          </button>
        </div>
      );
    }

    const currentStep = steps[step];

    return (
      <div className="minigame-container">
        <div className="minigame-title">{currentStep.title}</div>
        <div style={{ fontSize: '3rem', margin: '20px 0' }}>{currentStep.icon}</div>
        <div style={{
          fontSize: '1.4rem', padding: '30px', background: 'rgba(76, 175, 80, 0.2)',
          borderRadius: '15px', marginBottom: '30px', color: 'white', maxWidth: '500px'
        }}>
          "{currentStep.text}"
        </div>
        <button className="menu-button" onClick={() => setStep(step + 1)}>
          {step < steps.length - 1 ? 'Siguiente paso' : 'Completar'}
        </button>
      </div>
    );
  }

  if (selectedPath === 'perspectiva') {
    const steps = [
      { title: "Identifica el pensamiento extremo", question: "¿Qué estás pensando?", options: ["Todo está perdido y nunca mejorará", "Esto es difícil pero no define todo", "Nada va a cambiar jamás", "Es un momento muy duro, pero puedo buscar ayuda"], correct: [1, 3] },
      { title: "Busca una interpretación más equilibrada", question: "¿Qué otra forma hay de verlo?", options: ["Solo hay una forma de verlo", "Puedo reconocer el dolor sin asumir que todo está perdido", "Todo es malo", "Hay cosas que no puedo cambiar, pero sí otras que sí"], correct: [1, 3] },
    ];

    if (step >= steps.length) {
      return (
        <div className="minigame-container">
          <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>Nueva perspectiva encontrada</h2>
          <p style={{ color: '#ccc', marginBottom: '20px', maxWidth: '500px' }}>
            Puedes reconocer el dolor de una situación sin asumir que todo está perdido. Esta reevaluación cognitiva te permite ver la realidad de forma más completa.
          </p>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💎</div>
          <p style={{ color: '#FFD700', marginBottom: '20px' }}>Herramienta obtenida: Cristal de perspectiva</p>
          <button className="menu-button" onClick={() => onSelectStrategy('Cristal de perspectiva')}>
            Continuar
          </button>
        </div>
      );
    }

    const currentStep = steps[step];

    return (
      <div className="minigame-container">
        <div className="minigame-title">{currentStep.title}</div>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>{currentStep.question}</p>
        <div className="minigame-options">
          {currentStep.options.map((option, i) => (
            <button
              key={i}
              className={`minigame-option ${currentStep.correct.includes(i) ? '' : 'neutral'}`}
              onClick={() => {
                if (currentStep.correct.includes(i)) {
                  setWaitingRetry(false);
                  setStep(step + 1);
                } else {
                  setWaitingRetry(true);
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
        {waitingRetry && (
          <p style={{ color: '#FF9800', marginTop: '15px' }}>Esa no es una perspectiva equilibrada. Intenta buscar otra forma de verlo.</p>
        )}
      </div>
    );
  }

  if (selectedPath === 'apoyo') {
    return (
      <div className="minigame-container">
        <div className="minigame-title">No tienes que hacerlo solo</div>
        <p style={{ color: '#aaa', marginBottom: '20px', maxWidth: '500px' }}>
          Buscar apoyo social es una estrategia efectiva. Selecciona a alguien de confianza en el escenario.
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '25px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { name: "Familiar cercano", icon: "👨‍👩‍👦", valid: true },
            { name: "Amigo cercano", icon: "👫", valid: true },
            { name: "Profesional", icon: "👨‍🏫", valid: true },
            { name: "Desconocido", icon: "❓", valid: false },
          ].map((person, i) => (
            <button
              key={i}
              className={`minigame-option ${step === 0 ? (person.valid ? '' : 'wrong') : 'neutral'}`}
              onClick={() => {
                if (person.valid) {
                  setStep(1);
                  setWaitingRetry(false);
                } else {
                  setWaitingRetry(true);
                }
              }}
              disabled={step > 0}
              style={{ padding: '15px', textAlign: 'center', minWidth: '120px' }}
            >
              <div style={{ fontSize: '2.5rem' }}>{person.icon}</div>
              <div style={{ marginTop: '8px' }}>{person.name}</div>
            </button>
          ))}
        </div>

        {waitingRetry && step === 0 && (
          <p style={{ color: '#FF9800', marginTop: '10px' }}>Es mejor buscar a alguien que conozcas y en quien confíes.</p>
        )}

        {step === 1 && (
          <div style={{ marginTop: '15px' }}>
            <p style={{ color: '#ccc', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '15px' }}>
              "¿Quieres contarme qué está pasando?"
            </p>
            <div className="minigame-options" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <button className="minigame-option" onClick={() => setStep(2)}>
                "Estoy triste porque algo importante cambió"
              </button>
              <button className="minigame-option neutral" onClick={() => setStep(2)}>
                "No sé cómo explicarlo"
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ marginTop: '15px' }}>
            <h3 style={{ color: '#4CAF50', marginBottom: '15px' }}>Bien hecho</h3>
            <p style={{ color: '#ccc', marginBottom: '15px', maxWidth: '500px' }}>
              Buscar apoyo no es un signo de debilidad. Expresar lo que sientes a alguien de confianza puede ayudarte a procesar la emoción y encontrar nuevas perspectivas.
            </p>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>❤️</div>
            <p style={{ color: '#FFD700', marginBottom: '15px' }}>Herramienta obtenida: Corazón de apoyo</p>
            <button className="menu-button" onClick={() => onSelectStrategy('Corazón de apoyo')}>
              Continuar
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="minigame-container">
      <div className="minigame-title">Elige una estrategia</div>
      <p style={{ color: '#aaa', marginBottom: '25px', maxWidth: '500px' }}>
        Para una intensidad alta, puedes elegir entre estas estrategias:
      </p>
      <div className="minigame-options">
        <button className="minigame-option" onClick={() => setSelectedPath('aceptacion')} style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>🌿</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Reconoce la emoción</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Aceptación emocional</div>
            </div>
          </div>
        </button>
        <button className="minigame-option" onClick={() => setSelectedPath('perspectiva')} style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>🔄</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Cambia la perspectiva</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Reevaluación cognitiva</div>
            </div>
          </div>
        </button>
        <button className="minigame-option" onClick={() => setSelectedPath('apoyo')} style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>❤️</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Busca apoyo</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Red de apoyo social</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
