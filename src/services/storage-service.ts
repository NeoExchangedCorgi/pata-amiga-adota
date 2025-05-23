
import { supabase } from '@/integrations/supabase/client';

export const createBucketIfNotExists = async () => {
  try {
    // Verificar se o bucket já existe
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === 'animal-photos');
    
    if (!bucketExists) {
      // Criar o bucket se não existir
      const { data, error } = await supabase.storage.createBucket('animal-photos', {
        public: true // Bucket público para facilitar o acesso às imagens
      });
      
      if (error) {
        console.error('Erro ao criar bucket:', error);
        return false;
      }
      
      console.log('Bucket criado com sucesso:', data);
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao verificar/criar bucket:', error);
    return false;
  }
};

// Função para fazer upload de uma foto
export const uploadPhoto = async (file: File, path: string): Promise<string | null> => {
  try {
    const { error } = await supabase.storage
      .from('animal-photos')
      .upload(path, file);
      
    if (error) {
      console.error('Erro ao fazer upload da foto:', error);
      return null;
    }
    
    // Obter URL pública
    const { data } = supabase.storage
      .from('animal-photos')
      .getPublicUrl(path);
      
    return data?.publicUrl || null;
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    return null;
  }
};
