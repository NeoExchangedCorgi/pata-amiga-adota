
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdoptionForm from '@/components/AdoptionForm';
import type { Animal } from '@/data/animals';

// Helper para converter JSONB para string[]
const parsePhotos = (photos: any): string[] => {
  if (Array.isArray(photos)) {
    return photos.map(photo => String(photo));
  }
  return [];
};

const AnimalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      if (!id) return;

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
        
        if (data) {
          // Converter fotos do formato JSONB para string[]
          const animalWithParsedPhotos: Animal = {
            ...data,
            photos: parsePhotos(data.photos)
          };
          
          setAnimal(animalWithParsedPhotos);
        } else {
          toast({
            title: "Animal não encontrado",
            description: "Não foi possível encontrar as informações deste animal.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do animal:', error);
        toast({
          title: "Erro",
          description: "Ocorreu um problema ao carregar os detalhes do animal.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [id, toast]);

  const handleNextPhoto = () => {
    if (animal && currentPhotoIndex < animal.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleAdoptionFormSuccess = () => {
    setShowAdoptionForm(false);
    setActiveTab("details");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-paraiso-blue"></div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Animal não encontrado</h1>
            <p className="text-gray-600 mb-8">
              Não foi possível encontrar o animal solicitado. Ele pode ter sido adotado ou removido.
            </p>
            <Button asChild className="bg-paraiso-blue hover:bg-blue-800">
              <Link to="/animals">Ver outros animais</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível para adoção';
      case 'pending':
        return 'Em processo de adoção';
      case 'adopted':
        return 'Adotado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'adopted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
            {animal.photos && animal.photos.length > 0 ? (
              <img
                src={animal.photos[currentPhotoIndex]}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Sem foto disponível</p>
              </div>
            )}
            
            {animal.photos && animal.photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                  disabled={currentPhotoIndex === 0}
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                  disabled={currentPhotoIndex === animal.photos.length - 1}
                >
                  &gt;
                </button>
                
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {animal.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentPhotoIndex ? 'bg-paraiso-blue' : 'bg-white/60'
                      }`}
                    ></button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {animal.photos && animal.photos.length > 1 && (
            <div className="grid grid-cols-6 gap-2 mt-2">
              {animal.photos.map((photo, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`cursor-pointer rounded overflow-hidden ${
                    index === currentPhotoIndex ? 'ring-2 ring-paraiso-blue' : ''
                  }`}
                >
                  <img src={photo} alt={`${animal.name} - foto ${index + 1}`} className="w-full h-16 object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-paraiso-blue">{animal.name}</h1>
            <Badge className={getStatusColor(animal.status)}>
              {getStatusText(animal.status)}
            </Badge>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="adopt">Adoção</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Espécie</h3>
                      <p className="text-gray-900">{animal.species === 'dog' ? 'Cachorro' : animal.species === 'cat' ? 'Gato' : animal.species === 'horse' ? 'Cavalo' : animal.species}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Sexo</h3>
                      <p className="text-gray-900">{animal.sex === 'male' ? 'Macho' : 'Fêmea'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Idade</h3>
                      <p className="text-gray-900">{animal.age}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Porte</h3>
                      <p className="text-gray-900">
                        {animal.size === 'small' ? 'Pequeno' : 
                         animal.size === 'medium' ? 'Médio' : 
                         animal.size === 'large' ? 'Grande' : animal.size}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Localização</h3>
                      <p className="text-gray-900">{animal.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Descrição</h3>
                    <p className="text-gray-900 whitespace-pre-line">{animal.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="adopt">
              <Card>
                <CardContent className="p-6">
                  {animal.status === 'available' ? (
                    showAdoptionForm ? (
                      <AdoptionForm 
                        animalId={animal.id} 
                        animalName={animal.name}
                        onSuccess={handleAdoptionFormSuccess}
                      />
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-900">Quer adotar {animal.name}?</h3>
                        <p className="text-gray-600">
                          Para iniciar o processo de adoção, preencha o formulário de interesse. 
                          Nossa equipe entrará em contato para agendar uma visita e dar continuidade ao processo.
                        </p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">O processo de adoção inclui:</h4>
                          <ul className="list-disc pl-5 text-gray-600 text-sm">
                            <li>Preenchimento do formulário de interesse</li>
                            <li>Entrevista com nossa equipe</li>
                            <li>Visita ao abrigo para conhecer o animal</li>
                            <li>Assinatura do termo de adoção responsável</li>
                          </ul>
                        </div>
                        <Button 
                          className="w-full bg-paraiso-blue hover:bg-blue-800"
                          onClick={() => setShowAdoptionForm(true)}
                        >
                          Quero adotar {animal.name}
                        </Button>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-6">
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        {animal.status === 'adopted' ? 
                          `${animal.name} já foi adotado!` : 
                          `${animal.name} está em processo de adoção`}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {animal.status === 'adopted' ? 
                          'Este animal já encontrou um lar amoroso.' : 
                          'Este animal está em processo de adoção no momento.'}
                      </p>
                      <Button asChild className="bg-paraiso-blue hover:bg-blue-800">
                        <Link to="/animals">Ver outros animais disponíveis</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-between">
            <Button 
              variant="outline" 
              asChild
            >
              <Link to="/animals">Voltar para lista</Link>
            </Button>
            
            {animal.status === 'available' && !showAdoptionForm && activeTab !== 'adopt' && (
              <Button 
                className="bg-paraiso-blue hover:bg-blue-800"
                onClick={() => {
                  setActiveTab('adopt');
                  setShowAdoptionForm(true);
                }}
              >
                Quero adotar {animal.name}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
