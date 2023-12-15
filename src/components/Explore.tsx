'use client';
import { useState } from 'react';
import LatestNFT from './UI/LatestNFT';
import ListedNFT from './UI/ListedNFT';

interface ComponentProp {
  title: string;
}

export default function Explore({ title }: ComponentProp) {
  const [section, setSection] = useState(true);

  return (
    <div className="w-full content-center">
      <div className="flex mb-10 justify-between w-11/12 mx-auto">
        <h2 className=" text-3xl font-extrabold leading-none tracking-tight md:text-4xl dark:text-white pt-3">
          {title}
        </h2>
        <div
          id="scroll-section"
          className="text-lg font-medium text-center text-white rounded-full flex flex-row w-fit bg-[#1E1E1E]"
        >
          <div className="w-fit" onClick={() => setSection(true)}>
            <div
              className={
                section
                  ? 'inline-block w-fit p-3 px-6 bg-mgreen active rounded-full m-2'
                  : 'inline-block w-fit p-3 px-6 m-2'
              }
              aria-current="page"
            >
              Latest
            </div>
          </div>
          <div className="w-fit" onClick={() => setSection(false)}>
            <div
              className={
                section
                  ? 'inline-block w-fit p-3 px-6 m-2'
                  : 'inline-block w-fit p-3 px-6 bg-mgreen  active rounded-full m-2'
              }
            >
              Listed
            </div>
          </div>
        </div>
      </div>
      {section ? <LatestNFT /> : <ListedNFT />}
    </div>
  );
}
