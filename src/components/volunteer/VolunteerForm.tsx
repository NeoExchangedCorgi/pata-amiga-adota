
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
import { supabase } from '@/integrations/supabase/client';

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  availability: string;
  experience: string;
  reason: string;
  agreeTerms: boolean;
}

export function VolunteerForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<VolunteerFormData>({
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        variant: "destructive",
        title: "Termos e condições",
        description: "Você precisa concordar com os termos para continuar.",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Salvar os dados no Supabase
      const { data, error } = await supabase
        .from('volunteer_applications')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            age: formData.age,
            availability: formData.availability,
            experience: formData.experience,
            reason: formData.reason
          }
        ]);
      
      if (error) {
        throw error;
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
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar formulário",
        description: "Ocorreu um erro ao enviar seu formulário. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
