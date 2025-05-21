
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface AdoptionApplication {
  id: string;
  animal_id: string;
  status: string;
  created_at: string;
  animal: {
    name: string;
    species: string;
  };
}

interface AnimalReport {
  id: string;
  animal_name: string;
  species: string;
  status: string;
  created_at: string;
}

interface VolunteerApplication {
  id: string;
  status: string;
  created_at: string;
}

interface Profile {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    phone: '',
    email: user?.email || '',
  });
  const [adoptions, setAdoptions] = useState<AdoptionApplication[]>([]);
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user!.id)
          .single();

        if (profileError) throw profileError;
        
        if (profileData) {
          setProfile({
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            phone: profileData.phone || '',
            email: profileData.email || user!.email || '',
          });
        }

        // Fetch adoption applications with animal info
        const { data: adoptionsData, error: adoptionsError } = await supabase
          .from('adoption_applications')
          .select(`
            id, 
            animal_id,
            status,
            created_at,
            animals:animal_id (
              name,
              species
            )
          `)
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        if (adoptionsError) throw adoptionsError;
        setAdoptions(adoptionsData || []);

        // Fetch animal reports
        const { data: reportsData, error: reportsError } = await supabase
          .from('animal_reports')
          .select('id, animal_name, species, status, created_at')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        if (reportsError) throw reportsError;
        setReports(reportsData || []);

        // Fetch volunteer applications
        const { data: volunteerData, error: volunteerError } = await supabase
          .from('volunteer_applications')
          .select('id, status, created_at')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        if (volunteerError) throw volunteerError;
        setVolunteerApplications(volunteerData || []);

      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar seus dados',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, toast]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProfile = async () => {
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
          email: profile.email,
        })
        .eq('id', user!.id);

      if (error) throw error;

      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar seu perfil',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">Em análise</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Aprovado</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">Rejeitado</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">Carregando informações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-paraiso-blue dark:text-paraiso-yellow mb-8">Meu Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Informações Pessoais</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Atualize seus dados de contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name" className="dark:text-white">Nome</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={profile.first_name}
                      onChange={handleProfileChange}
                      className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="dark:text-white">Sobrenome</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={profile.last_name}
                      onChange={handleProfileChange}
                      className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="dark:text-white">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="dark:text-white">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex gap-4 flex-col sm:flex-row">
              <Button 
                onClick={updateProfile} 
                disabled={updating}
                className="w-full sm:w-auto bg-paraiso-blue hover:bg-blue-700 dark:bg-paraiso-blue dark:hover:bg-blue-700"
              >
                {updating ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => signOut()} 
                className="w-full sm:w-auto"
              >
                Sair da Conta
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="adoptions">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="adoptions">Adoções</TabsTrigger>
              <TabsTrigger value="reports">Reportes</TabsTrigger>
              <TabsTrigger value="volunteer">Voluntariado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="adoptions">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Minhas Solicitações de Adoção</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Acompanhe o status das suas solicitações de adoção
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {adoptions.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Você ainda não solicitou nenhuma adoção.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {adoptions.map((adoption) => (
                        <div 
                          key={adoption.id} 
                          className="p-4 border rounded-md dark:border-gray-700 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium dark:text-white">
                              {adoption.animal?.name || 'Animal não encontrado'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(adoption.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            {getStatusBadge(adoption.status)}
                            <Button
                              variant="outline" 
                              size="sm" 
                              asChild
                              className="dark:border-gray-600 dark:text-gray-300"
                            >
                              <Link to={`/animals/${adoption.animal_id}`}>
                                Ver Animal
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Meus Reportes de Animais</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Acompanhe o status dos animais que você reportou
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {reports.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Você ainda não reportou nenhum animal.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {reports.map((report) => (
                        <div 
                          key={report.id} 
                          className="p-4 border rounded-md dark:border-gray-700 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium dark:text-white">
                              {report.animal_name} ({report.species === 'dog' ? 'Cão' : 
                               report.species === 'cat' ? 'Gato' : 
                               report.species === 'horse' ? 'Cavalo' : 'Outro'})
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(report.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            {getStatusBadge(report.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="volunteer">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Minhas Inscrições como Voluntário</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Acompanhe o status das suas inscrições para voluntariado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {volunteerApplications.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Você ainda não se inscreveu para ser voluntário.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {volunteerApplications.map((application) => (
                        <div 
                          key={application.id} 
                          className="p-4 border rounded-md dark:border-gray-700 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium dark:text-white">
                              Inscrição para Voluntariado
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(application.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            {getStatusBadge(application.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
