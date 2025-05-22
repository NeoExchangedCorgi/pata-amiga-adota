
import { supabase } from '@/integrations/supabase/client';

type ReportAnimalData = {
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
};

export const submitAnimalReport = async (formData: ReportAnimalData) => {
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
  
  return data;
};
