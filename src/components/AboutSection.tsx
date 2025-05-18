
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-paraiso-blue mb-2">Sobre o Paraíso dos Focinhos</h2>
          <p className="text-gray-600">Uma ONG comprometida com o resgate e cuidado de animais desde 2011</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/20b34c6a-7471-4560-828a-56d8c7b2cf60.png" 
              alt="Hanri Soares com animal resgatado" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
            <p className="mb-4 text-gray-700">
              O Paraíso dos Focinhos é uma organização sem fins lucrativos, localizada no Rio de Janeiro,
              criada em 2011 para resgatar, proteger, tratar e cuidar dos animais de rua até que eles 
              consigam tutores que os adotem.
            </p>
            <p className="mb-4 text-gray-700">
              Atualmente abrigamos mais de 500 animais, entre cães, gatos, cavalos e até mesmo um porco.
              Nossa associação possui três sítios, cada um com aproximadamente 7 mil m².
            </p>
            <p className="mb-6 text-gray-700">
              Nos dedicamos a proporcionar o melhor ambiente possível com espaços amplos, 
              cuidados médicos e muito amor para todos os animais.
            </p>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">Nossa estrutura inclui:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Quatro gatis espaçosos</li>
                <li>120 baias amplas com até 50 m²</li>
                <li>Ventiladores em todas as áreas</li>
                <li>3 enfermarias e um centro médico</li>
                <li>Piscina e grandes parques para recreação</li>
                <li>Um haras para os cavalos resgatados</li>
              </ul>
            </div>
            
            <Button asChild className="bg-paraiso-blue hover:bg-blue-800">
              <Link to="/about">Saiba Mais Sobre Nós</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
