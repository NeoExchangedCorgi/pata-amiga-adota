
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitAnimalReport } from '@/services/reportAnimalService';

export const useReportAnimalForm = () => {
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
    photos: null as FileList | null
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
  
  const resetForm = () => {
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
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      await submitAnimalReport(formData);
      
      toast({
        title: "Relato enviado com sucesso!",
        description: "Agradecemos por relatar este animal. Nossa equipe analisará as informações.",
      });
      
      resetForm();
      
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
};
