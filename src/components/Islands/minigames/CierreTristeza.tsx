import { useState } from 'react';

interface CierreTristezaProps {
  tools: string[];
  onComplete: () => void;
}

const allTools = [
  { name: "Cristal de perspectiva", icon: "💎", description: "Reevaluación cognitiva" },
  { name: "Semilla de aceptación", icon: "🌱", description: "Aceptación emocional" },
  { name: "Herramienta de acción", icon: "🔧", description: "Solución de problemas" },
  { name: "Estrella de atención", icon: "⭐", description: "Despliegue atencional" },
  { name: "Corazón de apoyo", icon: "❤️", description: "Búsqueda de apoyo social" },
];

export const CierreTristeza: React.FC<CierreTristezaProps> = ({ tools, onComplete }) => {
  const [showRewards, setShowRewards] = useState(false);

  return (
    <div className="minigame-container" style={{ maxWidth: '600px' }}>
      {!showRewards ? (
        <>
          <h2 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '1.8rem' }}>
            ¡Has completado el Valle de las Nubes!
          </h2>

          <div style={{
            padding: '25px',
            background: 'rgba(74, 144, 217, 0.2)',
            borderRadius: '15px',
            marginBottom: '25px',
            textAlign: 'left',
            lineHeight: '1.6'
          }}>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              La tristeza es una emoción que puede aparecer ante pérdidas, separaciones, decepciones, rechazos o cambios significativos.
            </p>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              Reconocer qué estás sintiendo y qué tan intensa es la emoción puede ayudarte a decidir cómo afrontarla.
            </p>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              Existen diferentes estrategias de regulación emocional. Aprender a utilizarlas de manera flexible puede ayudarte a afrontar diferentes situaciones.
            </p>
            <p style={{ color: '#FFD700', fontWeight: 'bold' }}>
              Recuerda: regular una emoción no significa eliminarla. Significa aprender a reconocerla y encontrar maneras adecuadas de afrontarla.
            </p>
          </div>

          <button className="menu-button" onClick={() => setShowRewards(true)}>
            VER RECOMPENSAS
          </button>
        </>
      ) : (
        <>
          <h2 style={{ color: '#FFD700', marginBottom: '20px' }}>Recompensas Finales</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '15px',
            marginBottom: '25px',
            maxWidth: '500px'
          }}>
            {allTools.map((tool, i) => (
              <div
                key={i}
                style={{
                  padding: '15px',
                  background: tools.includes(tool.name)
                    ? 'rgba(255, 215, 0, 0.2)'
                    : 'rgba(100, 100, 100, 0.2)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  border: tools.includes(tool.name)
                    ? '2px solid #FFD700'
                    : '2px solid #444'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{tool.icon}</div>
                <div style={{ fontSize: '0.8rem', color: tools.includes(tool.name) ? '#FFD700' : '#666' }}>
                  {tool.name}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '20px',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '15px',
            marginBottom: '25px',
            border: '2px solid #FFD700'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🛡️</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.2rem' }}>
              Insignia desbloqueada
            </div>
            <div style={{ color: '#ccc', marginTop: '5px' }}>
              GUARDIÁN DE LA TRISTEZA
            </div>
          </div>

          <button className="menu-button" onClick={onComplete}>
            CONTINUAR A LA SIGUIENTE ISLA
          </button>
        </>
      )}
    </div>
  );
};
