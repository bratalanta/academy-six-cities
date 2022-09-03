import { createContext, ReactNode, useContext, useState } from 'react';

type ActiveCardState = {
  activeCardId: number | null;
  changeActiveCardId: (id: number | null) => void;
}

const ActiveCardContext = createContext({} as ActiveCardState);

type ActiveCardProviderProps = {
  children: ReactNode
}

export default function ActiveCardProvider({children}: ActiveCardProviderProps): JSX.Element {
  const [activeCardId, changeActiveCardId] = useState<number | null>(null);

  return (
    <ActiveCardContext.Provider value={{activeCardId, changeActiveCardId}}>
      {children}
    </ActiveCardContext.Provider>
  );
}

export const useActiveCardId = () => {
  const context = useContext(ActiveCardContext);

  if (!context) {
    throw new Error('useActiveCardId should work with ActiveCardContext');
  }

  return context;
};
