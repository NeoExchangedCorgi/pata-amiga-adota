
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="bg-paraiso-yellow py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-paraiso-blue mb-6">Como Você Pode Ajudar?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-paraiso-blue mb-2">Adotando</h3>
            <p className="text-gray-700 mb-4">
              Dê um lar amoroso e responsável para um de nossos animais resgatados.
            </p>
            <Button asChild className="bg-paraiso-blue hover:bg-blue-800">
              <Link to="/animals">Quero Adotar</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-5xl mb-4">👋</div>
            <h3 className="text-xl font-bold text-paraiso-blue mb-2">Voluntariando</h3>
            <p className="text-gray-700 mb-4">
              Doe seu tempo e carinho ajudando nos cuidados diários dos animais.
            </p>
            <Button asChild className="bg-paraiso-blue hover:bg-blue-800">
              <Link to="/volunteer">Seja Voluntário</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-paraiso-blue mb-2">Doando</h3>
            <p className="text-gray-700 mb-4">
              Contribua financeiramente para mantermos nosso trabalho de resgate e cuidados.
            </p>
            <Button className="bg-paraiso-blue hover:bg-blue-800">
              Fazer Doação
            </Button>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-paraiso-blue mb-3">Faça uma doação via PIX</h3>
          <p className="mb-4 text-gray-700">
            Sua doação ajuda a manter nossos abrigos, alimentação, tratamentos veterinários e resgates.
          </p>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="font-medium">Chave PIX: 21976090612</p>
          </div>
          <p className="text-sm text-gray-600">
            Paraíso dos Focinhos é uma organização sem fins lucrativos. Sua doação pode fazer toda a diferença.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
