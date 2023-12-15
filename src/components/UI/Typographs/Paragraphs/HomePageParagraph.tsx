interface ComponentProps {
  text: string;
}

export default function HomePageParagraph({ text }: ComponentProps) {
  return <p className="text-l text-gray-900 dark:text-white m-5">{text}</p>;
}
