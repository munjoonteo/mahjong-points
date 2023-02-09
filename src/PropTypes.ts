import { ReactNode } from 'react';

export interface GameContextProviderProps {
  children: ReactNode;
}

export interface NameInputProps {
  name: string;
  setName: (newName: string) => void;
}
