// AppContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppState {
  completedTutorial: boolean;
  setCompletedTutorial: (value: boolean) => void;
  musicVolume: number;
  setMusicVolume: (value: number) => void;
  sfxVolume: number;
  setSfxVolume: (value: number) => void;

}

const defaultState: AppState = {
    completedTutorial: false,
    setCompletedTutorial: () => {},
    musicVolume: 50,
    setMusicVolume: () => {},
    sfxVolume: 50,
    setSfxVolume: () => {},
};

const AppContext = createContext<AppState>(defaultState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [completedTutorial, setCompletedTutorial] = useState<boolean>(false);
  const [musicVolume, setMusicVolume] = useState<number>(50);
  const [sfxVolume, setSfxVolume] = useState<number>(50);

  return (
    <AppContext.Provider value={{
      completedTutorial,
      setCompletedTutorial,
      musicVolume,
      setMusicVolume,
      sfxVolume,
      setSfxVolume,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
