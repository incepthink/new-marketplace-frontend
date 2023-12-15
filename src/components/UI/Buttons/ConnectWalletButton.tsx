import WalletSVG from '../SVGs/Wallet';

interface ComponentProps {
  connectWalletModalHandler: () => void;
  width: string;
}

export default function ConnectWalletButton({
  connectWalletModalHandler,
  width,
}: ComponentProps) {
  return (
    <button
      onClick={() => connectWalletModalHandler()}
      className={`font-medium rounded-full text-sm px-7 py-4 text-centerborder  border border-mgreen text-[#A7DB22]  w-${width}`}
    >
      <div className="flex flex-row">
        <div className="mr-2">Connect Wallet</div>
        <div>
          <WalletSVG />
        </div>
      </div>
    </button>
  );
}
