
import AnimalCard from '@/components/AnimalCard';
import { Animal } from '@/types/database.types';

interface AnimalGridProps {
  animals: Animal[];
  loading: boolean;
}

export const AnimalGrid = ({ animals, loading }: AnimalGridProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-paraiso-blue"></div>
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-lg text-gray-600">Nenhum animal encontrado com os critérios selecionados.</p>
        <p className="text-gray-500 mt-2">Tente ajustar seus filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {animals.map(animal => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
};
