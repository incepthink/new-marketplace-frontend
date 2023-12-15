import MenuSVG from '../SVGs/Menu';

interface ComponentProps {
  sideBarHandler: () => void;
}

export default function NavbarMenuButton({ sideBarHandler }: ComponentProps) {
  return (
    <button
      onClick={() => sideBarHandler()}
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-zinc-500 rounded-lg md:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
      data-collapse-toggle="navbar-cta"
      aria-controls="navbar-cta"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <MenuSVG />
    </button>
  );
}
