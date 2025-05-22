
import { useState, useEffect } from 'react';
import { Animal } from '@/types/database.types';
import { fetchAnimals } from '@/services/animal-service';

interface FilterValues {
  species: string;
  sex: string;
  status: string;
  search: string;
}

export const useAnimalCatalog = () => {
  const [filters, setFilters] = useState<FilterValues>({
    species: '',
    sex: '',
    status: '',
    search: ''
  });
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAnimals = async () => {
    setLoading(true);
    const data = await fetchAnimals(filters);
    setAnimals(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAnimals();
  }, [filters.species, filters.sex]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const handleSearch = () => {
    loadAnimals();
  };

  const resetFilters = () => {
    setFilters({
      species: '',
      sex: '',
      status: '',
      search: ''
    });
  };

  return {
    filters,
    animals,
    loading,
    handleFilterChange,
    handleSearch,
    resetFilters
  };
};
