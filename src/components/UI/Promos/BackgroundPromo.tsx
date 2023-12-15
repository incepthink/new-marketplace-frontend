import Image from 'next/image';
import GreenLineImage from '../../../../public/greenline.png';

interface ComponentProp {
  title: string;
  subtitle: string;
}

export default function BackgroundPromo({ title, subtitle }: ComponentProp) {
  return (
    <div className="bg-bg2 bg-cover bg-center	bg-fixed text-3xl text-center h-screen/3 	place-content-center">
      <div className="m-auto w-1/2 pt-40">
        <span className="grid grid-cols-3 auto-cols-min w-fit gap-4 items-center text-lg text-mgreen">
          <span className="place-self-end self-center">
            <Image src={GreenLineImage} alt="img" placeholder="blur" priority />
          </span>{' '}
          {subtitle}
          <Image src={GreenLineImage} alt="img" placeholder="blur" priority />
        </span>

        <h1 className="font-black	">{title}</h1>
      </div>
    </div>
  );
}
