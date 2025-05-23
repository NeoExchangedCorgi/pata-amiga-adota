
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import About from '@/pages/About';
import AnimalCatalog from '@/pages/AnimalCatalog';
import AnimalDetails from '@/pages/AnimalDetails';
import ReportAnimal from '@/pages/ReportAnimal';
import Volunteer from '@/pages/Volunteer';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { createBucketIfNotExists } from '@/services/storage-service';
import { ThemeProvider } from 'next-themes';

import './App.css';

function App() {
  useEffect(() => {
    // Inicializa o bucket para armazenar fotos de animais
    const initStorage = async () => {
      try {
        console.log('Tentando criar ou verificar bucket...');
        const result = await createBucketIfNotExists();
        console.log('Resultado da verificação de bucket:', result);
      } catch (error) {
        console.error('Erro ao inicializar storage:', error);
      }
    };
    
    initStorage();
  }, []);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="animals" element={<AnimalCatalog />} />
          <Route path="animals/:id" element={<AnimalDetails />} />
          <Route path="report" element={<ReportAnimal />} />
          <Route path="volunteer" element={<Volunteer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
