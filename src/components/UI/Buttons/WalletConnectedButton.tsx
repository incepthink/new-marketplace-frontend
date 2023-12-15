import DropdownSVG from '../SVGs/DropdownSVG';
import LogoutSVG from '../SVGs/Logout';
import { useAuthDispatch } from '@/utils/contexts/AuthContexts';
import { logoutUser } from '@/utils/contexts/AuthActions';
import { useState } from 'react';

interface ComponentProps {
  wallet_address: string | null | undefined;
  width: string;
}

export default function WalletConnectedButton({
  wallet_address,
  width,
}: ComponentProps) {
  const dispatch = useAuthDispatch();
  const [drop, setDrop] = useState(false);
  return (
    <div>
      {/*<button
        className={`text-[#A7DB22] bg-black border border-mgreen font-medium rounded-full text-sm px-7 py-4 mr-2 mb-2 mt-2 inline-flex items-center w-${width}`}
        type="button"
      >
        {wallet_address?.substring(0, 10)}... <DropdownSVG />
  </button>*/}

      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdownId"
        onClick={() => setDrop(!drop)}
        className="text-[#A7DB22] bg-black font-medium rounded-full border border-mgreen text-sm px-7 py-4 text-center inline-flex items-center"
        type="button"
      >
        My Profile{' '}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {drop ? (
        <div
          id="dropdownId"
          className="z-50 divide-y divide-gray-100 rounded-lg border-mgreen border shadow w-max text-[#A7DB22] bg-black absolute m-2 mr-4"
        >
          <ul className="py-2 text-sm " aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="/profile" className="block px-4 py-2 ">
                My Profile
              </a>
            </li>
            <li>
              <button
                onClick={() => logoutUser(dispatch)}
                className="flex align-items px-4 py-2 "
              >
                <LogoutSVG />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : null}

      {/*<button className="bg-black" onClick={() => logoutUser(dispatch)}>
        <LogoutSVG />
</button>*/}
    </div>
  );
}
