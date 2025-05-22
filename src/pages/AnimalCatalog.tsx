
import { AnimalFilters } from '@/components/animal-catalog/AnimalFilters';
import { AnimalGrid } from '@/components/animal-catalog/AnimalGrid';
import { useAnimalCatalog } from '@/hooks/useAnimalCatalog';

const AnimalCatalog = () => {
  const {
    filters,
    animals,
    loading,
    handleFilterChange,
    handleSearch,
    resetFilters
  } = useAnimalCatalog();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-paraiso-blue mb-2">Adote um Animal</h1>
          <p className="text-gray-600 mb-8">
            Encontre seu novo companheiro e dê a ele um lar amoroso
          </p>
        </div>

        <AnimalFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onResetFilters={resetFilters}
        />

        <AnimalGrid animals={animals} loading={loading} />
      </div>
    </div>
  );
};

export default AnimalCatalog;
