import { islandsConfig } from '../../config/islands';

interface InventoryProps {
  items: string[];
}

export const Inventory: React.FC<InventoryProps> = ({ items }) => {
  const allTools = islandsConfig.map(island => ({
    id: island.id,
    icon: island.icon,
    name: island.unlockMessage
  }));

  return (
    <div className="inventory">
      {allTools.map(tool => {
        const isUnlocked = items.includes(tool.id);
        return (
          <div
            key={tool.id}
            className={`inventory-item ${isUnlocked ? '' : 'locked'}`}
            title={isUnlocked ? tool.name : 'Por desbloquear'}
          >
            {tool.icon}
          </div>
        );
      })}
    </div>
  );
};
