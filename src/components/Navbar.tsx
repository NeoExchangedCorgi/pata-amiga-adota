
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const scrollToDonation = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById('doar');
    if (footer) {
      footer.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src={theme === 'dark' 
              ? "/lovable-uploads/8932c366-3257-4c7b-8bb8-b531e17e6171.png" 
              : "/lovable-uploads/eb8f6f19-0b05-45c1-86d7-d62b41fb48c4.png"
            } 
            alt="Paraíso dos Focinhos" 
            className="h-14 w-14 mr-3" 
          />
          <span className="font-bold text-xl text-paraiso-blue dark:text-white hidden sm:block">Paraíso dos Focinhos</span>
        </Link>

        {/* Mobile menu button and theme toggle */}
        <div className="flex items-center gap-2 bg-transparent">
          <ThemeToggle />
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-paraiso-blue dark:text-black dark:hover:text-white dark:hover:bg-gray-800"
            >
              {isMenuOpen ? 
                <X className="dark:stroke-black dark:hover:stroke-white" /> : 
                <Menu className="dark:stroke-black dark:hover:stroke-white" />
              }
            </Button>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium bg-transparent dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 py-1 rounded transition-colors">
            Início
          </Link>
          <Link to="/animals" className="font-medium bg-transparent dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 py-1 rounded transition-colors">
            Adotar
          </Link>
          <Link to="/report" className="font-medium bg-transparent dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 py-1 rounded transition-colors">
            Encontrei um Animal
          </Link>
          <Link to="/volunteer" className="font-medium bg-transparent dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 py-1 rounded transition-colors">
            Seja Voluntário
          </Link>
          <Link to="/about" className="font-medium bg-transparent dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 py-1 rounded transition-colors">
            Sobre Nós
          </Link>
          <Button className="bg-paraiso-yellow text-paraiso-blue hover:bg-paraiso-blue hover:text-white dark:bg-blue-900 dark:text-white dark:hover:bg-gray-200 dark:hover:text-black transition-colors" onClick={scrollToDonation}>
            Doar
          </Button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link to="/" className="py-2 font-medium dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
              Início
            </Link>
            <Link to="/animals" className="py-2 font-medium dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
              Adotar
            </Link>
            <Link to="/report" className="py-2 font-medium dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
              Encontrei um Animal
            </Link>
            <Link to="/volunteer" className="py-2 font-medium dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
              Seja Voluntário
            </Link>
            <Link to="/about" className="py-2 font-medium dark:bg-blue-900 hover:text-paraiso-blue dark:text-white dark:hover:text-paraiso-yellow dark:hover:bg-gray-800 px-3 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
              Sobre Nós
            </Link>
            <Button 
              className="bg-paraiso-yellow text-paraiso-blue hover:bg-paraiso-blue hover:text-white dark:bg-blue-900 dark:text-white dark:hover:bg-gray-200 dark:hover:text-black transition-colors w-full" 
              onClick={scrollToDonation}
            >
              Doar
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
