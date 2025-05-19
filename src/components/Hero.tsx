import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Hero = () => {
  return <div className="bg-gradient-to-b from-paraiso-lightyellow to-white dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 px-0 mx-[20px]">
            <h1 className="text-4xl md:text-5xl font-bold text-paraiso-blue dark:text-white mb-6 leading-tight">
              Ajude a transformar vidas através da adoção responsável
            </h1>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 text-left">
              O Paraíso dos Focinhos é uma ONG dedicada ao resgate, proteção e cuidado de animais de rua. 
              Mais de 500 animais estão esperando por um lar amoroso. Você pode fazer a diferença!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-paraiso-yellow text-paraiso-blue hover:bg-paraiso-blue hover:text-white dark:bg-white dark:text-black dark:hover:bg-gray-300 dark:hover:text-black">
                <Link to="/animals">Quero Adotar</Link>
              </Button>
              <Button asChild variant="outline" className="border-paraiso-blue text-paraiso-blue hover:bg-paraiso-blue hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                <Link to="/report">Encontrei um Animal</Link>
              </Button>
              <Button asChild variant="outline" className="border-paraiso-blue text-paraiso-blue hover:bg-paraiso-blue hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                <Link to="/volunteer">Seja Voluntário</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-float md:pl-8">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg transform rotate-3">
              <img src="https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D" alt="Cachorro resgatado" className="rounded-lg w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg transform -rotate-3 hidden md:block">
              <img src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGNhdHxlbnwwfHwwfHx8MA%3D%3D" alt="Gato resgatado" className="rounded-lg w-48 h-auto" />
            </div>
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg transform rotate-6 hidden md:block">
              <img src="https://images.unsplash.com/photo-1598839253678-be340c02f9c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvcnNlfGVufDB8fDB8fHww" alt="Cavalo resgatado" className="rounded-lg w-32 h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;