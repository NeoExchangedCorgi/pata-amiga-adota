
import { supabase } from '@/integrations/supabase/client';
import { Animal } from '@/types/database.types';
import { toast } from '@/hooks/use-toast';

// Helper to convert JSONB to string[]
export const parsePhotos = (photos: any): string[] => {
  if (Array.isArray(photos)) {
    return photos.map(photo => String(photo));
  }
  return [];
};

interface AnimalFilters {
  species: string;
  sex: string;
  status: string;
  search: string;
}

export const fetchAnimals = async (filters: AnimalFilters): Promise<Animal[]> => {
  try {
    let query = supabase
      .from('animals')
      .select('*')
      .eq('status', 'available');

    if (filters.species && filters.species !== 'all') {
      query = query.eq('species', filters.species);
    }
    
    if (filters.sex && filters.sex !== 'all') {
      query = query.eq('sex', filters.sex);
    }
    
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Filter by text search (client-side)
    let filteredData = data;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = data.filter(animal => 
        animal.name.toLowerCase().includes(searchLower) || 
        animal.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Transform data to expected format
    return filteredData.map(animal => ({
      ...animal,
      photos: parsePhotos(animal.photos)
    }));
  } catch (error) {
    console.error('Error fetching animals:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível carregar os animais.',
      variant: 'destructive'
    });
    return [];
  }
};
