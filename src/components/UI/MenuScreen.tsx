import { useGame } from '../../contexts/GameContext';

export const MenuScreen: React.FC = () => {
  const { dispatch } = useGame();

  const handleStart = () => {
    dispatch({ type: 'SELECT_ISLAND', payload: 'tristeza' });
    dispatch({ type: 'SET_SCREEN', payload: 'island' });
  };

  return (
    <div className="menu-screen">
      <h1 className="menu-title">Isla de las Emociones</h1>
      <p className="menu-subtitle">Isla de la Tristeza</p>

      <div style={{ margin: '30px 0', fontSize: '4rem' }}>
        🌧️
      </div>

      <button className="menu-button" onClick={handleStart}>
        COMENZAR
      </button>

      <div className="menu-features">
        <div className="menu-feature">
          <span className="menu-feature-icon">🧠</span>
          <span>Regulación emocional</span>
        </div>
        <div className="menu-feature">
          <span className="menu-feature-icon">🎮</span>
          <span>Minijuegos interactivos</span>
        </div>
      </div>
    </div>
  );
};
