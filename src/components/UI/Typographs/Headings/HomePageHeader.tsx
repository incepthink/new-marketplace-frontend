interface ComponentProps {
  text: string;
}

export default function HomePageHeader({ text }: ComponentProps) {
  return (
    <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-zinc-900 md:text-4xl dark:text-white m-4">
      {text}
    </h2>
  );
}
