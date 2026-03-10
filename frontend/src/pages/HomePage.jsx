import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Code, Palette, TrendingUp, Target, Bot, Layers, BarChart3, ChevronLeft, ChevronRight, Instagram, Linkedin } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import ScheduleMeeting from '../components/ScheduleMeeting';
import gsap from 'gsap';

const testimonials = [
  { name: 'Rahul Mehta', company: 'Zestify Foods', role: 'Founder & CEO', review: 'Elvyen redesigned our entire website and the results were immediate. Our online orders went up by 40% in the first month. Brilliant work and super professional team.', rating: 5, image: '👨‍💼' },
  { name: 'Ananya Kapoor', company: 'StyleSutra', role: 'Co-Founder', review: 'We needed a complete e-commerce overhaul and Elvyen delivered beyond expectations. The site loads fast, looks stunning on mobile, and our customers love it.', rating: 5, image: '👩‍💼' },
  { name: 'Vikram Nair', company: 'BuildRight Infra', role: 'Managing Director', review: 'Finally a web agency that actually listens. They built us a lead generation site that has already brought in 3 major contracts. Worth every rupee.', rating: 5, image: '👨‍💻' },
  { name: 'Sneha Joshi', company: 'MindfulMe App', role: 'Product Lead', review: 'The UI/UX work Elvyen did for our wellness app was exceptional. User retention improved significantly after the redesign. Highly recommended for any startup.', rating: 5, image: '👩‍🎨' },
  { name: 'Arjun Sharma', company: 'TechSpark Solutions', role: 'CTO', review: 'We hired Elvyen for a complex web application and they nailed it. Clean code, great design, and they delivered on time. Will definitely work with them again.', rating: 5, image: '👨‍🔬' },
  { name: 'Pooja Agarwal', company: 'EduReach India', role: 'Operations Head', review: 'Our EdTech platform needed a fresh look and Elvyen transformed it completely. The new design is modern, intuitive and our student signups have doubled.', rating: 5, image: '👩‍💻' },
];

const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ testimonial }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 h-full flex flex-col">
    <StarRating />
    <p className="text-gray-300 leading-relaxed mb-6 italic flex-1">"{testimonial.review}"</p>
    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">
        {testimonial.image}
      </div>
      <div>
        <p className="font-heading font-bold text-white">{testimonial.name}</p>
        <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
      </div>
    </div>
  </div>
);

const ReviewsSection = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    touchStartX.current = null;
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white/[0.02]" data-testid="reviews-section">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16 text-center">
          <p className="text-cyan-500 font-mono text-sm mb-4">TESTIMONIALS</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">What Clients Say</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">Don't just take our word for it - hear from our satisfied clients</p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}>
              <ReviewCard testimonial={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipeable Carousel */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewCard testimonial={testimonials[current]} />
            </motion.div>
          </div>

          {/* Dots + Arrows */}
          <div className="flex items-center justify-between mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-cyan-500 w-6' : 'bg-white/20'}`} />
              ))}
            </div>

            <button onClick={next} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Swipe hint */}
          <p className="text-center text-gray-600 text-xs mt-4">← Swipe to see more →</p>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true });

  useEffect(() => {
    // Hero glow animation
    const glow = document.querySelector('.hero-glow');
    if (glow) {
      gsap.to(glow, {
        scale: 1.5,
        opacity: 0.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }


  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: 'Moti Mahal',
      category: 'Restaurant Website',
      description: "Premium website for India's iconic dining brand since 1920",
      image: '/images/motimahal.jpg',
      link: 'https://motimahal.in/',
    },
    {
      id: 2,
      title: 'James Edition',
      category: 'Luxury Marketplace',
      description: "World's leading luxury real estate & collectibles platform",
      image: '/images/jamesedition.jpg',
      link: 'https://www.jamesedition.com/',
    },
    {
      id: 3,
      title: 'Superhuman',
      category: 'SaaS Platform',
      description: 'AI-powered email platform built for high-performance teams',
      image: '/images/superhuman.jpg',
      link: 'https://superhuman.com/',
    },
    {
      id: 4,
      title: 'Active Theory',
      category: 'Website Design',
      description: 'Award-winning creative agency with stunning animations',
      image: '/images/activetheory.jpg',
      link: 'https://activetheory.net/',
    },
    {
      id: 5,
      title: 'Raycast',
      category: 'Web Application',
      description: 'Powerful productivity launcher with elegant dark UI',
      image: '/images/raycast.jpg',
      link: 'https://www.raycast.com/',
    },
    {
      id: 6,
      title: 'Landbook',
      category: 'UI/UX Design',
      description: 'Curated collection of beautiful landing page designs',
      image: '/images/landbook.jpg',
      link: 'https://land-book.com/',
    },
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Website Design',
      description: 'Stunning, conversion-focused websites that tell your brand story',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Web Development',
      description: 'High-performance web applications built with modern technologies',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Web Applications',
      description: 'Custom web apps tailored to your business needs',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Intuitive interfaces that users love to interact with',
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Strategy',
      description: 'Data-driven digital strategies that align with your business goals and drive growth',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'SEO / AEO',
      description: 'Dominate search results and answer engines with cutting-edge optimization techniques',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'CRO',
      description: 'Conversion rate optimization that turns your visitors into paying customers',
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'AI Integration',
      description: 'Embed intelligent AI features into your product to automate and personalize experiences',
    },
  ];

  const process = [
    { number: '01', title: 'Discovery', description: 'Understanding your vision and goals' },
    { number: '02', title: 'Design', description: 'Crafting the perfect visual experience' },
    { number: '03', title: 'Development', description: 'Building with cutting-edge technology' },
    { number: '04', title: 'Launch', description: 'Deploying and optimizing for success' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section — FIX: added pt-28 md:pt-32 to prevent navbar overlap */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 pt-28 md:pt-32" data-testid="hero-section">
        {/* Animated Glow */}
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-2 h-2 bg-cyan-500 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-3 h-3 bg-blue-500 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8" data-testid="hero-headline">
              We Create
              <br />
              <span className="text-cyan-500">Digital</span> Experiences
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12"
            data-testid="hero-subheadline"
          >
            Elvyen builds modern websites, web apps, and digital solutions for startups and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton
              data-testid="view-projects-btn"
              className="px-8 py-4 bg-white text-black rounded-full font-medium flex items-center gap-2 group"
            >
              <Link to="/portfolio" className="flex items-center gap-2">
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>

            <div className="relative group">
              {/* Pulsing rings */}
              <span className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping" />
              <span className="absolute inset-0 rounded-full bg-cyan-500/20 animate-pulse" />
              <MagneticButton
                data-testid="start-project-btn"
                className="relative px-8 py-4 border-2 border-cyan-500 text-white rounded-full font-medium bg-black hover:bg-cyan-500/10 transition-colors"
              >
                <Link to="/contact">Make It Real</Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="featured-projects-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-cyan-500 font-mono text-sm mb-4">FEATURED WORK</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
              Creative Showcase
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target={project.link ? "_blank" : undefined}
                rel={project.link ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl aspect-[4/3] block ${project.link ? 'cursor-pointer' : ''}`}
                data-testid={`project-card-${project.id}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-cyan-500 text-sm font-mono mb-2">{project.category}</p>
                  <h3 className="font-heading text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                  {project.link && (
                    <p className="text-cyan-500 text-xs mt-3 flex items-center gap-1">
                      View Project <ArrowRight className="w-4 h-4" />
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="py-24 md:py-32 px-6 md:px-12" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="text-cyan-500 font-mono text-sm mb-4">WHAT WE DO</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
              Our Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500"
                data-testid={`service-card-${index}`}
              >
                <div className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {service.icon}
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              data-testid="view-all-services-btn"
              className="inline-flex items-center gap-2 text-cyan-500 font-medium hover:gap-4 transition-all"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="process-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="text-cyan-500 font-mono text-sm mb-4">HOW WE WORK</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
              Our Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                data-testid={`process-step-${index}`}
              >
                <div className="font-mono text-6xl font-bold text-white/5 mb-4">{step.number}</div>
                <h3 className="font-heading text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <ReviewsSection />

      {/* Trusted Partners Marquee */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-6"
        >
          <p className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">Powered By</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">
            We Build With The
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Best In The World
            </span>
          </h2>
        </motion.div>

        {/* Seamless scrolling logos — no gaps, no breaks */}
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <style>{`
            .partners-track {
              display: flex;
              align-items: center;
              width: max-content;
              animation: partners-scroll 30s linear infinite;
            }
            @keyframes partners-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div className="partners-track">
            {[...Array(2)].map((_, repeat) => (
              <div key={repeat} className="flex items-center">
                {[
                  { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
                  { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Google-cloud-platform.svg' },
                  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
                  { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
                  { name: 'ServiceNow', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg' },
                  { name: 'React', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
                  { name: 'Figma', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
                  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
                ].map((partner) => (
                  <div
                    key={partner.name + repeat}
                    className="flex items-center justify-center opacity-30 hover:opacity-90 transition-opacity duration-300 flex-shrink-0 px-12"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-7 w-auto object-contain filter brightness-0 invert"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '30+', label: 'Happy Clients' },
              { number: '5+', label: 'Years Experience' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="font-heading text-5xl md:text-6xl font-bold text-cyan-500 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Meeting */}
      <ScheduleMeeting />

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Ready to Start
              <br />
              <span className="text-cyan-500">Your Project?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Let's create something amazing together
            </p>
            <MagneticButton
              data-testid="cta-contact-btn"
              className="px-10 py-5 bg-cyan-500 text-black rounded-full font-medium text-lg"
            >
              <Link to="/contact">Get In Touch</Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Sticky Social Sidebar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4">
        {/* Line top */}
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300"
          title="Follow on Instagram"
        >
          <Instagram className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 transition-colors" />
        </a>

        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300"
          title="Follow on LinkedIn"
        >
          <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 transition-colors" />
        </a>

        {/* Follow Us text */}
        <p
          className="text-gray-500 text-xs font-mono tracking-widest"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          FOLLOW US
        </p>

        {/* Line bottom */}
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  );
};

export default HomePage;