import { useGame } from '../../contexts/GameContext';

interface EmotionalMeterProps {
  value: number;
}

export const EmotionalMeter: React.FC<EmotionalMeterProps> = ({ value }) => {
  const { state } = useGame();
  const { colorblindMode } = state.settings;

  const getColor = (val: number) => {
    if (colorblindMode) {
      return val > 70 ? '#0077BB' : val > 50 ? '#EE7733' : '#CC3311';
    }
    if (val > 70) return '#4CAF50';
    if (val > 50) return '#FFC107';
    if (val > 30) return '#FF9800';
    return '#F44336';
  };

  const getLabel = (val: number) => {
    if (val > 70) return 'Calma';
    if (val > 50) return 'Regular';
    if (val > 30) return 'Activa';
    return 'Muy activa';
  };

  return (
    <div className="emotional-meter">
      <div
        className="meter-fill"
        style={{
          height: `${value}%`,
          background: `linear-gradient(to top, ${getColor(value)}, ${getColor(value)}88)`
        }}
      />
      <div className="meter-label">{getLabel(value)}</div>
    </div>
  );
};
