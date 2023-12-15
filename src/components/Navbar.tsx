'use client';
import Link from 'next/link';
import { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import { routes } from '@/utils/constants/page';
import NavbarItems from './UI/NavbarItems';
import Sidebar from './Sidebar';
import { useAuthState } from '@/utils/contexts/AuthContexts';
import Login from './Login';
import NavbarCreateNFTButton from './UI/Buttons/NavbarCreateNFTButton';
import ConnectWalletButton from './UI/Buttons/ConnectWalletButton';
import WalletConnectedButton from './UI/Buttons/WalletConnectedButton';
import NavbarMenuButton from './UI/Buttons/NavbarMenuButton';
import Image from 'next/image';
import LogoImage from '../../public/logo.png';

export default function Navbar() {
  const userLoggedIn = useAuthState();
  const [sideBar, setSideBar] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  console.log(userLoggedIn);

  function sideBarHandler() {
    setSideBar(!sideBar);
  }

  function connectWalletModalHandler() {
    setConnectWalletModal(!connectWalletModal);
  }

  function loginModalHandler() {
    setLoginModal(!loginModal);
  }

  return (
    <nav className=" border-b-2 border-b-white/20 border-t-2 border-t-black fixed z-50 w-full backdrop-blur-lg">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <Image
              src={LogoImage}
              layout="cover"
              alt="NFT Image"
              className="rounded-md"
            />
          </span>
        </Link>
        <div className="flex md:order-2">
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 relative">
            <NavbarCreateNFTButton />
            {userLoggedIn.userDetails === null ? (
              <ConnectWalletButton
                connectWalletModalHandler={connectWalletModalHandler}
                width="auto"
              />
            ) : (
              <WalletConnectedButton
                wallet_address={userLoggedIn.userDetails.wallet_address}
                width="auto"
              />
            )}
          </div>
          <NavbarMenuButton sideBarHandler={sideBarHandler} />
        </div>
        <NavbarItems routes={routes} />
      </div>
      <div>
        {sideBar && (
          <Sidebar
            sideBarHandler={sideBarHandler}
            connectWalletModalHandler={connectWalletModalHandler}
          />
        )}
      </div>
      <div>
        {connectWalletModal && (
          <ConnectWallet
            connectWalletModalHandler={connectWalletModalHandler}
            loginModalHandler={loginModalHandler}
          />
        )}
      </div>
      <div>{loginModal && <Login loginModalHandler={loginModalHandler} />}</div>
    </nav>
  );
}
