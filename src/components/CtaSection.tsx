
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  const scrollToDonation = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById('doar');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-paraiso-yellow dark:bg-black py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-paraiso-blue dark:text-white mb-6">Como Você Pode Ajudar?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-black border border-transparent dark:border-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-paraiso-blue dark:text-white mb-2">Adotando</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Dê um lar amoroso e responsável para um de nossos animais resgatados.
            </p>
            <Button asChild className="bg-paraiso-blue hover:bg-blue-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              <Link to="/animals">Quero Adotar</Link>
            </Button>
          </div>
          
          <div className="bg-white dark:bg-black border border-transparent dark:border-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-5xl mb-4">👋</div>
            <h3 className="text-xl font-bold text-paraiso-blue dark:text-white mb-2">Voluntariando</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Doe seu tempo e carinho ajudando nos cuidados diários dos animais.
            </p>
            <Button asChild className="bg-paraiso-blue hover:bg-blue-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              <Link to="/volunteer">Seja Voluntário</Link>
            </Button>
          </div>
          
          <div className="bg-white dark:bg-black border border-transparent dark:border-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-paraiso-blue dark:text-white mb-2">Doando</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Contribua financeiramente para mantermos nosso trabalho de resgate e cuidados.
            </p>
            <Button 
              className="bg-paraiso-blue hover:bg-blue-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={scrollToDonation}
            >
              Fazer Doação
            </Button>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white dark:bg-black border border-transparent dark:border-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-paraiso-blue dark:text-white mb-3">Faça uma doação via PIX</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Sua doação ajuda a manter nossos abrigos, alimentação, tratamentos veterinários e resgates.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 md:mb-0">
              <p className="font-medium dark:text-white">Chave PIX: 21976090612</p>
            </div>
            <div className="bg-white dark:bg-white p-2 rounded-lg inline-block">
              <img 
                src="/lovable-uploads/f7ba79c2-fa0c-43d8-ab7c-5d8342ed0ecc.png" 
                alt="QR Code PIX" 
                className="w-32 h-32"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Paraíso dos Focinhos é uma organização sem fins lucrativos. Sua doação pode fazer toda a diferença.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
