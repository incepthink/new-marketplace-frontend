import Link from 'next/link';
import PreviousSVG from '../SVGs/Previous';

interface ButtonProps {
  onClick: () => void;
  page: number;
  totalPage: number;
}

export default function PaginationPreviousButton({
  onClick,
  page,
  totalPage,
}: ButtonProps) {
  return (
    <Link href="#scroll-section">
      <button
        onClick={() => {
          onClick();
        }}
        disabled={page === 1}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-zinc-800 rounded-l hover:bg-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
      >
        <PreviousSVG />
        Prev
      </button>
    </Link>
  );
}
