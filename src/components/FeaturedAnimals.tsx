
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import { supabase, jsonToStringArray } from "@/integrations/supabase/client";

interface Animal {
  id: string;
  name: string;
  species: string;
  sex: string;
  age: string;
  size: string;
  description: string;
  photos: string[];
  location: string;
  status: string;
}

const FeaturedAnimals = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .eq('status', 'available')
          .limit(4);

        if (error) {
          throw error;
        }

        // Convert JSONB photos to string array
        const formattedData = data.map(animal => ({
          ...animal,
          photos: jsonToStringArray(animal.photos)
        }));

        setFeaturedAnimals(formattedData);
      } catch (error) {
        console.error('Error fetching featured animals:', error);
        setFeaturedAnimals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <section className="bg-paraiso-lightblue dark:bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-paraiso-blue dark:text-paraiso-yellow mb-2">Animais Disponíveis para Adoção</h2>
          <p className="text-gray-600 dark:text-gray-300">Conheça alguns dos nossos amiguinhos que estão à procura de um lar</p>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">Carregando animais...</p>
          </div>
        ) : featuredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white dark:bg-gray-700 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-300">Não há animais disponíveis para adoção no momento.</p>
            <p className="text-gray-500 dark:text-gray-400">Volte em breve para novidades!</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button asChild className="bg-paraiso-blue hover:bg-blue-800 text-white dark:bg-paraiso-blue dark:text-white dark:hover:bg-blue-700">
            <Link to="/animals">Ver Todos os Animais</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnimals;
