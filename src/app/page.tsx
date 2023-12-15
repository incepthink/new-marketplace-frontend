import HomePagePromo from '@/components/UI/Promos/HomePagePromo';
import SampleImage from '../../public/home.png';
import MascotImage from '../../public/mascot.png';
import Explore from '@/components/Explore';

export default function Home() {
  const header1 = (
    <h2 className="mb-4 text-6xl font-extrabold leading-none tracking-wide text-white  m-4">
      Discover, Collect, and Sell Extraordinary{' '}
      <span className="text-[#A7DB22]">NFTs!</span>{' '}
    </h2>
  );

  const header2 = (
    <h2 className="mb-4 text-6xl font-extrabold leading-none tracking-wide text-white md:text-6xl dark:text-white m-4">
      Enhance Your Professional Image with an{' '}
      <span className="text-[#A7DB22]">NFT</span>
    </h2>
  );

  return (
    <div className="bg-black">
      <main className="flex w-full flex-col items-center justify-between">
        <HomePagePromo
          header={header1}
          paragraph="Mint and collect digital assets on Mantle, the most innovative
                L2."
          image={SampleImage}
          backgroundColor="black"
        />
        <Explore title="Explore NFTs" />
        <HomePagePromo
          header={header2}
          image={MascotImage}
          backgroundColor="zinc-800"
        />
      </main>
    </div>
  );
}
