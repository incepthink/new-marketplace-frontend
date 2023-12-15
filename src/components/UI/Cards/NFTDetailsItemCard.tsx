import NFTDetailItemHeader from '../Typographs/Headings/NFTDetailItemHeader';
import NFTDetailItemParagraph from '../Typographs/Paragraphs/NFTDetailItemParagraph';

interface ComponentProps {
  heading: string;
  text: string;
}
export default function NFTDetailsItemCard({ heading, text }: ComponentProps) {
  return (
    <div>
      <div className="w-full md:p-3 pt-3 pb-3">
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      <NFTDetailItemHeader text={heading} />
      <NFTDetailItemParagraph text={text} />
    </div>
  );
}
