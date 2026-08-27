import { useGame } from '../../contexts/GameContext';
import { islandsConfig } from '../../config/islands';

export const MenuScreen: React.FC = () => {
  const { state, dispatch } = useGame();

  const handleStart = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'hub' });
  };

  return (
    <div className="menu-screen">
      <div className="menu-island-preview">
        {islandsConfig.map((island) => (
          <div
            key={island.id}
            className="menu-island-icon"
            style={{ color: island.colors.primary }}
          >
            {island.icon}
          </div>
        ))}
      </div>

      <h1 className="menu-title">Isla de las Emociones</h1>
      <p className="menu-subtitle">Un viaje para aprender a manejar tus emociones</p>

      <button className="menu-button" onClick={handleStart}>
        Comenzar Aventura
      </button>

      <div className="menu-features">
        <div className="menu-feature">
          <span className="menu-feature-icon">🎓</span>
          <span>6 islas emocionales</span>
        </div>
        <div className="menu-feature">
          <span className="menu-feature-icon">🎮</span>
          <span>Minijuegos interactivos</span>
        </div>
        <div className="menu-feature">
          <span className="menu-feature-icon">🧠</span>
          <span>Herramientas de regulación</span>
        </div>
      </div>
    </div>
  );
};
