import Link from 'next/link';

export default function NavbarCreateNFTButton() {
  return (
    <Link href={`/create`}>
      <button
        type="button"
        className="focus:outline-none font-large rounded-full text-sm px-7 py-4 text-center bg-mgreen/20 text-[#A7DB22] mr-3"
      >
        Create NFT
      </button>
    </Link>
  );
}
