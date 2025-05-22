
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Helper para converter JSONB para string[]
const parsePhotos = (photos: any): string[] => {
  if (Array.isArray(photos)) {
    return photos.map(photo => String(photo));
  }
  return [];
};

const FeaturedAnimals = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .eq('status', 'available')
          .limit(4);

        if (error) {
          throw error;
        }

        // Transformar os dados para o formato esperado pelo AnimalCard
        const formattedAnimals = data.map(animal => ({
          ...animal,
          photos: parsePhotos(animal.photos)
        }));

        setFeaturedAnimals(formattedAnimals);
      } catch (error) {
        console.error('Erro ao carregar animais:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os animais disponíveis.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <section className="bg-paraiso-lightblue py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-paraiso-blue mb-2">Animais Disponíveis para Adoção</h2>
          <p className="text-gray-600">Conheça alguns dos nossos amiguinhos que estão à procura de um lar</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-paraiso-blue"></div>
          </div>
        ) : featuredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Não há animais disponíveis para adoção no momento.</p>
          </div>
        )}
        
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
