
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import LawyersPage from '@/pages/LawyersPage';
import LawyerDetailPage from '@/pages/LawyerDetailPage';
import PricingPage from '@/pages/PricingPage';
import LoginPage from '@/pages/LoginPage';
import NotFound from '@/pages/NotFound';
import AboutPage from '@/pages/AboutPage';

import '@/App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/lawyers" element={<LawyersPage />} />
      <Route path="/lawyers/:id" element={<LawyerDetailPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
