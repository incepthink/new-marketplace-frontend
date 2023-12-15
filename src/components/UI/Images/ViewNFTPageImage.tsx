import Image, { StaticImageData } from 'next/image';

interface ComponentProps {
  image: string;
}
export default function ViewNFTPageImage({ image }: ComponentProps) {
  const src = image;
  return (
    <Image
      loader={() => image}
      src={src}
      width={700}
      height={741}
      layout="cover"
      alt="NFT Image"
      className="rounded-xl h-screen/2"
    />
  );
}
