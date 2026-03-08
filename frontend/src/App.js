import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  // Keep Render backend alive — pings every 10 minutes to prevent spin-down
  useEffect(() => {
    const keepAlive = setInterval(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/`)
        .catch(() => {}); // silent fail — won't affect user
    }, 10 * 60 * 1000);

    return () => clearInterval(keepAlive);
  }, []);

  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="App relative">
          {/* Noise Overlay */}
          <div className="noise-overlay" />

          {/* Custom Cursor */}
          <CustomCursor />

          {/* Navigation */}
          <Navigation />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>

          {/* Footer */}
          <Footer />

          {/* WhatsApp Floating Button */}
          <WhatsAppButton />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;