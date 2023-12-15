'use client';

import { routes } from '@/utils/constants/page';
import SidebarItems from './UI/SidebarItems';

interface ModalProps {
  sideBarHandler: () => void;
  connectWalletModalHandler: () => void;
}

export default function Sidebar({
  sideBarHandler,
  connectWalletModalHandler,
}: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-start md:hidden">
      <div className="h-full w-2/3 bg-zinc-900/50 p-2">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-10"></div>
        <SidebarItems
          routes={routes}
          connectWalletHandler={connectWalletModalHandler}
        />
      </div>
      <div
        className="h-full w-1/3"
        onClick={() => {
          sideBarHandler();
        }}
      ></div>
    </div>
  );
}
