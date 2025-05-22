
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ReportAnimal = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    animalName: '',
    species: '',
    sex: '',
    age: '',
    size: '',
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    canKeepTemporarily: 'no',
    photos: null
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, canKeepTemporarily: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, photos: e.target.files }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Salvar os dados no Supabase
      const { data, error } = await supabase
        .from('animal_reports')
        .insert([
          {
            animal_name: formData.animalName,
            species: formData.species,
            sex: formData.sex,
            age: formData.age,
            size: formData.size,
            location: formData.location,
            description: formData.description,
            can_keep_temporarily: formData.canKeepTemporarily,
            contact_name: formData.contactName,
            contact_phone: formData.contactPhone,
            contact_email: formData.contactEmail
          }
        ]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Relato enviado com sucesso!",
        description: "Agradecemos por relatar este animal. Nossa equipe analisará as informações.",
      });
      
      // Reset form
      setFormData({
        animalName: '',
        species: '',
        sex: '',
        age: '',
        size: '',
        location: '',
        description: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        canKeepTemporarily: 'no',
        photos: null
      });
      
      // Reset file input
      const fileInput = document.getElementById('photos') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
    } catch (error) {
      console.error('Erro ao enviar relato:', error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar relato",
        description: "Ocorreu um erro ao enviar seu relato. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-paraiso-lightblue py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-paraiso-blue mb-4">Encontrei um Animal</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Ajude-nos a resgatar e cuidar de um animal que você encontrou.
            Preencha o formulário com o máximo de informações possíveis.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-paraiso-blue">Formulário de Relato</CardTitle>
              <CardDescription>
                Informe os detalhes sobre o animal encontrado para ajudarmos no resgate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Informações sobre o animal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="animalName">Nome (se souber)</Label>
                      <Input 
                        id="animalName" 
                        name="animalName" 
                        placeholder="Opcional"
                        value={formData.animalName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="species">Espécie</Label>
                      <Select 
                        value={formData.species} 
                        onValueChange={(value) => handleSelectChange('species', value)}
                        required
                      >
                        <SelectTrigger id="species">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">Cão</SelectItem>
                          <SelectItem value="cat">Gato</SelectItem>
                          <SelectItem value="horse">Cavalo</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="sex">Sexo</Label>
                      <Select 
                        value={formData.sex} 
                        onValueChange={(value) => handleSelectChange('sex', value)}
                        required
                      >
                        <SelectTrigger id="sex">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Macho</SelectItem>
                          <SelectItem value="female">Fêmea</SelectItem>
                          <SelectItem value="unknown">Não sei</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="age">Idade aproximada</Label>
                      <Select 
                        value={formData.age} 
                        onValueChange={(value) => handleSelectChange('age', value)}
                        required
                      >
                        <SelectTrigger id="age">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="filhote">Filhote</SelectItem>
                          <SelectItem value="jovem">Jovem</SelectItem>
                          <SelectItem value="adulto">Adulto</SelectItem>
                          <SelectItem value="idoso">Idoso</SelectItem>
                          <SelectItem value="unknown">Não sei</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="size">Porte</Label>
                      <Select 
                        value={formData.size} 
                        onValueChange={(value) => handleSelectChange('size', value)}
                        required
                      >
                        <SelectTrigger id="size">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Pequeno</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                          <SelectItem value="unknown">Não sei</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                
                  <div className="mt-4">
                    <Label htmlFor="location">Local onde o animal foi encontrado</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      placeholder="Endereço ou referência"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="description">Descrição do animal e situação</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      placeholder="Descreva o animal e a situação em que foi encontrado"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="photos">Fotos do animal</Label>
                    <Input 
                      id="photos" 
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Fotos ajudam muito na identificação e avaliação do estado do animal.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Suas informações de contato</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Nome</Label>
                      <Input 
                        id="contactName" 
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Telefone</Label>
                      <Input 
                        id="contactPhone" 
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="contactEmail">E-mail</Label>
                    <Input 
                      id="contactEmail" 
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mt-6">
                    <Label>Você consegue manter o animal temporariamente?</Label>
                    <RadioGroup 
                      value={formData.canKeepTemporarily} 
                      onValueChange={handleRadioChange}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maybe" id="maybe" />
                        <Label htmlFor="maybe">Talvez, depende do tempo</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-paraiso-blue hover:bg-blue-800"
              >
                Enviar Relato
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-paraiso-blue mb-4">O que acontece depois?</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Nossa equipe receberá seu relato e analisará as informações</li>
              <li>Entraremos em contato para mais detalhes, se necessário</li>
              <li>Organizaremos o resgate do animal conforme nossas possibilidades e urgência do caso</li>
              <li>O animal passará por avaliação veterinária e receberá os cuidados necessários</li>
              <li>Quando estiver recuperado, será disponibilizado para adoção</li>
            </ol>
            <p className="mt-4 text-gray-700">
              <strong>Atenção:</strong> Nossa capacidade de resgate é limitada pelo espaço disponível e recursos. 
              Atenderemos os casos conforme ordem de urgência e disponibilidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnimal;
