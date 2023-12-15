import { AuthAction, AuthState } from '../types/CommonTypes';

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userDetails: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        userDetails: null,
        accessToken: null,
        refreshToken: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};
