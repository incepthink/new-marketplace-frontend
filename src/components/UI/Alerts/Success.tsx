import InfoSVG from '../SVGs/Info';

interface ModalProps {
  message: string;
}

export default function Success({ message }: ModalProps) {
  return (
    <div className="fixed bottom-5 right-5">
      <div
        className="flex items-center p-4 ml-5 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-zinc-800 dark:text-green-400"
        role="alert"
      >
        <InfoSVG />
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Success! </span> {message}
        </div>
      </div>
    </div>
  );
}
