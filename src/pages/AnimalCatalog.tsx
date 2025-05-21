
import { useState, useEffect } from 'react';
import AnimalCard from '@/components/AnimalCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

const AnimalCatalog = () => {
  const [filters, setFilters] = useState({
    species: '',
    sex: '',
    age: '',
    status: '',
    search: ''
  });
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('animals')
          .select('*');

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        // Convert JSONB photos to string array
        const formattedData = data.map(animal => ({
          ...animal,
          photos: Array.isArray(animal.photos) ? animal.photos : [animal.photos]
        }));

        setAnimals(formattedData);
      } catch (error) {
        console.error('Error fetching animals:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os animais",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [toast]);

  const filteredAnimals = animals.filter(animal => {
    return (
      (filters.species === '' || animal.species === filters.species) &&
      (filters.sex === '' || animal.sex === filters.sex) &&
      (filters.status === '' || animal.status === filters.status) &&
      (filters.search === '' || 
        animal.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        animal.description.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-paraiso-blue dark:text-paraiso-yellow mb-2">Adote um Animal</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Encontre seu novo companheiro e dê a ele um lar amoroso
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search" className="dark:text-white">Buscar</Label>
              <Input
                id="search"
                placeholder="Nome ou descrição"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="species" className="dark:text-white">Espécie</Label>
              <Select
                value={filters.species}
                onValueChange={(value) => handleFilterChange('species', value)}
              >
                <SelectTrigger id="species" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800">
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="dog">Cães</SelectItem>
                  <SelectItem value="cat">Gatos</SelectItem>
                  <SelectItem value="horse">Cavalos</SelectItem>
                  <SelectItem value="other">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sex" className="dark:text-white">Sexo</Label>
              <Select
                value={filters.sex}
                onValueChange={(value) => handleFilterChange('sex', value)}
              >
                <SelectTrigger id="sex" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800">
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="male">Macho</SelectItem>
                  <SelectItem value="female">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status" className="dark:text-white">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger id="status" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800">
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="available">Disponível</SelectItem>
                  <SelectItem value="pending">Em processo</SelectItem>
                  <SelectItem value="adopted">Adotado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({
                  species: '',
                  sex: '',
                  age: '',
                  status: '',
                  search: ''
                })}
                className="text-paraiso-blue hover:text-blue-800 hover:underline dark:text-paraiso-yellow dark:hover:text-yellow-300 px-3 py-2 rounded"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-300">Carregando animais...</p>
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-lg text-gray-600 dark:text-gray-300">Nenhum animal encontrado com os critérios selecionados.</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Tente ajustar seus filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalCatalog;
