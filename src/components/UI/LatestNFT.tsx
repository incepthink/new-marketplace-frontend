'use client';
import { useState } from 'react';
import NFTCard from './Cards/NFTCard';
import { useQuery } from '@tanstack/react-query';
import { fetchAllNFT } from '@/utils/apis/nft';
import LoadingSVG from './SVGs/Loading';
import SampleImage from '../../../public/sample.jpg';
import ExploreNFTPagination from './Pagination/ExploreNFTPagination';

export default function LatestNFT() {
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const data = await fetchAllNFT({ page, limit: 8 });
    return data;
  };

  const {
    isLoading,
    isError,
    data: nftData,
  } = useQuery(['nfts', page], fetchData, {
    keepPreviousData: true,
    onSuccess(data) {
      console.log('data', data);
    },
  });

  if (isError)
    return (
      <div className="w-full flex flex-col items-center">
        <p
          id="standard_error_help"
          className="mt-2 text-xs text-red-600 dark:text-red-400 p-5"
        >
          <span className="font-semibold">Oh, snapp!</span> Some error fetching
          the details of NFTs.
        </p>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full flex flex-col items-center">
        <div role="status" className="p-5">
          <LoadingSVG />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (nftData) {
    const items = Array.isArray(nftData.paginatedData)
      ? nftData.paginatedData
      : [];
    return (
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full p-10">
          {items.map((nft: any, index: number) => {
            return (
              <NFTCard
                nft={{
                  id: nft.id,
                  image: nft.image_preview,
                  name: nft.name,
                  user_id: nft.user_id,
                }}
                key={index}
              />
            );
          })}
        </div>
        <ExploreNFTPagination
          page={page}
          totalPage={nftData.totalPage}
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
}
