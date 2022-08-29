import { createContext, ReactNode, useState } from 'react';

type ActiveCardContext = [number | null, (id: number | null) => void]

export const activeCardContext = createContext({} as ActiveCardContext);

type ActiveCardProviderProps = {
  children: ReactNode
}

export default function ActiveCardProvider({children}: ActiveCardProviderProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <activeCardContext.Provider value={[activeCardId, setActiveCardId]}>
      {children}
    </activeCardContext.Provider>
  );
}
