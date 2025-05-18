
import { Link } from 'react-router-dom';
import { Animal } from '@/data/animals';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'adopted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'pending':
        return 'Em processo';
      case 'adopted':
        return 'Adotado';
      default:
        return status;
    }
  };

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'dog':
        return '🐕';
      case 'cat':
        return '🐈';
      case 'horse':
        return '🐎';
      default:
        return '🐾';
    }
  };

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={animal.photos[0]}
          alt={animal.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getStatusColor(animal.status)}`}>
            {getStatusText(animal.status)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{animal.name}</h3>
          <span title={animal.species}>{getSpeciesIcon(animal.species)}</span>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          {animal.age} • {animal.sex === 'male' ? 'Macho' : 'Fêmea'} • {animal.location}
        </div>
        <p className="line-clamp-2 text-sm text-gray-700">{animal.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Link 
          to={`/animals/${animal.id}`}
          className="text-paraiso-blue hover:underline font-medium text-sm"
        >
          Ver detalhes
        </Link>
        <Heart className="h-4 w-4 text-red-500" />
      </CardFooter>
    </Card>
  );
};

export default AnimalCard;
