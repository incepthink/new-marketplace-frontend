import Link from 'next/link';
import NextSVG from '../SVGs/Next';

interface ButtonProps {
  onClick: () => void;
  page: number;
  totalPage: number;
}

export default function PaginationNextButton({
  onClick,
  page,
  totalPage,
}: ButtonProps) {
  return (
    <Link href="#scroll-section">
      <button
        onClick={() => onClick()}
        disabled={page === totalPage}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-zinc-800 border-0 border-l border-zinc-700 rounded-r hover:bg-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
      >
        Next
        <NextSVG />
      </button>
    </Link>
  );
}
