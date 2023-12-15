import Link from 'next/link';

interface ComponentProp {
  text: string;
  link: string;
}

export default function HomePageCreateNFTButton({ text, link }: ComponentProp) {
  return (
    <div className="p-5 w-full md:w-auto md:p-0">
      <button
        type="button"
        className="text-black bg-mgreen  focus:outline-none font-bold rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-mgreen w-full md:w-1/3 md:m-5"
      >
        {' '}
        <Link href={link}>{text}</Link>
      </button>
    </div>
  );
}
