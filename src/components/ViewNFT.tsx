'use client';
import Image from 'next/image';
import SampleImage from '../../public/sample.jpg';
import LoadingSVG from './UI/SVGs/Loading';
import { useQuery } from '@tanstack/react-query';
import { fetchNFTById } from '@/utils/apis/nft';
import NFTDetailsItemCard from './UI/Cards/NFTDetailsItemCard';
import NFTMoreDetailsItemCard from './UI/Cards/NFTMoreDetailsItemCard';
import ViewNFTPageImage from './UI/Images/ViewNFTPageImage';
import BuyNFTButton from './UI/Buttons/BuyNFTButton';
import HomePageHeader from './UI/Typographs/Headings/HomePageHeader';
import NFTDateButton from './UI/Buttons/NFTDateButton';
import router from 'next/router';

interface ComponentProps {
  id: string;
}

export default function ViewNFT({ id }: ComponentProps) {
  const fetchData = async () => {
    const data = await fetchNFTById({ id });
    return data;
  };

  const { isLoading, isError, data } = useQuery(['nft'], fetchData, {
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
  if (data) {
    return (
      <div className="w-full p-1 sm:p-2 flex flex-col justify-start text-white my-auto">
        <div className="flex flex-col md:flex-row p-5 rounded-md h-4/5 w-5/6 pt-24 mx-auto gap-12">
          <div className="md:w-1/3  w-full md:h-full p-3 overflow-hidden flex flex-col">
            <button className="flex pb-4 pl-2" onClick={() => history.back()}>
              &#8249;
              <span className="pl-1 pb-1">BACK</span>
            </button>
            <ViewNFTPageImage image={data.image_preview} />
          </div>
          <div className="flex flex-col text-base md:w-2/3 w-full p-3">
            {/*<div className="border-2 border-zinc-700 bg-zinc-900 p-4 rounded-lg w-full h-full">
              <HomePageHeader text={data.name} />
              <h6 className="text-lg font-bold dark:text-white m-1 md:p-3">
                Owner is {data.user_id}
              </h6>
              <NFTDateButton date="21-10-2023" />
              <NFTDetailsItemCard
                heading="Quantity Minted"
                text={data.quantity}
              />
              <NFTDetailsItemCard
                heading="Collection Id"
                text={data.collection_id}
              />
              <NFTDetailsItemCard heading="Token Id" text={data.token_id} />
              <NFTDetailsItemCard
                heading="Token description"
                text={data.description}
              />
              <NFTMoreDetailsItemCard txn_hash={data.txn_hash} uri={data.uri} />
            </div>*/}

            <div className="justify-between">
              {/*<span className={Style.nft_minter}>By <span className={Style.nft_mintername}>{(myNFT.wallet_address)?.substring(0,10)}...{(myNFT.wallet_address)?.substring(38)}</span></span>*/}
              <span className="text-base">
                By <span className="text-mgreen">{data.user_id}</span>
              </span>
              <h1 className="text-5xl mt-2">{data.name}</h1>
              <p className="mt-12 mb-8">{data.description}</p>
              <div className="items-center justify-between">
                {
                  <div className="bg-[#202020] p-3 rounded text-lg m-5 ml-0 w-fit">
                    <span className="text=[#8C8C8C]">Created on:</span>
                    <span className="pl-1.5">21-10-23</span>
                  </div>
                }

                {
                  /*myNFT.onsale ? 
              <div><div className={Style.nft_quantity_container}>
              <span className={Style.nft_details_quantity}>Quantity out for sale:  </span> 
              <span  className={Style.nft_details_quantity_amt}>{myNFT.quantityputonsale}</span>
              </div>
              <div className={Style.nft_quantity_container}>
              <div className={Style.nft_details_quantity}>Price:  </div> 
              <div >
              <Image
                src="/icons/mnt.png"
                alt="img"
                width={32}
                height={32}
                className={Style.mnt_logo}
                placeholder="blur"
                blurDataURL="/icons/mnt.png"
                priority
              />
              <span  className={Style.nft_details_quantity_amt}> {myNFT.priceputforsale} </span><span className={Style.nft_details_quantity_amt_right}>MNT</span>
              </div>
              </div></div>
               :  */ <div>
                    <span className="mb-2 text-xl">Quantity minted: </span>
                    <span className="text-3xl text-[#848484]">
                      {data.quantity}
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
