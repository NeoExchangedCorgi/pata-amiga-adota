
import { useState, useEffect } from 'react';
import AnimalCard from '@/components/AnimalCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Helper para converter JSONB para string[]
const parsePhotos = (photos: any): string[] => {
  if (Array.isArray(photos)) {
    return photos.map(photo => String(photo));
  }
  return [];
};

const AnimalCatalog = () => {
  const [filters, setFilters] = useState({
    species: '',
    sex: '',
    status: '',
    search: ''
  });
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar animais com base nos filtros
  const fetchAnimals = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('animals')
        .select('*')
        .eq('status', 'available');

      if (filters.species && filters.species !== 'all') {
        query = query.eq('species', filters.species);
      }
      
      if (filters.sex && filters.sex !== 'all') {
        query = query.eq('sex', filters.sex);
      }
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Filtrar por busca de texto (client-side)
      let filteredData = data;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredData = data.filter(animal => 
          animal.name.toLowerCase().includes(searchLower) || 
          animal.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Transformar os dados para o formato esperado pelo AnimalCard
      const formattedAnimals = filteredData.map(animal => ({
        ...animal,
        photos: parsePhotos(animal.photos)
      }));

      setAnimals(formattedAnimals);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os animais.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Carregar animais quando a página é carregada ou os filtros mudam
  useEffect(() => {
    fetchAnimals();
  }, [filters.species, filters.sex]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
    
    // Para a busca por texto, não queremos refazer a consulta a cada digitação
    if (key !== 'search') {
      fetchAnimals();
    }
  };

  const handleSearch = () => {
    fetchAnimals();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-paraiso-blue mb-2">Adote um Animal</h1>
          <p className="text-gray-600 mb-8">
            Encontre seu novo companheiro e dê a ele um lar amoroso
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Buscar</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Nome ou descrição"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  className="bg-paraiso-blue hover:bg-blue-800" 
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="species">Espécie</Label>
              <Select
                value={filters.species}
                onValueChange={(value) => handleFilterChange('species', value)}
              >
                <SelectTrigger id="species">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="dog">Cães</SelectItem>
                  <SelectItem value="cat">Gatos</SelectItem>
                  <SelectItem value="horse">Cavalos</SelectItem>
                  <SelectItem value="other">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sex">Sexo</Label>
              <Select
                value={filters.sex}
                onValueChange={(value) => handleFilterChange('sex', value)}
              >
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="male">Macho</SelectItem>
                  <SelectItem value="female">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({
                    species: '',
                    sex: '',
                    status: '',
                    search: ''
                  });
                  fetchAnimals();
                }}
                className="text-paraiso-blue hover:text-blue-800 hover:underline dark:bg-black dark:text-yellow-400 dark:hover:text-yellow-300 px-3 py-2 rounded"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-paraiso-blue"></div>
          </div>
        ) : animals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-600">Nenhum animal encontrado com os critérios selecionados.</p>
            <p className="text-gray-500 mt-2">Tente ajustar seus filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {animals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalCatalog;
