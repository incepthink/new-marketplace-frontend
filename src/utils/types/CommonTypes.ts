import { IUser } from './UserTypes';

export interface AuthState {
  userDetails: null | IUser;
  accessToken: null | string;
  refreshToken: null | string;
  loading: boolean;
  errorMessage: null | string;
}

export type AuthAction =
  | { type: 'REQUEST_LOGIN' }
  | {
      type: 'LOGIN_SUCCESS';
      payload: {
        user: IUser;
        accessToken: null | string;
        refreshToken: null | string;
      };
    }
  | { type: 'LOGOUT' }
  | { type: 'LOGIN_ERROR'; error: string };
