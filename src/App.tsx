
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnimalDetails from "./pages/AnimalDetails";
import AnimalCatalog from "./pages/AnimalCatalog";
import About from "./pages/About";
import ReportAnimal from "./pages/ReportAnimal";
import Volunteer from "./pages/Volunteer";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/animals" element={<Layout><AnimalCatalog /></Layout>} />
              <Route path="/animals/:id" element={<Layout><AnimalDetails /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/report" element={<Layout><ReportAnimal /></Layout>} />
              <Route path="/volunteer" element={<Layout><Volunteer /></Layout>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Layout><Profile /></Layout>
                </PrivateRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
