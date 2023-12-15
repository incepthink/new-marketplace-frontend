interface ComponentProps {
  date: string;
}

export default function NFTDateButton({ date }: ComponentProps) {
  return (
    <div className="p-3">
      <button
        type="button"
        className="text-zinc-900 bg-white border border-zinc-300 focus:outline-none hover:bg-zinc-100 focus:ring-4 focus:ring-zinc-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-600 dark:focus:ring-zinc-700"
      >
        Created on {date}
      </button>
    </div>
  );
}
