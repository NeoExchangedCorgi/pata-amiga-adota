
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

type AnimalInfoFormProps = {
  formData: {
    animalName: string;
    species: string;
    sex: string;
    age: string;
    size: string;
    location: string;
    description: string;
    photos: FileList | null;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AnimalInfoForm = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleFileChange 
}: AnimalInfoFormProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Informações sobre o animal</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="animalName">Nome (se souber)</Label>
          <Input 
            id="animalName" 
            name="animalName" 
            placeholder="Opcional"
            value={formData.animalName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="species">Espécie</Label>
          <Select 
            value={formData.species} 
            onValueChange={(value) => handleSelectChange('species', value)}
            required
          >
            <SelectTrigger id="species">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Cão</SelectItem>
              <SelectItem value="cat">Gato</SelectItem>
              <SelectItem value="horse">Cavalo</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <Label htmlFor="sex">Sexo</Label>
          <Select 
            value={formData.sex} 
            onValueChange={(value) => handleSelectChange('sex', value)}
            required
          >
            <SelectTrigger id="sex">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Macho</SelectItem>
              <SelectItem value="female">Fêmea</SelectItem>
              <SelectItem value="unknown">Não sei</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="age">Idade aproximada</Label>
          <Select 
            value={formData.age} 
            onValueChange={(value) => handleSelectChange('age', value)}
            required
          >
            <SelectTrigger id="age">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="filhote">Filhote</SelectItem>
              <SelectItem value="jovem">Jovem</SelectItem>
              <SelectItem value="adulto">Adulto</SelectItem>
              <SelectItem value="idoso">Idoso</SelectItem>
              <SelectItem value="unknown">Não sei</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="size">Porte</Label>
          <Select 
            value={formData.size} 
            onValueChange={(value) => handleSelectChange('size', value)}
            required
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeno</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
              <SelectItem value="unknown">Não sei</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    
      <div className="mt-4">
        <Label htmlFor="location">Local onde o animal foi encontrado</Label>
        <Input 
          id="location" 
          name="location" 
          placeholder="Endereço ou referência"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="mt-4">
        <Label htmlFor="description">Descrição do animal e situação</Label>
        <Textarea 
          id="description" 
          name="description"
          placeholder="Descreva o animal e a situação em que foi encontrado"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="mt-4">
        <Label htmlFor="photos">Fotos do animal</Label>
        <Input 
          id="photos" 
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <p className="text-xs text-gray-500 mt-1">
          Fotos ajudam muito na identificação e avaliação do estado do animal.
        </p>
      </div>
    </div>
  );
};

export default AnimalInfoForm;
