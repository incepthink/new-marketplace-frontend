import Link from 'next/link';

interface Route {
  url: string;
  name: string;
}

interface ModalProps {
  routes: Route[];
}

export default function NavbarItems({ routes }: ModalProps) {
  return (
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-cta"
    >
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
        {routes.map((route: { url: string; name: string }, key: number) => {
          return (
            <li key={key}>
              <Link
                href={route.url}
                className="block py-2 pl-3 pr-4 rounded md:p-0 text-white"
              >
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
