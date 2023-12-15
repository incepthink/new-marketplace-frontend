import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import NFTCardImage from '../Images/NFTCardImage';

interface ComponentProps {
  nft: {
    id?: string;
    image: string;
    name: string;
    user_id: string;
  };
}

export default function NFTCard({
  nft: { id, image, name, user_id },
}: ComponentProps) {
  const link = id ? '/viewnft/' + id : '/create';

  return (
    <Link href={link}>
      <div className=" rounded-2xl bg-[#1E1E1E] border-2 border-zinc-900 flex flex-col overflow-hidden">
        <div className="w-80 ">
          {image ? (
            <NFTCardImage image={image} />
          ) : (
            <div className="h-56 text-center place-items-center	justify-center	py-24">
              Image of NFT
            </div>
          )}
        </div>
        <div className="w-full p-3 ">
          <h6 className="text-lg font-bold dark:text-white my-3">{name}</h6>
          <p className="text-gray-500 dark:text-gray-400">Owned By</p>
          <p className="text-white mb-1">
            {user_id.substring(0, 7)}......
            {user_id.substring(user_id.length - 2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
