import { useState } from 'react';
import CloseSVG from './UI/SVGs/Close';
import EmailSVG from './UI/SVGs/Email';
import PasswordSVG from './UI/SVGs/Password';
import { useAlert } from '@/utils/contexts/AlertContext';
import { loginSubmit } from '@/utils/helpers/EmailLogin';
import { useAuthDispatch } from '@/utils/contexts/AuthContexts';

interface ModalProps {
  loginModalHandler: () => void;
}

export default function Login({ loginModalHandler }: ModalProps) {
  const { showAlert } = useAlert();
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center p-4">
      <button
        type="button"
        className="absolute top-3 right-2.5 text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-zinc-600 dark:hover:text-white"
        data-modal-hide="crypto-modal"
        onClick={() => loginModalHandler()}
      >
        <CloseSVG />
        <span className="sr-only">Close modal</span>
      </button>
      <div className="w-full max-w-sm p-4 bg-white border border-zinc-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-zinc-700 dark:border-zinc-600">
        <form className="space-y-6">
          <h5 className="text-xl font-medium text-zinc-900 dark:text-white">
            Sign in to our platform
          </h5>
          <p className="text-xs text-gray-900 dark:text-white">
            Logging In will enable the premium features of the marketplace such
            as buying and selling of the NFT.
          </p>
          <div>
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <EmailSVG />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-zinc-600 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <PasswordSVG />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-zinc-600 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              loginSubmit(
                e,
                { email, password },
                loginModalHandler,
                showAlert,
                dispatch
              );
            }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
        </form>
      </div>
    </div>
  );
}
