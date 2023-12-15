'use client';
import CloseSVG from '@/components/UI/SVGs/Close';
import MetaMaskSVG from '@/components/UI/SVGs/Metamask';
import WalletConnectSVG from '@/components/UI/SVGs/WalletConnect';
import { useAlert } from '@/utils/contexts/AlertContext';
import { useAuthDispatch, useAuthState } from '@/utils/contexts/AuthContexts';
import { connectToMetamask } from '@/utils/helpers/MetmaskLogin';
import EmailSVG from './UI/SVGs/Email';

interface ModalProps {
  connectWalletModalHandler: () => void;
  loginModalHandler: () => void;
}

export default function ConnectWallet({
  connectWalletModalHandler,
  loginModalHandler,
}: ModalProps) {
  const userLoggedIn = useAuthState();
  const dispatch = useAuthDispatch();
  const { showAlert } = useAlert();
  console.log(userLoggedIn);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center p-4">
      <div className="relative w-full max-w-md max-h-full opacity-100">
        <div className="relative bg-white rounded-lg shadow dark:bg-zinc-700 opacity-100">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-zinc-600 dark:hover:text-white"
            data-modal-hide="crypto-modal"
            onClick={() => connectWalletModalHandler()}
          >
            <CloseSVG />
            <span className="sr-only">Close modal</span>
          </button>

          <div className="px-6 py-4 border-b rounded-t dark:border-zinc-600">
            <h3 className="text-base font-semibold text-zinc-900 lg:text-xl dark:text-white">
              Connect wallet
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
              Connect with one of our available wallet providers.
            </p>
            <ul className="my-4 space-y-3">
              <li>
                <div
                  onClick={() =>
                    connectToMetamask(
                      dispatch,
                      connectWalletModalHandler,
                      showAlert
                    )
                  }
                  className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-lg bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:text-white"
                >
                  <MetaMaskSVG />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    MetaMask
                  </span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-zinc-500 bg-zinc-200 rounded dark:bg-zinc-700 dark:text-zinc-400">
                    Popular
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-lg bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:text-white">
                  <WalletConnectSVG />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    WalletConnect
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    connectWalletModalHandler();
                    loginModalHandler();
                  }}
                  className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-lg bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:text-white"
                >
                  <EmailSVG />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Login with Email
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
