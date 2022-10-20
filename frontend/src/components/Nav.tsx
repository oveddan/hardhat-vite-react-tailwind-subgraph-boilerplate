import { useCallback, useState } from 'react';
import Web3Login from '../web3/Web3Login';
import clsx from 'clsx';

const navItems: {
  name: string;
  link: string;
}[] = [
  {
    name: 'home',
    link: '/home',
  },
  {
    name: 'about',
    link: '/about',
  },
];

const Logo = () => (
  <a href="https://flowbite.com/" className="flex items-center">
    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </a>
);

const NavBarCta = ({ toggleMenu }: { toggleMenu: () => void }) => (
  <button
    data-collapse-toggle="navbar-cta"
    type="button"
    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    aria-controls="navbar-cta"
    aria-expanded="false"
    onClick={(e) => {
      e.preventDefault();
      toggleMenu();
    }}
  >
    <span className="sr-only">Open main menu</span>
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </button>
);

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((existing) => !existing);
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Logo />
          <div className="flex md:order-2">
            <Web3Login />
            <NavBarCta toggleMenu={toggleMenu} />
          </div>
          <div
            className={clsx({
              'hidden justify-between items-center w-full md:flex md:w-auto md:order-1': !menuOpen,
              'justify-between items-center w-full md:flex md:w-auto md:order-1': menuOpen,
            })}
            id="navbar-cta"
          >
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navItems.map(({ link, name }) => (
                <li key={link}>
                  <a
                    href={link}
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
