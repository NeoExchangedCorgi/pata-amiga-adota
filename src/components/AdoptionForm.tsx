
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdoptionFormProps {
  animalId: string;
  animalName: string;
  onSuccess?: () => void;
}

const AdoptionForm = ({ animalId, animalName, onSuccess }: AdoptionFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validação básica
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }
      
      // Salvar solicitação de adoção no Supabase
      const { data, error } = await supabase
        .from('adoption_requests')
        .insert([
          {
            animal_id: animalId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Solicitação enviada",
        description: `Sua solicitação de adoção para ${animalName} foi enviada com sucesso. Entraremos em contato em breve.`,
      });
      
      // Resetar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Chamar callback de sucesso se fornecido
      if (onSuccess) onSuccess();
      
    } catch (error: any) {
      console.error('Erro ao enviar solicitação de adoção:', error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar solicitação",
        description: error.message || "Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Label htmlFor="name">Nome completo *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Conte-nos por que você quer adotar este animal e como é sua casa..."
          rows={4}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-paraiso-blue hover:bg-blue-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar solicitação de adoção'}
      </Button>
    </form>
  );
};

export default AdoptionForm;
