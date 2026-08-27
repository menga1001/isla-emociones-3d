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
            Isla de la Tristeza completada
          </h2>

          <div style={{
            padding: '25px',
            background: 'rgba(74, 144, 217, 0.2)',
            borderRadius: '15px',
            marginBottom: '25px',
            textAlign: 'left',
            lineHeight: '1.7'
          }}>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              La tristeza es una emoción que puede aparecer ante pérdidas, separaciones, decepciones o cambios significativos. Es una respuesta natural del organismo.
            </p>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              Reconocer qué estás sintiendo y evaluar la intensidad de la emoción te permite decidir cómo afrontarla de manera más consciente.
            </p>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              Las estrategias de regulación emocional — como la reevaluación cognitiva, la aceptación, la solución de problemas, el despliegue atencional y la búsqueda de apoyo — son herramientas que puedes utilizar de forma flexible según la situación.
            </p>
            <p style={{ color: '#FFD700', fontWeight: 'bold' }}>
              Recordá: regular una emoción no significa eliminarla. Significa aprender a reconocerla y encontrar maneras adecuadas de afrontarla.
            </p>
          </div>

          <button className="menu-button" onClick={() => setShowRewards(true)}>
            VER HERRAMIENTAS OBTENIDAS
          </button>
        </>
      ) : (
        <>
          <h2 style={{ color: '#FFD700', marginBottom: '20px' }}>Herramientas obtenidas</h2>

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
            CONTINUAR
          </button>
        </>
      )}
    </div>
  );
};
