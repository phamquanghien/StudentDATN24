import { createContext, useState, FC, ReactNode } from 'react';

// Define the data types for the context state
interface DataContextType {
  titlePage: string;
  setTitlePage: (titlePage: string) => void;
}

const defaultContextValue: DataContextType = {
  titlePage: '',
  setTitlePage: () => {},
};

// Create context with the defined type
export const DataContext = createContext<DataContextType>(defaultContextValue);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [titlePage, setTitlePage] = useState<string>('');

  return (
    <DataContext.Provider
      value={{
        titlePage,
        setTitlePage,
      }}>
      {children}
    </DataContext.Provider>
  );
};
