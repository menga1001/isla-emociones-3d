interface FinalMessageProps {
  title: string;
  message: string;
  toolUnlocked: string;
  onClose: () => void;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({
  title,
  message,
  toolUnlocked,
  onClose
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="final-message">
        <h2>{title}</h2>
        <p>{message}</p>

        <div style={{
          background: 'rgba(255, 215, 0, 0.2)',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '10px' }}>
            {"\u{1F3C6}"} Herramienta Desbloqueada
          </div>
          <div style={{ color: 'white', fontSize: '1.1rem' }}>
            {toolUnlocked}
          </div>
        </div>

        <button onClick={onClose}>
          Volver al Hub
        </button>
      </div>
    </div>
  );
};
