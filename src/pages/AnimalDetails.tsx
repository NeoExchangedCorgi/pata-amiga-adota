
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { supabase, jsonToStringArray } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          navigate('/animals');
          return;
        }

        // Convert JSONB photos to string array
        const formattedData = {
          ...data,
          photos: jsonToStringArray(data.photos)
        };

        setAnimal(formattedData);

        // If user is authenticated, pre-fill the form with their information
        if (user) {
          // Fetch user profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name, phone, email')
            .eq('id', user.id)
            .single();

          if (profileData) {
            setFormData({
              name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim(),
              email: profileData.email || user.email || '',
              phone: profileData.phone || '',
              message: ''
            });
          } else {
            setFormData({
              ...formData,
              email: user.email || '',
            });
          }
        }

      } catch (error) {
        console.error('Error fetching animal details:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes do animal",
          variant: "destructive",
        });
        navigate('/animals');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id, navigate, toast, user]);

  // If animal not found or still loading, show a loading state
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">Carregando informações...</p>
          </div>
        </div>
      </div>
    );
  }

  // If animal not found even after loading, navigate back (this is a fallback)
  if (!animal) {
    navigate('/animals');
    return null;
  }

  // Status Badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'adopted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para demonstrar interesse na adoção",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase.from('adoption_applications').insert({
        animal_id: animal.id,
        user_id: user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });

      if (error) throw error;

      // Update the animal status to pending
      await supabase
        .from('animals')
        .update({ status: 'pending' })
        .eq('id', animal.id);

      toast({
        title: "Interesse registrado!",
        description: "Logo entraremos em contato com você.",
      });
      
      setIsDialogOpen(false);
      // Refresh the animal data to show updated status
      setAnimal({
        ...animal,
        status: 'pending'
      });
      
    } catch (error) {
      console.error('Error submitting adoption application:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao registrar seu interesse. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex + 1) % animal.photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex - 1 + animal.photos.length) % animal.photos.length);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/animals" className="flex items-center text-paraiso-blue dark:text-paraiso-yellow hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Catálogo
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Photo Gallery */}
            <div className="md:w-1/2 relative bg-gray-200 dark:bg-gray-700">
              <img 
                src={animal.photos[currentPhotoIndex]} 
                alt={animal.name} 
                className="w-full h-full object-cover md:h-[500px]"
              />
              {animal.photos.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevPhoto}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full opacity-70 hover:opacity-100"
                  >
                    ❮
                  </button>
                  <button 
                    onClick={handleNextPhoto}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full opacity-70 hover:opacity-100"
                  >
                    ❯
                  </button>
                </>
              )}

              {/* Thumbnail navigation */}
              {animal.photos.length > 1 && (
                <div className="flex justify-center space-x-2 p-2 bg-white dark:bg-gray-800">
                  {animal.photos.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`h-2 w-2 rounded-full ${
                        index === currentPhotoIndex 
                          ? 'bg-paraiso-blue dark:bg-paraiso-yellow' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-paraiso-blue dark:text-paraiso-yellow">
                  {animal.name}
                </h1>
                <Badge className={`${getStatusColor(animal.status)}`}>
                  {getStatusText(animal.status)}
                </Badge>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{animal.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {animal.sex === 'male' ? 'Macho' : 'Fêmea'}
                  </Badge>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {animal.age}
                  </Badge>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {animal.species === 'dog' ? 'Cão' : 
                     animal.species === 'cat' ? 'Gato' : 
                     animal.species === 'horse' ? 'Cavalo' : 'Outro'}
                  </Badge>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {animal.size === 'small' ? 'Pequeno' : 
                     animal.size === 'medium' ? 'Médio' : 'Grande'}
                  </Badge>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Sobre {animal.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">{animal.description}</p>
              </div>

              <div className="space-y-4">
                {animal.status === 'available' ? (
                  <Button 
                    onClick={() => {
                      if (!user) {
                        toast({
                          title: "Login necessário",
                          description: "Faça login para demonstrar interesse na adoção",
                        });
                        navigate('/auth');
                        return;
                      }
                      setIsDialogOpen(true);
                    }}
                    className="w-full bg-paraiso-yellow text-paraiso-blue hover:bg-paraiso-blue hover:text-white dark:bg-paraiso-blue dark:text-white dark:hover:bg-paraiso-yellow dark:hover:text-paraiso-blue"
                  >
                    <Heart className="mr-2 h-4 w-4" /> Quero Adotar este Animal
                  </Button>
                ) : (
                  <Button disabled className="w-full dark:bg-gray-700 dark:text-gray-300">
                    Animal não disponível para adoção
                  </Button>
                )}
                
                <Card className="p-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <h3 className="font-bold mb-2 dark:text-white">Precisa de mais informações?</h3>
                  <div className="space-y-2 dark:text-gray-300">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-paraiso-blue dark:text-paraiso-yellow" />
                      <span>(21) 97609-0612</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-paraiso-blue dark:text-paraiso-yellow" />
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
        <DialogContent className="sm:max-w-[500px] dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Interesse em adotar {animal.name}</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Preencha o formulário abaixo e entraremos em contato para dar continuidade ao processo de adoção.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name" className="dark:text-white">Nome completo</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleFormChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="dark:text-white">E-mail</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleFormChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="dark:text-white">Telefone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleFormChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="dark:text-white">Por que você quer adotar este animal?</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleFormChange}
                    rows={4}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                    required 
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">Cancelar</Button>
              </DialogClose>
              <Button 
                type="submit" 
                className="bg-paraiso-blue text-white dark:bg-paraiso-blue dark:text-white dark:hover:bg-blue-600"
              >
                Enviar interesse
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnimalDetails;
