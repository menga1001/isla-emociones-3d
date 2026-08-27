import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { islandsConfig } from '../config/islands';

interface GameSettings {
  subtitles: boolean;
  colorblindMode: boolean;
  reduceMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

interface GameState {
  currentScreen: 'menu' | 'hub' | 'island' | 'minigame' | 'dialog';
  currentIsland: string | null;
  currentLevel: 1 | 2 | 3;
  emotionalMeter: number;
  kitEmocional: string[];
  unlockedIslands: string[];
  completedLevels: Record<string, boolean>;
  completedIslands: string[];
  settings: GameSettings;
}

type GameAction =
  | { type: 'SET_SCREEN'; payload: GameState['currentScreen'] }
  | { type: 'SELECT_ISLAND'; payload: string }
  | { type: 'SET_LEVEL'; payload: 1 | 2 | 3 }
  | { type: 'UPDATE_EMOTIONAL_METER'; payload: number }
  | { type: 'UNLOCK_TOOL'; payload: string }
  | { type: 'UNLOCK_ISLAND'; payload: string }
  | { type: 'COMPLETE_LEVEL'; payload: { islandId: string; level: number } }
  | { type: 'COMPLETE_ISLAND'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<GameSettings> }
  | { type: 'LOAD_PROGRESS'; payload: Partial<GameState> }
  | { type: 'RESET_PROGRESS' };

const initialState: GameState = {
  currentScreen: 'menu',
  currentIsland: null,
  currentLevel: 1,
  emotionalMeter: 90,
  kitEmocional: [],
  unlockedIslands: ['enojo', 'tristeza', 'alegria', 'miedo', 'desagrado', 'sorpresa'],
  completedLevels: {},
  completedIslands: [],
  settings: {
    subtitles: true,
    colorblindMode: false,
    reduceMotion: false,
    fontSize: 'medium'
  }
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };

    case 'SELECT_ISLAND':
      return {
        ...state,
        currentIsland: action.payload,
        currentLevel: 1,
        emotionalMeter: 90
      };

    case 'SET_LEVEL':
      return { ...state, currentLevel: action.payload };

    case 'UPDATE_EMOTIONAL_METER':
      const newMeter = Math.max(30, Math.min(90, action.payload));
      return { ...state, emotionalMeter: newMeter };

    case 'UNLOCK_TOOL':
      if (state.kitEmocional.includes(action.payload)) return state;
      return { ...state, kitEmocional: [...state.kitEmocional, action.payload] };

    case 'UNLOCK_ISLAND':
      if (state.unlockedIslands.includes(action.payload)) return state;
      return { ...state, unlockedIslands: [...state.unlockedIslands, action.payload] };

    case 'COMPLETE_LEVEL':
      const levelKey = `${action.payload.islandId}-${action.payload.level}`;
      return {
        ...state,
        completedLevels: { ...state.completedLevels, [levelKey]: true }
      };

    case 'COMPLETE_ISLAND':
      if (state.completedIslands.includes(action.payload)) return state;
      const nextIslandIndex = islandsConfig.findIndex(i => i.id === action.payload) + 1;
      const nextIsland = islandsConfig[nextIslandIndex];
      const newUnlocked = nextIsland
        ? [...state.unlockedIslands, nextIsland.id]
        : state.unlockedIslands;
      return {
        ...state,
        completedIslands: [...state.completedIslands, action.payload],
        unlockedIslands: newUnlocked
      };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'LOAD_PROGRESS':
      return { ...state, ...action.payload };

    case 'RESET_PROGRESS':
      return initialState;

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'isla-emociones-save';

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_PROGRESS', payload: parsed });
      } catch (e) {
        console.warn('Failed to load save:', e);
      }
    }
  }, []);

  useEffect(() => {
    const toSave = {
      kitEmocional: state.kitEmocional,
      unlockedIslands: state.unlockedIslands,
      completedLevels: state.completedLevels,
      completedIslands: state.completedIslands,
      settings: state.settings
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state.kitEmocional, state.unlockedIslands, state.completedLevels, state.completedIslands, state.settings]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
