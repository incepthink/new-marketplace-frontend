'use client';
import { useReducer, ReactNode, useEffect } from 'react';
import {
  AuthDispatchContext,
  AuthStateContext,
} from '../contexts/AuthContexts';
import { AuthReducer } from '../contexts/AuthReducer';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const user = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')!).user
    : null;
  const accessToken = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')!).accessToken
    : null;
  const refreshToken = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')!).refreshToken
    : null;

  const initialState = {
    userDetails: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
    loading: false,
    errorMessage: null,
  };

  const [userLoggedIn, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={userLoggedIn}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
