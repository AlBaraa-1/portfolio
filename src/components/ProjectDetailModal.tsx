import React, { useEffect } from 'react';
import { X, Github, ExternalLink, TrendingUp, Calendar, Code, Target } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  viewCount?: number;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose, viewCount = 0 }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          animation: 'slideUp 0.4s ease-out',
          border: '1px solid var(--border)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
          style={{
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)'
          }}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="relative mb-6 rounded-xl overflow-hidden" style={{ height: '300px' }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {project.featured && (
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                <span>⭐</span> Featured Project
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {viewCount} views
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  2024
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Project Overview
                </h3>
              </div>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Technologies Used
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--accent)',
                      border: '1px solid var(--accent)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {(project.liveDemo || project.github) && (
              <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                {project.liveDemo && (
                  <button
                    onClick={() => window.open(project.liveDemo, '_blank')}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg-primary)'
                    }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Demo
                  </button>
                )}

                {project.github && (
                  <button
                    onClick={() => window.open(project.github, '_blank')}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <Github className="w-5 h-5" />
                    View Source Code
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailModal;
