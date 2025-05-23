
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from "next-themes";

const Layout: React.FC = () => {
  const { theme } = useTheme();
  
  // Aplicar classe dark ao elemento html quando o tema mudar
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-300 w-full">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
