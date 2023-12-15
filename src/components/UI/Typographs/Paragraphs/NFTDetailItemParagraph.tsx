interface ComponentProps {
  text: string;
}

export default function NFTDetailItemParagraph({ text }: ComponentProps) {
  return (
    <p className="mb-3 text-gray-500 dark:text-gray-400 md:p-3 pt-0">{text}</p>
  );
}
