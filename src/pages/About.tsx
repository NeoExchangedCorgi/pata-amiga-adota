
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const About = () => {
  const scrollToDonation = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById('doar');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-paraiso-lightblue py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-paraiso-blue mb-4">Sobre o Paraíso dos Focinhos</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Uma ONG dedicada ao resgate, proteção e cuidado de animais de rua desde 2011.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-paraiso-blue mb-6">Nossa História</h2>
            <p className="text-gray-700 mb-4">
              O Paraíso dos Focinhos foi fundado em 2011 com a missão de resgatar, tratar e encontrar lares 
              amorosos para animais abandonados e maltratados. Ao longo de 14 anos de história, 
              crescemos para nos tornarmos uma das maiores ONGs de proteção animal do estado do Rio de Janeiro.
            </p>
            <p className="text-gray-700 mb-4">
              Atualmente, cuidamos de mais de 500 animais resgatados, incluindo cães, gatos, cavalos 
              e até mesmo um porco. Nossa estrutura cresceu, e hoje contamos com três sítios de 
              aproximadamente 7 mil m² cada, proporcionando espaço e qualidade de vida para todos 
              os animais sob nossa proteção.
            </p>
            <p className="text-gray-700">
              Nossos esforços são focados não apenas no resgate e reabilitação, mas também na 
              promoção da adoção responsável e na conscientização sobre o bem-estar animal.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZyUyMHNoZWx0ZXJ8ZW58MHx8MHx8fDA%3D" 
              alt="Abrigo do Paraíso dos Focinhos" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-paraiso-blue mb-6 text-center">Nossa Estrutura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-paraiso-lightyellow p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Amplos Espaços</h3>
              <p className="text-gray-700">
                Contamos com três sítios, cada um com aproximadamente 7 mil m², 
                com espaços adequados para cada espécie animal.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-paraiso-lightyellow p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚕️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cuidados Médicos</h3>
              <p className="text-gray-700">
                Possuímos 3 enfermarias e um centro médico para atendimento 
                veterinário completo dos animais resgatados.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-paraiso-lightyellow p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🐾</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Espaços Específicos</h3>
              <p className="text-gray-700">
                Quatro gatis, 120 baias amplas com até 50 m², haras para cavalos, 
                piscina e grandes parques para recreação dos animais.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div className="flex items-center justify-center order-2 md:order-1">
            <img 
              src="/lovable-uploads/20b34c6a-7471-4560-828a-56d8c7b2cf60.png" 
              alt="Hanri Soares - Presidente da ONG" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-paraiso-blue mb-6">Nossa Presidente - Hanri Soares</h2>
            <p className="text-gray-700 mb-4">
              Hanri Soares é jornalista com especialização em Marketing, MKT de Serviços e Mídias Sociais. 
              Empreendedora, sempre usou sua formação acadêmica para a gestão e realização de 
              diversos projetos sociais.
            </p>
            <p className="text-gray-700 mb-4">
              Se dedica quase que integralmente como diretora de marketing e presidente/fundadora da 
              ONG Paraíso dos Focinhos. Apresenta e produz o programa da ONG "Em Movimento", 
              que fala sobre a causa animal e o meio ambiente, além de outros projetos filantrópicos.
            </p>
            <p className="text-gray-700 mb-4">
              Estando à frente da ONG como presidente, já lançou um castramóvel, um programa de TV, 
              construiu três abrigos, passou a resgatar cavalos e um porquinho, além de gatos e cães. 
              Hoje o Paraíso dos Focinhos pode ser considerada a maior ONG de proteção de animais 
              de rua do estado do Rio de Janeiro.
            </p>
          </div>
        </div>

        <div className="bg-paraiso-yellow rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-paraiso-blue mb-6 text-center">Entre em Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-paraiso-blue" />
                  <span>(21) 97609-0612</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-paraiso-blue" />
                  <span>contato@paraisodosfocinhos.com.br</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-paraiso-blue" />
                  <span>Rio de Janeiro, RJ</span>
                </li>
              </ul>
              <div className="mt-6">
                <h4 className="font-bold mb-2">Redes Sociais</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/ongparaisodosfocinhos/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-paraiso-blue hover:text-blue-800 transition-colors"
                  >
                    <Facebook />
                  </a>
                  <a 
                    href="https://www.instagram.com/ongparaisodosfocinhos/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-paraiso-blue hover:text-blue-800 transition-colors"
                  >
                    <Instagram />
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-center">Faça Parte da Nossa Missão</h3>
              <div className="space-y-4">
                <Link to="/animals">
                  <Button className="w-full bg-paraiso-blue">Quero Adotar</Button>
                </Link>
                <Link to="/report">
                  <Button className="w-full bg-paraiso-blue">Encontrei um Animal</Button>
                </Link>
                <Link to="/volunteer">
                  <Button className="w-full bg-paraiso-blue">Quero Ser Voluntário</Button>
                </Link>
                <Button 
                  className="w-full bg-paraiso-blue"
                  onClick={scrollToDonation}
                >
                  Fazer uma Doação
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
