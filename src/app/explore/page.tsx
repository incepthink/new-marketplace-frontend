import Explore from '@/components/Explore';
import LatestNFT from '@/components/UI/LatestNFT';
import BackgroundPromo from '@/components/UI/Promos/BackgroundPromo';

export default function ExplorePage() {
  return (
    <div className="bg-black text-white">
      <BackgroundPromo
        title="Explore"
        subtitle="Discover, Collect, Trade: NFT Wonderland"
      />
      <div className="mt-10">
        <Explore title="" />
      </div>
    </div>
  );
}
