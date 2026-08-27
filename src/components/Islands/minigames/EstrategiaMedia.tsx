import { useState } from 'react';

interface EstrategiaMediaProps {
  onSelectStrategy: (strategy: string) => void;
}

export const EstrategiaMedia: React.FC<EstrategiaMediaProps> = ({ onSelectStrategy }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [waitingRetry, setWaitingRetry] = useState(false);

  if (selectedPath === 'aceptacion') {
    const steps = [
      { title: "Reconocer", text: "Estoy sintiendo tristeza.", icon: "👁️" },
      { title: "Comprender", text: "Esta emoción apareció porque ocurrió algo importante para mí.", icon: "🧠" },
      { title: "Aceptar", text: "Puedo sentir tristeza sin juzgarme por sentirla.", icon: "💚" },
    ];

    if (step >= steps.length) {
      return (
        <div className="minigame-container">
          <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>Aceptación completada</h2>
          <p style={{ color: '#ccc', marginBottom: '20px', maxWidth: '500px' }}>
            Aceptar una emoción no significa eliminarla ni estar de acuerdo con lo ocurrido. Significa reconocer que está presente sin juzgarla ni intentar rechazarla de inmediato. Este proceso es conocido como aceptación emocional.
          </p>
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
        <div style={{ fontSize: '3rem', margin: '20px 0' }}>
          {currentStep.icon}
        </div>
        <div style={{
          fontSize: '1.4rem',
          padding: '30px',
          background: 'rgba(76, 175, 80, 0.2)',
          borderRadius: '15px',
          marginBottom: '30px',
          color: 'white',
          maxWidth: '500px'
        }}>
          "{currentStep.text}"
        </div>
        <button className="menu-button" onClick={() => setStep(step + 1)}>
          {step < steps.length - 1 ? 'Siguiente paso' : 'Completar'}
        </button>
      </div>
    );
  }

  if (selectedPath === 'problemas') {
    const steps = [
      { title: "Identificar", question: "¿Qué está generando la dificultad?", options: ["No sé qué hacer", "Alguien me hizo algo que no me gustó", "Perdí algo importante", "Me siento solo"], correct: 0 },
      { title: "Generar alternativas", question: "¿Qué podrías hacer al respecto?", options: ["Hablar con alguien", "Ignorar el problema", "Llorar", "Hacer algo diferente"], correct: 0 },
      { title: "Elegir", question: "¿Cuál alternativa elegirías?", options: ["Hablar con alguien de confianza", "No hacer nada", "Enfadarme", "Esperar a que se arregle solo"], correct: 0 },
      { title: "Actuar", question: "¿Qué harías primero?", options: ["Buscar a alguien y contale lo que pasó", "Ir a mi cuarto y quedarme solo", "Gritar", "No hacer nada"], correct: 0 },
    ];

    if (step >= steps.length) {
      return (
        <div className="minigame-container">
          <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>Proceso completado</h2>
          <p style={{ color: '#ccc', marginBottom: '20px', maxWidth: '500px' }}>
            Cuando enfrentas un problema que puedes modificar, identificar alternativas y planificar una acción concreta te ayuda a recuperar la sensación de control.
          </p>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔧</div>
          <p style={{ color: '#FFD700', marginBottom: '20px' }}>Herramienta obtenida: Herramienta de acción</p>
          <button className="menu-button" onClick={() => onSelectStrategy('Herramienta de acción')}>
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
              className={`minigame-option ${i === currentStep.correct ? '' : 'neutral'}`}
              onClick={() => {
                if (i === currentStep.correct) {
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
          <p style={{ color: '#FF9800', marginTop: '15px' }}>Esa no es la mejor opción en este momento. Intenta con otra.</p>
        )}
      </div>
    );
  }

  return (
    <div className="minigame-container">
      <div className="minigame-title">Elige una estrategia</div>
      <p style={{ color: '#aaa', marginBottom: '25px', maxWidth: '500px' }}>
        Para una intensidad media, estas estrategias pueden ayudarte:
      </p>
      <div className="minigame-options">
        <button className="minigame-option" onClick={() => setSelectedPath('aceptacion')} style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>🌿</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Reconoce lo que sientes</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Aceptación emocional</div>
            </div>
          </div>
        </button>
        <button className="minigame-option" onClick={() => setSelectedPath('problemas')} style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>🔧</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Encuentra una salida</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Solución de problemas</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
