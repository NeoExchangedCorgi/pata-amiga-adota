
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import NavbarUserMenu from "./NavbarUserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Início", path: "/" },
    { name: "Adotar", path: "/animals" },
    { name: "Sobre nós", path: "/about" },
    { name: "Reportar Animal", path: "/report" },
    { name: "Seja Voluntário", path: "/volunteer" },
  ];

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-paraiso-blue dark:text-paraiso-yellow">
              Paraíso dos Focinhos
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.path
                    ? "text-paraiso-blue dark:text-paraiso-yellow font-bold"
                    : "text-gray-600 dark:text-gray-200 hover:text-paraiso-blue dark:hover:text-paraiso-yellow"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pl-4 flex space-x-2 items-center">
              <ThemeToggle />
              <NavbarUserMenu />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <NavbarUserMenu />
            <button
              onClick={toggleMenu}
              className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.path
                    ? "text-paraiso-blue dark:text-paraiso-yellow font-bold"
                    : "text-gray-600 dark:text-gray-200 hover:text-paraiso-blue dark:hover:text-paraiso-yellow"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
