import Image, { StaticImageData } from 'next/image';

interface ComponentProps {
  image: string;
}

export default function NFTCardImage({ image }: ComponentProps) {
  const src = image;

  return (
    <Image
      loader={() => image}
      src={src}
      width={0}
      height={0}
      sizes="100vw"
      className="w-80 h-56"
      alt="NFT Image"
    />
  );
}
