import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
          <div
        ref={cardRef}
        className={`bg-opacity-20 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-500 sm:hover:scale-105 active:scale-98 sm:hover:shadow-xl transform flex flex-col h-full ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Project Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ${isInView || 'group-hover' ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold animate-glow"
               style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex-1 space-y-2 sm:space-y-3">
          <h3 className="text-xl font-bold mb-2 group-hover:text-opacity-80 transition-colors"
              style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          
          <p className="text-sm mb-4 line-clamp-3"
             style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 sm:px-3 py-1 text-xs rounded-full border transition-colors duration-300 hover:scale-105 hover:bg-opacity-10 hover:bg-current"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          {project.liveDemo && (
            <button
              onClick={() => window.open(project.liveDemo, '_blank')}
              className="group relative flex items-center justify-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium flex-1 touch-manipulation rounded-md shadow-sm border border-blue-500/20 active:shadow-none transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {/* Desktop hover effect */}
              <div className="absolute inset-0 hidden sm:block">
                <div className="absolute inset-0 w-2 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out group-hover:w-full opacity-80"></div>
              </div>
              {/* Mobile tap effect */}
              <div className="absolute inset-0 sm:hidden rounded-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 transition-opacity duration-150 ease-out group-active:opacity-20">
                  <div className="absolute inset-0 animate-pulse-slow mix-blend-overlay"></div>
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-center gap-1">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 sm:group-hover:scale-110 sm:group-hover:rotate-6" />
                <span className="transition-all duration-200 sm:group-hover:translate-x-0.5">Demo</span>
              </div>
            </button>
          )}
          
          {project.github && (
            <button
              onClick={() => window.open(project.github, '_blank')}
              className="group relative flex items-center justify-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium flex-1 touch-manipulation rounded-md shadow-sm border border-gray-500/20 active:shadow-none transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {/* Desktop hover effect */}
              <div className="absolute inset-0 hidden sm:block">
                <div className="absolute inset-0 w-2 bg-gradient-to-r from-gray-500 to-gray-600 transition-all duration-300 ease-out group-hover:w-full opacity-80"></div>
              </div>
              {/* Mobile tap effect */}
              <div className="absolute inset-0 sm:hidden rounded-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 transition-opacity duration-150 ease-out group-active:opacity-20">
                  <div className="absolute inset-0 animate-pulse-slow mix-blend-overlay"></div>
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-center gap-1">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 sm:group-hover:scale-110 sm:group-hover:rotate-6" />
                <span className="transition-all duration-200 sm:group-hover:translate-x-0.5">GitHub</span>
              </div>
            </button>
          )}
          
          <button
            onClick={() => window.open(`/projects/${project.id}`, '_blank')}
            className="group relative flex items-center justify-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium flex-1 touch-manipulation rounded-md shadow-sm border border-green-500/20 active:shadow-none transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {/* Desktop hover effect */}
            <div className="absolute inset-0 hidden sm:block">
              <div className="absolute inset-0 w-2 bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300 ease-out group-hover:w-full opacity-80"></div>
            </div>
            {/* Mobile tap effect */}
            <div className="absolute inset-0 sm:hidden rounded-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 transition-opacity duration-150 ease-out group-active:opacity-20">
                <div className="absolute inset-0 animate-pulse-slow mix-blend-overlay"></div>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-center gap-1">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-150 sm:group-hover:scale-110" />
              <span className="transition-all duration-200 sm:group-hover:translate-x-0.5">Details</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;