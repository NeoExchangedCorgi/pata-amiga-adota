
export interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'horse' | 'other';
  sex: 'male' | 'female';
  age: string;
  size: 'small' | 'medium' | 'large';
  description: string;
  photos: string[];
  location: string;
  status: 'available' | 'pending' | 'adopted';
}

export const animals: Animal[] = [
  {
    id: '1',
    name: 'Thor',
    species: 'dog',
    sex: 'male',
    age: '2 anos',
    size: 'medium',
    description: 'Thor é um cachorro muito amoroso e brincalhão. Ele adora correr e brincar com bolinhas, além de ser ótimo com crianças.',
    photos: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fHww'],
    location: 'Rio de Janeiro, RJ',
    status: 'available',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    sex: 'female',
    age: '1 ano',
    size: 'small',
    description: 'Luna é uma gatinha muito carinhosa e tranquila. Ela adora ficar no colo e receber carinho.',
    photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww'],
    location: 'Rio de Janeiro, RJ',
    status: 'available',
  },
  {
    id: '3',
    name: 'Belinha',
    species: 'dog',
    sex: 'female',
    age: '3 anos',
    size: 'small',
    description: 'Belinha é uma cachorrinha muito dócil e companheira. Ela adora ficar perto de pessoas e é ótima para apartamentos.',
    photos: ['https://images.unsplash.com/photo-1583511655826-05700442976d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nfGVufDB8fDB8fHww'],
    location: 'Rio de Janeiro, RJ',
    status: 'available',
  },
  {
    id: '4',
    name: 'Simba',
    species: 'cat',
    sex: 'male',
    age: '2 anos',
    size: 'medium',
    description: 'Simba é um gato muito brincalhão e independente. Ele adora explorar e brincar com brinquedos.',
    photos: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'],
    location: 'Rio de Janeiro, RJ',
    status: 'pending',
  },
  {
    id: '5',
    name: 'Rex',
    species: 'dog',
    sex: 'male',
    age: '4 anos',
    size: 'large',
    description: 'Rex é um cão muito protetor e leal. Ele é ótimo como cão de guarda e muito amoroso com a família.',
    photos: ['https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D'],
    location: 'Rio de Janeiro, RJ',
    status: 'available',
  },
  {
    id: '6',
    name: 'Mia',
    species: 'cat',
    sex: 'female',
    age: '6 meses',
    size: 'small',
    description: 'Mia é uma gatinha muito brincalhona e curiosa. Ela adora brincar com bolinhas e dormir no sol.',
    photos: ['https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'],
    location: 'Rio de Janeiro, RJ',
    status: 'available',
  },
  {
    id: '7',
    name: 'Estrela',
    species: 'horse',
    sex: 'female',
    age: '5 anos',
    size: 'large',
    description: 'Estrela é uma égua muito dócil e tranquila. Ela foi resgatada de uma situação de maus tratos e agora está recuperada e pronta para um novo lar.',
    photos: ['https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9yc2V8ZW58MHx8MHx8fDA%3D'],
    location: 'Rio de Janeiro, RJ',
    status: 'available',
  },
  {
    id: '8',
    name: 'Bacon',
    species: 'other',
    sex: 'male',
    age: '1 ano',
    size: 'medium',
    description: 'Bacon é um porco muito inteligente e carinhoso. Ele foi resgatado de uma situação de abandono e agora procura um lar com bastante espaço.',
    photos: ['https://images.unsplash.com/photo-1596557072127-3c79c1f44d5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGlnfGVufDB8fDB8fHww'],
    location: 'Rio de Janeiro, RJ',
    status: 'available',
  }
];
