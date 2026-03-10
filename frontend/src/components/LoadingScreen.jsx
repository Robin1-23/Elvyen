import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading → reveal → exit
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('reveal'), 200);
          setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 900);
          }, 1200);
          return 100;
        }
        const inc = prev < 40 ? 3 : prev < 85 ? 1.2 : 2.5;
        return Math.min(prev + inc, 100);
      });
    }, 28);
    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = 'ELVYEN'.split('');

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Particle canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Radial glow center */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px]" />
          </div>

          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent pointer-events-none"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mb-10"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_flux-digital-1/artifacts/py96ij7q_IMG_1020-removebg-preview.png"
              alt="Elvyen"
              className="h-16 w-auto relative z-10"
            />
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '120%' }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>

          {/* Giant letter-by-letter ELVYEN */}
          <div className="flex items-center gap-1 md:gap-3 mb-12 relative">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: phase === 'reveal' ? 1 : 0.08, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: phase === 'reveal' ? i * 0.08 : 0.2 + i * 0.06,
                  ease: 'easeOut',
                }}
                style={{
                  fontSize: 'clamp(3rem, 10vw, 8rem)',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  WebkitTextStroke: phase === 'reveal' ? '2px rgba(0,240,255,0.9)' : '1px rgba(0,240,255,0.3)',
                  color: 'transparent',
                  fontFamily: 'sans-serif',
                  filter: phase === 'reveal' ? 'drop-shadow(0 0 20px rgba(0,240,255,0.6))' : 'none',
                  transition: 'filter 0.4s, -webkit-text-stroke 0.4s',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Progress section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-3 w-64"
          >
            {/* Bar */}
            <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                }}
              >
                {/* Bright tip */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px]" />
              </motion.div>
            </div>

            {/* Counter + label */}
            <div className="flex justify-between w-full">
              <span className="text-gray-600 text-xs font-mono tracking-widest uppercase">
                Loading
              </span>
              <span className="text-cyan-500 text-xs font-mono tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 text-gray-500 text-xs font-mono tracking-[0.4em] uppercase"
          >
            Creating Digital Experiences
          </motion.p>

          {/* Corner accents */}
          {[
            'top-8 left-8 border-t border-l',
            'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l',
            'bottom-8 right-8 border-b border-r',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className={`absolute w-6 h-6 border-cyan-500/40 ${cls}`}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;