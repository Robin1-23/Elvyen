import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'web-app', 'website', 'e-commerce', 'ui-ux'];

  const projects = [
    {
      id: 1,
      title: 'Trello',
      category: 'web-app',
      description: 'Modern project management dashboard with real-time collaboration',
      image: '/images/trello.jpg',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: 'https://trello.com/',
    },
    {
      id: 2,
      title: 'Synthesia',
      category: 'web-app',
      description: 'AI-powered video content generation platform with intuitive interface',
      image: '/images/synthesia.jpg',
      tags: ['Next.js', 'OpenAI', 'TailwindCSS'],
      link: 'https://www.synthesia.io/',
    },
    {
      id: 3,
      title: 'Target',
      category: 'e-commerce',
      description: 'Large-scale e-commerce platform with seamless shopping experience',
      image: '/images/target.jpg',
      tags: ['React', 'Three.js', 'Stripe'],
      link: 'https://www.target.com/',
    },
    {
      id: 4,
      title: 'Active Theory',
      category: 'website',
      description: 'Award-winning creative agency portfolio with stunning animations',
      image: '/images/activetheory.jpg',
      tags: ['Next.js', 'GSAP', 'Framer Motion'],
      link: 'https://activetheory.net/',
    },
    {
      id: 5,
      title: 'Raycast',
      category: 'web-app',
      description: 'Powerful productivity launcher with elegant dark UI',
      image: '/images/raycast.jpg',
      tags: ['React', 'Firebase', 'Chart.js'],
      link: 'https://www.raycast.com/',
    },
    {
      id: 6,
      title: 'Landbook',
      category: 'ui-ux',
      description: 'Curated collection of beautiful landing page designs',
      image: '/images/landbook.jpg',
      tags: ['Figma', 'Storybook', 'React'],
      link: 'https://land-book.com/',
    },
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen pt-32">
      {/* Hero */}
      <section className="px-6 md:px-12 mb-16" data-testid="portfolio-hero-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cyan-500 font-mono text-sm mb-4">PORTFOLIO</p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8" data-testid="portfolio-headline">
              Our
              <br />
              <span className="text-cyan-500">Creative Work</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
              Explore our latest projects and see how we transform ideas into exceptional digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 md:px-12 mb-12" data-testid="portfolio-filter-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-testid={`filter-${cat}`}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/50'
                }`}
              >
                {cat.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-12 pb-24" data-testid="projects-grid-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 block cursor-pointer"
                data-testid={`portfolio-project-${project.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-cyan-500 text-sm flex items-center gap-1">
                      View Project <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading text-xl font-bold">{project.title}</h3>
                    <ExternalLink className="w-5 h-5 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-500 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;