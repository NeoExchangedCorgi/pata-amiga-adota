
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function VolunteerBenefits() {
  return (
    <>
      <h2 className="text-3xl font-bold text-paraiso-blue mb-6">Por que ser voluntário?</h2>
      <p className="text-gray-700 mb-6">
        O trabalho voluntário no Paraíso dos Focinhos é uma oportunidade incrível para 
        ajudar animais resgatados e contribuir com uma causa nobre. Como voluntário, você 
        poderá fazer a diferença na vida de centenas de animais que foram abandonados 
        ou sofreram maus-tratos.
      </p>
      
      <h3 className="text-xl font-bold mb-4">O que nossos voluntários fazem:</h3>
      <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700">
        <li>Auxiliam nos cuidados diários dos animais</li>
        <li>Ajudam na alimentação e higienização dos espaços</li>
        <li>Dão carinho e atenção aos animais resgatados</li>
        <li>Auxiliam em eventos de adoção</li>
        <li>Contribuem com habilidades específicas (fotografia, redes sociais, etc)</li>
        <li>Participam de resgates (voluntários experientes)</li>
      </ul>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-paraiso-lightblue">
            <CardTitle>Requisitos</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Ter pelo menos 18 anos</li>
              <li>Comprometer-se com os horários acordados</li>
              <li>Ter amor e respeito pelos animais</li>
              <li>Seguir as orientações da equipe</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-paraiso-lightblue">
            <CardTitle>Dias e Horários</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4 text-gray-700">
              Temos disponibilidade para voluntários nos seguintes dias e horários:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Terças e Quintas:</strong> 9h às 16h</li>
              <li><strong>Sábados e Domingos:</strong> 8h às 17h</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
