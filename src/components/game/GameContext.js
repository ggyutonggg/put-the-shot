// src/components/game/GameContext.js
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [result, setResult] = useState(null);

  const value = {
    selectedCharacter,
    setSelectedCharacter,
    result,
    setResult,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
