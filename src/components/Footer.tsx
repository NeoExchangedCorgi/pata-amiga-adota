
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-paraiso-blue text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Paraíso dos Focinhos</h3>
            <p className="mb-4">
              ONG sem fins lucrativos, fundada em 2011, dedicada ao resgate, 
              proteção e cuidado de animais de rua no Rio de Janeiro.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/ongparaisodosfocinhos/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-paraiso-yellow transition-colors"
              >
                <Facebook />
              </a>
              <a 
                href="https://www.instagram.com/ongparaisodosfocinhos/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-paraiso-yellow transition-colors"
              >
                <Instagram />
              </a>
              <a 
                href="mailto:contato@paraisodosfocinhos.com.br" 
                className="hover:text-paraiso-yellow transition-colors"
              >
                <Mail />
              </a>
              <a 
                href="https://wa.me/5521976090612" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-paraiso-yellow transition-colors"
              >
                <Phone />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-paraiso-yellow transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/animals" className="hover:text-paraiso-yellow transition-colors">Adotar</Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-paraiso-yellow transition-colors">Encontrei um Animal</Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-paraiso-yellow transition-colors">Seja Voluntário</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-paraiso-yellow transition-colors">Sobre Nós</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(21) 97609-0612</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@paraisodosfocinhos.com.br</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-bold mb-2">Faça uma doação pelo PIX</h4>
              <p className="text-sm">Chave: 21976090612</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-4 text-center">
          <p>&copy; 2025 Paraíso dos Focinhos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
