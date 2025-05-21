
import { Button } from "@/components/ui/button";
import { animals } from "@/data/animals";
import { Link } from "react-router-dom";
import AnimalCard from "./AnimalCard";

const FeaturedAnimals = () => {
  // Get only available animals and limit to 4
  const featuredAnimals = animals
    .filter(animal => animal.status === 'available')
    .slice(0, 4);

  return (
    <section className="bg-paraiso-lightblue py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-paraiso-blue mb-2">Animais Disponíveis para Adoção</h2>
          <p className="text-gray-600">Conheça alguns dos nossos amiguinhos que estão à procura de um lar</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAnimals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-paraiso-blue hover:bg-blue-800">
            <Link to="/animals">Ver Todos os Animais</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnimals;
