
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { AnimalInfoForm } from '@/components/report-animal/AnimalInfoForm';
import { ContactInfoForm } from '@/components/report-animal/ContactInfoForm';
import { WhatHappensNext } from '@/components/report-animal/WhatHappensNext';
import { useReportAnimalForm } from '@/hooks/useReportAnimalForm';

const ReportAnimal = () => {
  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleRadioChange,
    handleFileChange,
    handleSubmit
  } = useReportAnimalForm();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-paraiso-lightblue py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-paraiso-blue mb-4">Encontrei um Animal</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Ajude-nos a resgatar e cuidar de um animal que você encontrou.
            Preencha o formulário com o máximo de informações possíveis.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-paraiso-blue">Formulário de Relato</CardTitle>
              <CardDescription>
                Informe os detalhes sobre o animal encontrado para ajudarmos no resgate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimalInfoForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  handleFileChange={handleFileChange}
                />
                
                <ContactInfoForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleRadioChange={handleRadioChange}
                />
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="w-full bg-paraiso-blue hover:bg-blue-800"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Relato'}
              </Button>
            </CardFooter>
          </Card>
          
          <WhatHappensNext />
        </div>
      </div>
    </div>
  );
};

export default ReportAnimal;
