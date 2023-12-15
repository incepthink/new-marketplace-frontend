import Image, { StaticImageData } from 'next/image';

interface ComponentProps {
  imageSrc: StaticImageData;
}

export default function HomePageImage({ imageSrc }: ComponentProps) {
  return (
    <div className="flex flex-row justify-center items-center md:w-1/2 w-full md:h-full p-3 overflow-hidden">
      <Image
        src={imageSrc}
        layout="cover"
        alt="NFT Image"
        className="rounded-md"
      />
    </div>
  );
}
