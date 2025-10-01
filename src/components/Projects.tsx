import React, { useState, useEffect, useRef } from 'react';
import { projects, Project } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import { getAllProjectViews, trackProjectView, getProjectViewCount } from '../lib/supabase';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-cv' | 'web-dev' | 'other'>('all');
<<<<<<< HEAD
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [modalViewCount, setModalViewCount] = useState(0);
=======
  const [showElements, setShowElements] = useState({
    title: false,
    filters: false,
    cards: false
  });
>>>>>>> 0905cad (major update)
  const sectionRef = useRef<HTMLElement>(null);

  const filters = [
    { id: 'all', label: '🎮 All Quests', count: projects.length },
    { id: 'ai-cv', label: '🧠 AI & CV', count: projects.filter(p => p.category === 'ai-cv').length },
    { id: 'web-dev', label: '🌐 Web Dev', count: projects.filter(p => p.category === 'web-dev').length },
    { id: 'other', label: '🛠 Other', count: projects.filter(p => p.category === 'other').length },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Staggered animation timeline
          const timeline = [
            { element: 'title', delay: 200 },
            { element: 'filters', delay: 600 },
            { element: 'cards', delay: 1000 }
          ];

          timeline.forEach(({ element, delay }) => {
            setTimeout(() => {
              setShowElements(prev => ({ ...prev, [element]: true }));
            }, delay);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadViewCounts = async () => {
      const counts = await getAllProjectViews();
      setViewCounts(counts);
    };

    loadViewCounts();
  }, []);

  const handleOpenDetails = async (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);

    await trackProjectView(project.id);

    const count = await getProjectViewCount(project.id);
    setModalViewCount(count);

    const counts = await getAllProjectViews();
    setViewCounts(counts);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          showElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Quest Inventory
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Explore my collection of projects spanning AI, computer vision, web development, and innovative solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 transition-all duration-700 ${
          showElements.filters ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {filters.map((filter, index) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-500 hover:scale-105 ${
                activeFilter === filter.id ? 'glow-border' : ''
              }`}
              style={{
                backgroundColor: activeFilter === filter.id ? 'var(--accent)' : 'var(--bg-secondary)',
                color: activeFilter === filter.id ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: activeFilter === filter.id ? 'none' : `1px solid var(--border)`,
                transitionDelay: `${index * 100}ms`,
                opacity: showElements.filters ? 1 : 0,
                transform: showElements.filters ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
          showElements.cards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="transition-all duration-500"
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: showElements.cards ? 1 : 0,
                transform: showElements.cards ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
              }}
            >
              <ProjectCard
                project={project}
                onOpenDetails={handleOpenDetails}
                viewCount={viewCounts[project.id] || 0}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
                No quests found in this category
              </span>
            </p>
          </div>
        )}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        viewCount={modalViewCount}
      />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;