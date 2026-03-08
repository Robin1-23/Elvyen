import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,        // reduced from 1.2
      smoothWheel: true,
      wheelMultiplier: 0.8, // reduced from 1
      touchMultiplier: 1.5, // reduced from 2
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // FIX: properly cancel animation frame
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;