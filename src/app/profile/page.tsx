'use client';
import Explore from '@/components/Explore';
import BackgroundPromo from '@/components/UI/Promos/BackgroundPromo';
import { useAuthState } from '@/utils/contexts/AuthContexts';
import copy from 'copy-to-clipboard';
import CopyImage from '../../../public/copy.png';
import Image from 'next/image';
import { useState } from 'react';
import LatestNFT from '@/components/UI/LatestNFT';
import ListedNFT from '@/components/UI/ListedNFT';

export default function Profile() {
  const [listed, setListed] = useState(false);

  const change = async () => {
    if (listed) {
      setListed(false);
    } else {
      setListed(true);
    }
  };

  const userLoggedIn = useAuthState();
  const sampleImg =
    'https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png';

  const buttondesign =
    'relative pt-1 mb-7 text-center after:absolute after:w-8 after:h-5 before:mt-0 before:border-t-4 before:border-mgreen after:content-none';

  const copyToClipboard = () => {
    copy(userLoggedIn.userDetails?.wallet_address ?? '');
  };

  return (
    <div className="bg-black text-white">
      <BackgroundPromo
        title="Profile"
        subtitle="Unlock the Future of Digital Ownership"
      />
      <div className="w-full mx-0 my-auto -mt-20 flex">
        <div className="w-64 gap-8 border-white/20 pb-12 h-max border-b pl-8">
          <img
            className="h-36 w-36 rounded-full items-center block mb-7 mx-auto"
            src={userLoggedIn.userDetails?.profile_image || sampleImg}
            alt="User DP"
          />
          <div className="place-content-start items-start  ">
            {userLoggedIn.userDetails?.id || userLoggedIn.userDetails?.email ? (
              <div className="w-min">
                <h1 className="text-xl pb-4 w-36">
                  {userLoggedIn.userDetails?.username ? (
                    <>{userLoggedIn.userDetails?.username}</>
                  ) : userLoggedIn.userDetails?.email ? (
                    <span className=" text-xl font-bold ">
                      {userLoggedIn.userDetails?.email}
                    </span>
                  ) : (
                    <>User not found</>
                  )}
                </h1>
                <div className="bg-[#1E1E1E] text-[#A7DB22] p-2 pl-2.5 rounded-lg flex justify-between w-fit gap-2">
                  {userLoggedIn.userDetails?.id ? (
                    <>
                      <span>
                        {(
                          userLoggedIn.userDetails?.wallet_address ?? ''
                        ).substring(0, 7)}
                        .........
                        {(
                          userLoggedIn.userDetails?.wallet_address ?? ''
                        ).substring(40)}
                      </span>
                      <button onClick={copyToClipboard}>
                        <Image
                          src={CopyImage}
                          alt="img"
                          width={12}
                          height={12}
                        />
                      </button>
                    </>
                  ) : userLoggedIn.userDetails?.email ? (
                    <span className=" text-xl font-bold ">
                      {userLoggedIn.userDetails?.email}
                    </span>
                  ) : (
                    <>User not found</>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full sm:column grid justify-evenly items-center	 mt-20 border-l-[1px] border-[#ffffff]/20">
          <div className="sm:ml-10">
            <div className="flex text-xl gap-8 justify-start mb-2.5 mt-12 ml-4">
              {listed ? (
                <button
                  className={buttondesign + ' text-[#848484] '}
                  onClick={() => change()}
                >
                  All NFTs
                </button>
              ) : (
                <button
                  className={
                    buttondesign +
                    ' after:absolute + after:w-8 after:h-5 before:top-0 before:border-t-2 border-mgreen'
                  }
                >
                  All NFTs
                </button>
              )}
              {!listed ? (
                <button
                  className={buttondesign + ' text-[#848484]'}
                  onClick={() => change()}
                >
                  Listed NFTs
                </button>
              ) : (
                <button
                  className={
                    buttondesign +
                    ' after:absolute + after:w-8 after:h-5 before:top-0 before:border-t-2 border-mgreen'
                  }
                >
                  Listed NFTs
                </button>
              )}
            </div>
            {!listed ? <LatestNFT /> : <ListedNFT />}
          </div>
        </div>
      </div>
    </div>
  );
}
