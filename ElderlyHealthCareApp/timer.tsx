import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimerContextType {
  startTime: number | null;
  startTimer: () => void;
  getElapsedTime: () => number | null;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [startTime, setStartTime] = useState<number | null>(null);

  const startTimer = () => {
    setStartTime(performance.now());
  };

  const getElapsedTime = () => {
    if (startTime !== null) {
      return performance.now() - startTime;
    }
    return null;
  };

  return (
    <TimerContext.Provider value={{ startTime, startTimer, getElapsedTime }}>
      {children}
    </TimerContext.Provider>
  );
};

// Define the useTimer hook that consumes the context
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within TimerProvider");
  }
  return context;
};
