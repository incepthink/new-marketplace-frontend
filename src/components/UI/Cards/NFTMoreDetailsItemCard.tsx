import Link from 'next/link';
import NFTDetailItemHeader from '../Typographs/Headings/NFTDetailItemHeader';

interface ComponentProps {
  txn_hash: string;
  uri: string;
}

export default function NFTMoreDetailsItemCard({
  txn_hash,
  uri,
}: ComponentProps) {
  return (
    <div>
      <div className="w-full md:p-3 pt-3 pb-3">
        <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      <NFTDetailItemHeader text="More details" />
      <p className="mb-3 text-gray-500 dark:text-gray-400 md:p-3 pt-0">
        Transaction hash : {txn_hash.substring(0, 5)}....
        {txn_hash.substring(txn_hash.length - 2)}
      </p>
      <p className="mb-3 text-gray-500 dark:text-gray-400 md:p-3 pt-0">
        Token URI :{' '}
        <Link href={uri} className="text-blue-700">
          {uri.substring(0, 5)}....
          {uri.substring(uri.length - 2)}
        </Link>
      </p>
    </div>
  );
}
