
import { supabase } from '@/integrations/supabase/client';

export const createBucketIfNotExists = async () => {
  try {
    // Verificar se o bucket já existe
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Erro ao listar buckets:', bucketsError);
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === 'animal-photos');
    
    if (!bucketExists) {
      // Criar o bucket se não existir
      try {
        const { data, error } = await supabase.storage.createBucket('animal-photos', {
          public: true // Bucket público para facilitar o acesso às imagens
        });
        
        if (error) {
          console.error('Erro ao criar bucket:', error);
          return false;
        }
        
        console.log('Bucket criado com sucesso:', data);
      } catch (err) {
        console.error('Erro ao criar bucket:', err);
      }
    } else {
      console.log('Bucket já existe, não é necessário criar');
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
    console.log('Iniciando upload da foto:', path);
    
    // Fazer upload do arquivo para o bucket existente
    const { error: uploadError } = await supabase.storage
      .from('animal-photos')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (uploadError) {
      console.error('Erro ao fazer upload da foto:', uploadError);
      return null;
    }
    
    // Obter URL pública
    const { data } = supabase.storage
      .from('animal-photos')
      .getPublicUrl(path);
      
    console.log('Upload concluído com sucesso:', data?.publicUrl);
    return data?.publicUrl || null;
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    return null;
  }
};
