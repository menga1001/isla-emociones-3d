import { useState } from 'react';

interface SelectorIntensidadProps {
  onSelect: (level: 'baja' | 'media' | 'alta') => void;
  isReevaluation?: boolean;
}

const intensities = [
  {
    level: 'baja' as const,
    label: 'BAJA',
    description: 'Siento tristeza, pero puedo continuar con mis actividades.',
    color: '#4CAF50',
    icon: '💙'
  },
  {
    level: 'media' as const,
    label: 'MEDIA',
    description: 'La tristeza ocupa bastante espacio y comienza a afectar lo que estoy haciendo.',
    color: '#FF9800',
    icon: '🌧️'
  },
  {
    level: 'alta' as const,
    label: 'ALTA',
    description: 'La tristeza es muy intensa y necesito detenerme para afrontar lo que estoy sintiendo.',
    color: '#f44336',
    icon: '⛈️'
  }
];

export const SelectorIntensidad: React.FC<SelectorIntensidadProps> = ({ onSelect, isReevaluation }) => {
  const [selected, setSelected] = useState<'baja' | 'media' | 'alta' | null>(null);

  const handleSelect = (level: 'baja' | 'media' | 'alta') => {
    setSelected(level);
    setTimeout(() => onSelect(level), 500);
  };

  return (
    <div className="minigame-container">
      <div className="minigame-title">
        {isReevaluation ? '¿Cómo está ahora tu tristeza?' : '¿Qué tan intensa está tu tristeza?'}
      </div>

      {!isReevaluation && (
        <p style={{ color: '#aaa', marginBottom: '25px', maxWidth: '500px' }}>
          Selecciona el nivel que mejor represente tu estado emocional. No existen respuestas correctas o incorrectas.
        </p>
      )}

      <div className="minigame-options">
        {intensities.map((intensity) => (
          <button
            key={intensity.level}
            className={`minigame-option ${selected === intensity.level ? 'correct' : 'neutral'}`}
            onClick={() => handleSelect(intensity.level)}
            disabled={selected !== null}
            style={{
              borderColor: intensity.color,
              borderWidth: '2px',
              borderStyle: 'solid',
              padding: '20px',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '2rem' }}>{intensity.icon}</span>
              <div>
                <div style={{ fontWeight: 'bold', color: intensity.color, fontSize: '1.2rem' }}>
                  {intensity.label}
                </div>
                <div style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '5px' }}>
                  {intensity.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
