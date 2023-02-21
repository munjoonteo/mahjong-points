import { ReactNode } from 'react';

export interface GameContextProviderProps {
  children: ReactNode;
}

export interface NameInputProps {
  seat: string;
  name: string;
  setName: (newName: string) => void;
}

