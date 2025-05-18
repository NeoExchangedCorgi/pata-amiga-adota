
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/eb8f6f19-0b05-45c1-86d7-d62b41fb48c4.png" 
            alt="Paraíso dos Focinhos" 
            className="h-14 w-14 mr-3"
          />
          <span className="font-bold text-xl text-paraiso-blue hidden sm:block">Paraíso dos Focinhos</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-paraiso-blue transition-colors">
            Início
          </Link>
          <Link to="/animals" className="font-medium hover:text-paraiso-blue transition-colors">
            Adotar
          </Link>
          <Link to="/report" className="font-medium hover:text-paraiso-blue transition-colors">
            Encontrei um Animal
          </Link>
          <Link to="/volunteer" className="font-medium hover:text-paraiso-blue transition-colors">
            Seja Voluntário
          </Link>
          <Link to="/about" className="font-medium hover:text-paraiso-blue transition-colors">
            Sobre Nós
          </Link>
          <Button className="bg-paraiso-yellow text-paraiso-blue hover:bg-paraiso-blue hover:text-white transition-colors">
            Doar
          </Button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link 
              to="/" 
              className="py-2 font-medium hover:text-paraiso-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/animals" 
              className="py-2 font-medium hover:text-paraiso-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Adotar
            </Link>
            <Link 
              to="/report" 
              className="py-2 font-medium hover:text-paraiso-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Encontrei um Animal
            </Link>
            <Link 
              to="/volunteer" 
              className="py-2 font-medium hover:text-paraiso-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Seja Voluntário
            </Link>
            <Link 
              to="/about" 
              className="py-2 font-medium hover:text-paraiso-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Button className="bg-paraiso-yellow text-paraiso-blue hover:bg-paraiso-blue hover:text-white transition-colors w-full">
              Doar
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
