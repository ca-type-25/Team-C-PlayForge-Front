
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Studio } from '../types/studio';
import api from '../api';

interface StudioContextType {
  studios: Studio[];
  refreshStudios: () => void;
}

const StudioContext = createContext<StudioContextType>({
  studios: [],
  refreshStudios: () => {},
});

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studios, setStudios] = useState<Studio[]>([]);

  const refreshStudios = async () => {
    try {
      const res = await api.get('/studios');
      setStudios(res.data);
    } catch (err) {
      console.error('Failed to fetch studios:', err);
    }
  };

  useEffect(() => {
    refreshStudios();
  }, []);

  return (
    <StudioContext.Provider value={{ studios, refreshStudios }}>
      {children}
    </StudioContext.Provider>
  );
};

export const useStudios = () => useContext(StudioContext);
