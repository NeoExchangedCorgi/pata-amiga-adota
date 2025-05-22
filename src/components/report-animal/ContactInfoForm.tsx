
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type ContactInfoFormProps = {
  formData: {
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    canKeepTemporarily: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRadioChange: (value: string) => void;
};

export function ContactInfoForm({
  formData,
  handleInputChange,
  handleRadioChange
}: ContactInfoFormProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Suas informações de contato</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contactName">Nome</Label>
          <Input 
            id="contactName" 
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="contactPhone">Telefone</Label>
          <Input 
            id="contactPhone" 
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="mt-4">
        <Label htmlFor="contactEmail">E-mail</Label>
        <Input 
          id="contactEmail" 
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="mt-6">
        <Label>Você consegue manter o animal temporariamente?</Label>
        <RadioGroup 
          value={formData.canKeepTemporarily} 
          onValueChange={handleRadioChange}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">Não</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maybe" id="maybe" />
            <Label htmlFor="maybe">Talvez, depende do tempo</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
