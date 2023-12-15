import { StaticImageData } from 'next/image';
import HomePageHeader from '../Typographs/Headings/HomePageHeader';
import HomePageParagraph from '../Typographs/Paragraphs/HomePageParagraph';
import HomePageCreateNFTButton from '../Buttons/HomePageCreateNFTButton';
import HomePageImage from '../Images/HomePageImage';
import { ReactNode } from 'react';

interface ComponentProp {
  header: ReactNode;
  paragraph?: string;
  image: StaticImageData;
  backgroundColor: string;
}

export default function HomePagePromo({
  header,
  paragraph,
  image,
  backgroundColor,
}: ComponentProp) {
  return (
    <div className="w-full p-5 md:p-10 flex flex-row justify-center mt-10 ">
      <div
        className={`flex flex-col md:flex-row justify-evenly rounded-md h-full w-full mt-10 bg-${backgroundColor}`}
      >
        <div className=" w-1/12"></div>
        <div className="flex flex-col justify-center md:w-1/2 w-full p-2 ">
          <>{header}</>
          {paragraph && <HomePageParagraph text={paragraph} />}
          {paragraph ? (
            <HomePageCreateNFTButton text="Create NFT" link="/create" />
          ) : (
            <HomePageCreateNFTButton text="Connect Wallet" link="/create" />
          )}
        </div>
        <HomePageImage imageSrc={image} />
      </div>
    </div>
  );
}
