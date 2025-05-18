
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { animals } from '@/data/animals';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Heart, ArrowLeft, MapPin, Mail, Phone } from 'lucide-react';

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Find the animal by ID
  const animal = animals.find(a => a.id === id);

  // If animal not found, redirect to catalog
  if (!animal) {
    navigate('/animals');
    return null;
  }

  // Status Badge color
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Interesse registrado!",
      description: "Logo entraremos em contato com você.",
    });
    setIsDialogOpen(false);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex + 1) % animal.photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex - 1 + animal.photos.length) % animal.photos.length);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/animals" className="flex items-center text-paraiso-blue hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Catálogo
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Photo Gallery */}
            <div className="md:w-1/2 relative bg-gray-200">
              <img 
                src={animal.photos[currentPhotoIndex]} 
                alt={animal.name} 
                className="w-full h-full object-cover md:h-[500px]"
              />
              {animal.photos.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevPhoto}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-70 hover:opacity-100"
                  >
                    ❮
                  </button>
                  <button 
                    onClick={handleNextPhoto}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-70 hover:opacity-100"
                  >
                    ❯
                  </button>
                </>
              )}

              {/* Thumbnail navigation */}
              {animal.photos.length > 1 && (
                <div className="flex justify-center space-x-2 p-2 bg-white">
                  {animal.photos.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`h-2 w-2 rounded-full ${index === currentPhotoIndex ? 'bg-paraiso-blue' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-paraiso-blue">{animal.name}</h1>
                <Badge className={`${getStatusColor(animal.status)}`}>
                  {getStatusText(animal.status)}
                </Badge>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{animal.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{animal.sex === 'male' ? 'Macho' : 'Fêmea'}</Badge>
                  <Badge variant="outline">{animal.age}</Badge>
                  <Badge variant="outline">
                    {animal.species === 'dog' ? 'Cão' : 
                     animal.species === 'cat' ? 'Gato' : 
                     animal.species === 'horse' ? 'Cavalo' : 'Outro'}
                  </Badge>
                  <Badge variant="outline">
                    {animal.size === 'small' ? 'Pequeno' : 
                     animal.size === 'medium' ? 'Médio' : 'Grande'}
                  </Badge>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Sobre {animal.name}</h2>
                <p className="text-gray-700">{animal.description}</p>
              </div>

              <div className="space-y-4">
                {animal.status === 'available' ? (
                  <Button 
                    onClick={() => setIsDialogOpen(true)} 
                    className="w-full bg-paraiso-yellow text-paraiso-blue hover:bg-paraiso-blue hover:text-white"
                  >
                    <Heart className="mr-2 h-4 w-4" /> Quero Adotar este Animal
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Animal não disponível para adoção
                  </Button>
                )}
                
                <Card className="p-4 bg-gray-50">
                  <h3 className="font-bold mb-2">Precisa de mais informações?</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-paraiso-blue" />
                      <span>(21) 97609-0612</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-paraiso-blue" />
                      <span>contato@paraisodosfocinhos.com.br</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interest Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Interesse em adotar {animal.name}</DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo e entraremos em contato para dar continuidade ao processo de adoção.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleFormChange} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleFormChange} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleFormChange} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Por que você quer adotar este animal?</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleFormChange} 
                    rows={4} 
                    required 
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" className="bg-paraiso-blue">Enviar interesse</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnimalDetails;
