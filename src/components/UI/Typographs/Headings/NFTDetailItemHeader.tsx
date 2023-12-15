interface ComponentProps {
  text: string;
}
export default function NFTDetailItemHeader({ text }: ComponentProps) {
  return <h6 className="text-xl font-bold dark:text-white md:p-3">{text}</h6>;
}
