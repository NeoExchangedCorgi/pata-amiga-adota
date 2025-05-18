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
  CardTitle 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Volunteer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    availability: '',
    experience: '',
    reason: '',
    agreeTerms: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeTerms: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        variant: "destructive",
        title: "Termos e condições",
        description: "Você precisa concordar com os termos para continuar.",
      });
      return;
    }
    
    toast({
      title: "Formulário enviado!",
      description: "Agradecemos seu interesse em ser voluntário. Entraremos em contato em breve.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      availability: '',
      experience: '',
      reason: '',
      agreeTerms: false
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-paraiso-lightyellow py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-paraiso-blue mb-4">Seja Voluntário</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Ajude-nos a cuidar dos nossos animais resgatados e faça a diferença na vida deles.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-paraiso-blue mb-6">Por que ser voluntário?</h2>
            <p className="text-gray-700 mb-6">
              O trabalho voluntário no Paraíso dos Focinhos é uma oportunidade incrível para 
              ajudar animais resgatados e contribuir com uma causa nobre. Como voluntário, você 
              poderá fazer a diferença na vida de centenas de animais que foram abandonados 
              ou sofreram maus-tratos.
            </p>
            
            <h3 className="text-xl font-bold mb-4">O que nossos voluntários fazem:</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700">
              <li>Auxiliam nos cuidados diários dos animais</li>
              <li>Ajudam na alimentação e higienização dos espaços</li>
              <li>Dão carinho e atenção aos animais resgatados</li>
              <li>Auxiliam em eventos de adoção</li>
              <li>Contribuem com habilidades específicas (fotografia, redes sociais, etc)</li>
              <li>Participam de resgates (voluntários experientes)</li>
            </ul>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-paraiso-lightblue">
                  <CardTitle>Requisitos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Ter pelo menos 18 anos</li>
                    <li>Comprometer-se com os horários acordados</li>
                    <li>Ter amor e respeito pelos animais</li>
                    <li>Seguir as orientações da equipe</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-paraiso-lightblue">
                  <CardTitle>Dias e Horários</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-4 text-gray-700">
                    Temos disponibilidade para voluntários nos seguintes dias e horários:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><strong>Terças e Quintas:</strong> 9h às 16h</li>
                    <li><strong>Sábados e Domingos:</strong> 8h às 17h</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-paraiso-blue">Formulário de Inscrição</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo para se candidatar como voluntário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Idade</Label>
                      <Input 
                        id="age" 
                        name="age"
                        type="number"
                        min="18"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="availability">Disponibilidade</Label>
                      <Select 
                        value={formData.availability} 
                        onValueChange={(value) => handleSelectChange('availability', value)}
                        required
                      >
                        <SelectTrigger id="availability">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="terças_e_quintas">Terças e Quintas</SelectItem>
                          <SelectItem value="sabados">Sábados</SelectItem>
                          <SelectItem value="domingos">Domingos</SelectItem>
                          <SelectItem value="flexivel">Flexível</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">Experiência com animais</Label>
                    <Select 
                      value={formData.experience} 
                      onValueChange={(value) => handleSelectChange('experience', value)}
                      required
                    >
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nenhuma">Nenhuma experiência</SelectItem>
                        <SelectItem value="pouca">Pouca experiência</SelectItem>
                        <SelectItem value="moderada">Experiência moderada</SelectItem>
                        <SelectItem value="muita">Muita experiência</SelectItem>
                        <SelectItem value="profissional">Profissional da área</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="reason">Por que você quer ser voluntário no Paraíso dos Focinhos?</Label>
                    <Textarea 
                      id="reason" 
                      name="reason"
                      rows={4}
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="agreeTerms" 
                      checked={formData.agreeTerms} 
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm">
                      Concordo em seguir as regras e orientações da ONG e me comprometer com os horários acordados.
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-paraiso-blue hover:bg-blue-800"
                  >
                    Enviar Inscrição
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
