import { useState } from 'react';

interface EstrategiaMediaProps {
  onSelectStrategy: (strategy: string) => void;
}

export const EstrategiaMedia: React.FC<EstrategiaMediaProps> = ({ onSelectStrategy }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  if (selectedPath === 'aceptacion') {
    const steps = [
      { title: "RECONOCER", text: "Estoy sintiendo tristeza.", icon: "👁️" },
      { title: "COMPRENDER", text: "Esta emoción apareció porque ocurrió algo importante para mí.", icon: "🧠" },
      { title: "ACEPTAR", text: "Puedo sentir tristeza sin juzgarme por sentirla.", icon: "💚" },
    ];

    if (step >= steps.length) {
      return (
        <div className="minigame-container">
          <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>Has completado el Jardín de la Emoción</h2>
          <p style={{ color: '#ccc', marginBottom: '20px', maxWidth: '500px' }}>
            Aceptar una emoción no significa eliminarla ni estar de acuerdo con lo ocurrido. Significa reconocer que está presente sin juzgarla ni intentar rechazarla inmediatamente.
          </p>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌱</div>
          <p style={{ color: '#FFD700', marginBottom: '20px' }}>Recompensa: Semilla de aceptación</p>
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
        <div style={{
          fontSize: '3rem',
          margin: '20px 0'
        }}>
          {currentStep.icon}
        </div>
        <div style={{
          fontSize: '1.5rem',
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
      { title: "1. Identificar el problema", question: "¿Qué está generando la dificultad?", options: ["No sé qué hacer", "Alguien me hizo algo que no me gustó", "Perdí algo importante", "Me siento solo"] },
      { title: "2. Generar alternativas", question: "¿Qué podrías hacer?", options: ["Hablar con alguien", "Ignorar el problema", "Llorar", "Hacer algo diferente"] },
      { title: "3. Elegir una alternativa", question: "¿Cuál elegirías?", options: ["Hablar con alguien de confianza", "No hacer nada", "Enfadarme", "Esperar a que se arregle solo"] },
      { title: "4. Actuar", question: "¡Ahora ponlo en práctica! ¿Qué harías primero?", options: ["Buscar a un amigo y contale lo que pasó", "Ir a mi cuarto y quedarme solo", "Gritar", "No hacer nada"] },
    ];

    if (step >= steps.length) {
      return (
        <div className="minigame-container">
          <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>¡Has completado el camino!</h2>
          <p style={{ color: '#ccc', marginBottom: '20px', maxWidth: '500px' }}>
            Cuando existe algo que podemos modificar, identificar alternativas y actuar puede ayudarnos a afrontar la situación.
          </p>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔧</div>
          <p style={{ color: '#FFD700', marginBottom: '20px' }}>Recompensa: Herramienta de acción</p>
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
              className={`minigame-option ${i === 0 ? '' : 'neutral'}`}
              onClick={() => setStep(step + 1)}
            >
              {option}
            </button>
          ))}
        </div>
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
