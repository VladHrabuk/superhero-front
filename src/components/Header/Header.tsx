import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="text-white h-20 bg-green">
      <nav className="flex items-center justify-center h-full">
        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={`${pathname === '/' ? 'font-bold' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={`${pathname === '/create' ? 'font-bold' : ''}`}
            >
              Add Superhero
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
