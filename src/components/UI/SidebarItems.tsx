import { useAuthState } from '@/utils/contexts/AuthContexts';
import ConnectWalletButton from './Buttons/ConnectWalletButton';
import WalletConnectedButton from './Buttons/WalletConnectedButton';

interface Route {
  url: string;
  name: string;
}

interface ModalProps {
  routes: Route[];
  connectWalletHandler: () => void;
}

export default function SidebarItems({
  routes,
  connectWalletHandler,
}: ModalProps) {
  const userLoggedIn = useAuthState();

  return (
    <div className="bg-white divide-y divide-zinc-100 rounded-lg shadow w-full dark:bg-zinc-700">
      <ul
        className="py-2 text-sm text-zinc-700 dark:text-zinc-200"
        aria-labelledby="dropdownDefaultButton"
      >
        {routes.map((route: { url: string; name: string }, key: number) => (
          <li key={key}>
            <a
              href={route.url}
              className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white"
            >
              {route.name}
            </a>
          </li>
        ))}
        <li className="pt-2 pr-2 pl-2">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
          >
            Create NFT
          </button>
        </li>
        <li className="pt-2 pr-2 pl-2">
          {userLoggedIn.userDetails === null ? (
            <ConnectWalletButton
              connectWalletModalHandler={connectWalletHandler}
              width="full"
            />
          ) : (
            <WalletConnectedButton
              wallet_address={userLoggedIn.userDetails.wallet_address}
              width="full"
            />
          )}
        </li>
      </ul>
    </div>
  );
}
