import { loginUser } from '../apis/user';
import { AlertType } from '../contexts/AlertContext';

interface loginObject {
  email: string;
  password: string;
}

export const loginSubmit = async (
  e: any,
  loginObject: loginObject,
  loginModalHandler: () => void,
  showAlert: (type: AlertType, message: string) => void,
  dispatch: (action: any) => void
) => {
  e.preventDefault();
  if (loginObject.email.endsWith('@gmail.com')) {
    try {
      const response = await loginUser(loginObject);
      console.log(response);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
        },
      });
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
        })
      );
      showAlert('success', 'User logged In successfully.');
    } catch (error) {
      console.log(error);
      showAlert('error', 'Error in logging In. Invalid Email or password.');
    }
    loginModalHandler();
  }
  return;
};
