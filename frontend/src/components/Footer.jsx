import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const glitchRef = useRef(null);

  // Glitch effect trigger randomly
  useEffect(() => {
    const el = glitchRef.current;
    if (!el) return;
    const triggerGlitch = () => {
      el.classList.add('glitching');
      setTimeout(() => el.classList.remove('glitching'), 600);
    };
    const interval = setInterval(triggerGlitch, 3000);
    return () => clearInterval(interval);
  }, []);

  const footerLinks = {
    company: [
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Contact', path: '/contact' },
    ],
    services: [
      { name: 'Website Design', path: '/services' },
      { name: 'Web Development', path: '/services' },
      { name: 'Web Applications', path: '/services' },
      { name: 'UI/UX Design', path: '/services' },
    ],
  };

  return (
    <footer className="relative z-10 bg-black border-t border-white/10 overflow-hidden">

      {/* Glitch CSS */}
      <style>{`
        .glitch-text {
          position: relative;
          -webkit-text-stroke: 1.5px rgba(0, 240, 255, 0.15);
          color: transparent;
          font-size: clamp(3rem, 15vw, 14rem);
          font-weight: 900;
          letter-spacing: 0.05em;
          line-height: 0.85;
          user-select: none;
          transition: -webkit-text-stroke 0.3s;
          text-align: center;
          width: 100%;
          display: block;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          -webkit-text-stroke: 1.5px rgba(0, 240, 255, 0.15);
          color: transparent;
          opacity: 0;
        }
        .glitching::before {
          opacity: 1;
          -webkit-text-stroke: 2px rgba(0, 240, 255, 0.6);
          animation: glitch-1 0.15s steps(2) 3;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
        }
        .glitching::after {
          opacity: 1;
          -webkit-text-stroke: 2px rgba(255, 0, 128, 0.4);
          animation: glitch-2 0.15s steps(2) 3;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
        }
        .glitching {
          -webkit-text-stroke: 2px rgba(0, 240, 255, 0.5);
          filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.3));
        }
        @keyframes glitch-1 {
          0%   { transform: translate(-4px, 0); }
          50%  { transform: translate(4px, 0); }
          100% { transform: translate(-2px, 0); }
        }
        @keyframes glitch-2 {
          0%   { transform: translate(4px, 0); }
          50%  { transform: translate(-4px, 0); }
          100% { transform: translate(2px, 0); }
        }

        /* Marquee */
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 18s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6" data-testid="footer-logo">
              <img
                src="https://customer-assets.emergentagent.com/job_flux-digital-1/artifacts/py96ij7q_IMG_1020-removebg-preview.png"
                alt="Elvyen Logo"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Creating exceptional digital experiences for startups and businesses worldwide.
            </p>
            <Link
              to="/contact"
              data-testid="footer-cta"
              className="inline-flex items-center gap-2 text-cyan-500 text-sm font-medium hover:gap-3 transition-all group"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Company Links */}
          <div className="relative z-10">
            <h3 className="font-heading text-lg font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                    className="text-gray-400 text-sm hover:text-cyan-500 transition-colors block py-1 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="relative z-10">
            <h3 className="font-heading text-lg font-bold mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    data-testid={`footer-service-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 text-sm hover:text-cyan-500 transition-colors block py-1 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="relative z-10">
            <h3 className="font-heading text-lg font-bold mb-6 text-white">Get In Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:workelvyen@gmail.com"
                data-testid="footer-email"
                className="flex items-start gap-3 text-gray-400 text-sm hover:text-cyan-500 transition-colors group"
              >
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-cyan-500" />
                <span className="group-hover:translate-x-1 transition-transform">
                  workelvyen@gmail.com
                </span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-cyan-500" />
                <div className="space-y-1">
                  <a href="tel:+919306928510" className="block hover:text-cyan-500 transition-colors" data-testid="footer-phone-1">
                    +91 93069 28510
                  </a>
                  <a href="tel:+919991239374" className="block hover:text-cyan-500 transition-colors" data-testid="footer-phone-2">
                    +91 99912 39374
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-cyan-500" />
                <span>New Delhi<br />India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Marquee Strip */}
      <div className="border-t border-white/5 py-4 overflow-hidden">
        <div className="marquee-track">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white/10 text-sm font-mono uppercase tracking-[0.3em] px-8 flex-shrink-0">
              ELVYEN · WEB DESIGN · DEVELOPMENT · UI/UX · DIGITAL EXPERIENCES ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* 🔥 Giant Glitch ELVYEN Text */}
      <div className="relative overflow-hidden py-4 px-6 md:px-12 flex justify-center items-center">
        {/* Cyan glow behind text */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

        <div
          ref={glitchRef}
          data-text="ELVYEN"
          className="glitch-text select-none text-center"
        >
          ELVYEN
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm" data-testid="footer-copyright">
              © {currentYear} Elvyen. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/about"
                className="text-gray-500 text-sm hover:text-cyan-500 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Privacy Policy
              </Link>
              <Link
                to="/about"
                className="text-gray-500 text-sm hover:text-cyan-500 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;