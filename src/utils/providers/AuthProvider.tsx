'use client';
import { useReducer, ReactNode, useEffect, useState } from 'react';
import {
  AuthDispatchContext,
  AuthStateContext,
} from '../contexts/AuthContexts';
import { AuthReducer } from '../contexts/AuthReducer';

interface AuthProviderProps {
  children: ReactNode;
}

const getInitialState = () => ({
  userDetails: null,
  accessToken: null,
  refreshToken: null,
  loading: true,
  errorMessage: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userLoggedIn, dispatch] = useReducer(AuthReducer, getInitialState());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: parsed.user,
          accessToken: parsed.accessToken,
          refreshToken: parsed.refreshToken,
        },
      });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
    setIsHydrated(true);
  }, []);

  return (
    <AuthStateContext.Provider value={userLoggedIn}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
