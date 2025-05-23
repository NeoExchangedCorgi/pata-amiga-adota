
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
      
      let photoUrls: string[] = [];
      
      // Upload photos if they exist
      if (formData.photos && formData.photos.length > 0) {
        const timestamp = new Date().getTime();
        
        for (let i = 0; i < formData.photos.length; i++) {
          const photo = formData.photos[i];
          const fileExt = photo.name.split('.').pop();
          const fileName = `${timestamp}-${i}.${fileExt}`;
          const filePath = `animal-reports/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('animal-photos')
            .upload(filePath, photo);
            
          if (uploadError) {
            console.error('Erro ao fazer upload da foto:', uploadError);
            continue;
          }
          
          // Get public URL
          const { data } = supabase.storage
            .from('animal-photos')
            .getPublicUrl(filePath);
            
          if (data && data.publicUrl) {
            photoUrls.push(data.publicUrl);
          }
        }
      }
      
      // Save data to Supabase
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
            contact_email: formData.contactEmail,
            photos: photoUrls.length > 0 ? photoUrls : null
          }
        ]);
      
      if (error) {
        console.error('Erro detalhado:', error);
        throw error;
      }
      
      toast({
        title: "Relato enviado com sucesso!",
        description: "Agradecemos por relatar este animal. Nossa equipe analisará as informações.",
      });
      
      // Reset form
      setFormData(initialFormData);
      
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
    handleInputChange,
    handleSelectChange,
    handleRadioChange,
    handleFileChange,
    handleSubmit
  };
}
