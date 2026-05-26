"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface EasterEggContextType {
  konamiActivated: boolean;
  setKonamiActivated: (v: boolean) => void;
  duckVisible: boolean;
  setDuckVisible: (v: boolean) => void;
  confettiTriggered: boolean;
  setConfettiTriggered: (v: boolean) => void;
  easterEggsFound: number;
  incrementEasterEggs: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(
  undefined
);

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [duckVisible, setDuckVisible] = useState(true);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [easterEggsFound, setEasterEggsFound] = useState(0);

  const incrementEasterEggs = () =>
    setEasterEggsFound((p) => p + 1);

  return (
    <EasterEggContext.Provider
      value={{
        konamiActivated,
        setKonamiActivated,
        duckVisible,
        setDuckVisible,
        confettiTriggered,
        setConfettiTriggered,
        easterEggsFound,
        incrementEasterEggs,
      }}
    >
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEggs() {
  const ctx = useContext(EasterEggContext);
  if (!ctx)
    throw new Error("useEasterEggs must be used within EasterEggProvider");
  return ctx;
}
