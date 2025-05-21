
import { useState } from 'react';
import { animals } from '@/data/animals';
import AnimalCard from '@/components/AnimalCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AnimalCatalog = () => {
  const [filters, setFilters] = useState({
    species: '',
    sex: '',
    age: '',
    status: '',
    search: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

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
              <Input
                id="search"
                placeholder="Nome ou descrição"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
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
                  <SelectItem value="all">Todas</SelectItem>
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
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="male">Macho</SelectItem>
                  <SelectItem value="female">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
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
                className="text-paraiso-blue hover:text-blue-800 hover:underline dark:bg-black dark:text-yellow-400 dark:hover:text-yellow-300 px-3 py-2 rounded"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>

        {filteredAnimals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-600">Nenhum animal encontrado com os critérios selecionados.</p>
            <p className="text-gray-500 mt-2">Tente ajustar seus filtros.</p>
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
