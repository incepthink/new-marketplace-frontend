import InfoSVG from '../SVGs/Info';

interface ModalProps {
  message: string;
}

export function Error({ message }: ModalProps) {
  return (
    <div className="fixed bottom-5 right-5">
      <div
        className="flex items-center p-4 ml-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-zinc-800 dark:text-red-400"
        role="alert"
      >
        <InfoSVG />
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Error! </span>
          {message}
        </div>
      </div>
    </div>
  );
}
