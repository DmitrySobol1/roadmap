import { createContext, useContext, useState, type ReactNode } from 'react';

interface UserContextType {
  isPayed: boolean;
  setIsPayed: (value: boolean) => void;
  dateTillPayed: string | null;
  setDateTillPayed: (value: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isPayed, setIsPayed] = useState<boolean>(false);
  const [dateTillPayed, setDateTillPayed] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ isPayed, setIsPayed, dateTillPayed, setDateTillPayed }}>
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
