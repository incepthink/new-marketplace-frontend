import Link from 'next/link';
import Image from 'next/image';
import LogoImage from '../../public/logo.png';
import TwitterLogoImage from '../../public/twitter.png';

export default function Footer() {
  return (
    <footer className="w-full z-40 border-t-2 border-mgreen text-white bg-black">
      <div className="grid grid-cols-2	 justify-between pt-8 pb-12 px-6">
        <div className="ml-12 place-content-center	pb-12 border-b-2 border-[#FFFFFF]/40">
          <span>
            <Image
              src={LogoImage}
              layout="cover"
              alt="NFT Image"
              className="rounded-md"
            />
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-around	align-start text-base border-b-2 border-[#FFFFFF]/40 pb-12">
          <div>
            <h1 className="font-extrabold text-lg	pb-10">Marketplace</h1>
            {/*<p><Link href="/">NFTs</Link></p>*/}
            <p className="pb-6 text-[#FFFFFF]/50">
              <Link href="/explore/explore">All NFTs</Link>
            </p>
            <p className="pb-6 text-[#FFFFFF]/50">
              <Link href="https://www.hashcase.co/">About</Link>
            </p>
          </div>
          <div>
            <ul>
              <h1 className="font-extrabold	text-lg pb-10">Support</h1>
              <p className="pb-6 text-[#FFFFFF]/50">
                <Link href="https://www.hashcase.co/">Help</Link>
              </p>
              <p className="pb-6 text-[#FFFFFF]/50">
                <Link href="/">Activity</Link>
              </p>
            </ul>
          </div>
          <div>
            <ul>
              <h1 className="font-extrabold	text-lg pb-10">Follow Us</h1>
              <Link href="https://twitter.com/hash_case">
                <div className="w-8 h-8">
                  <Image
                    src={TwitterLogoImage}
                    layout="cover"
                    alt="NFT Image"
                    className="rounded-md"
                  />
                </div>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
