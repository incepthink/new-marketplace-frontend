import React from 'react';
import { AuthState } from '../types/CommonTypes';

export const AuthStateContext = React.createContext<AuthState | undefined>(
  undefined
);
export const AuthDispatchContext = React.createContext<
  React.Dispatch<any> | undefined
>(undefined);

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
}
