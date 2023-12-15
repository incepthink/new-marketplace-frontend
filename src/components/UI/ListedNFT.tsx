import { useState } from 'react';
import NFTCard from './Cards/NFTCard';
import SampleImage from '../../../public/sample.jpg';
import ExploreNFTPagination from './Pagination/ExploreNFTPagination';

export default function ListedNFT() {
  const [page, setPage] = useState(1);
  const object = {
    image: 'XXXX',
    name: 'Sample NFT',
    user_id: 'b7032c41-da54-42df-80da-73e144c7c496',
  };
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full p-10">
        <NFTCard nft={object} />
        <NFTCard nft={object} />
        <NFTCard nft={object} />
        <NFTCard nft={object} />
        <NFTCard nft={object} />
        <NFTCard nft={object} />
      </div>
      <ExploreNFTPagination
        page={page}
        totalPage={1}
        previousFunction={() => {
          setPage(page - 1);
        }}
        nextFunction={() => {
          {
            setPage(page + 1);
          }
        }}
        setFunction={setPage}
      />
    </div>
  );
}
