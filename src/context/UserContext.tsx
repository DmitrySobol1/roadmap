import { createContext, useContext, useState, type ReactNode } from 'react';

interface UserContextType {
  isPayed: boolean;
  setIsPayed: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isPayed, setIsPayed] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ isPayed, setIsPayed }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
