
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { uploadPhoto } from '@/services/storage-service';

type FormData = {
  animalName: string;
  species: string;
  sex: string;
  age: string;
  size: string;
  location: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  canKeepTemporarily: string;
  photos: FileList | null;
};

const initialFormData: FormData = {
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
};

export function useReportAnimalForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
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
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, photos: e.target.files }));
      
      // Criar URLs para pré-visualização das imagens
      const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Iniciando envio do formulário de animal');
    
    if (!formData.species || !formData.location || !formData.description || 
        !formData.contactName || !formData.contactPhone || !formData.contactEmail) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      let photoUrls: string[] = [];
      
      // Upload photos if they exist
      if (formData.photos && formData.photos.length > 0) {
        const timestamp = new Date().getTime();
        
        for (let i = 0; i < formData.photos.length; i++) {
          const photo = formData.photos[i];
          const fileExt = photo.name.split('.').pop();
          const fileName = `${timestamp}-${i}.${fileExt}`;
          const filePath = `animal-reports/${fileName}`;
          
          try {
            console.log('Tentando fazer upload da foto:', filePath);
            // Usar a função uploadPhoto do storage-service
            const photoUrl = await uploadPhoto(photo, filePath);
            if (photoUrl) {
              photoUrls.push(photoUrl);
              console.log('Upload bem-sucedido:', photoUrl);
            }
          } catch (uploadError) {
            console.error('Erro ao fazer upload da foto:', uploadError);
          }
        }
      }
      
      // Preparando dados para enviar ao Supabase
      const reportData = {
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
        contact_email: formData.contactEmail,
        photos: photoUrls,
        status: 'pending'
      };
      
      console.log('Enviando dados para Supabase (animal_reports):', reportData);
      
      // Save data to Supabase na tabela animal_reports
      const { data, error } = await supabase
        .from('animal_reports')
        .insert([reportData]);
      
      if (error) {
        console.error('Erro detalhado ao inserir dados:', error);
        throw error;
      }
      
      console.log('Dados inseridos com sucesso:', data);
      
      toast({
        title: "Relato enviado com sucesso!",
        description: "Agradecemos por relatar este animal. Nossa equipe analisará as informações.",
      });
      
      // Reset form
      setFormData(initialFormData);
      setPreviewUrls([]);
      
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

  return {
    formData,
    isSubmitting,
    previewUrls,
    handleInputChange,
    handleSelectChange,
    handleRadioChange,
    handleFileChange,
    handleSubmit
  };
}
