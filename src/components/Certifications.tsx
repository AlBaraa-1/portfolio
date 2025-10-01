import React, { useEffect, useRef, useState } from 'react';
import { certifications } from '../data/portfolioData';
import Badge from './Badge';

const Certifications: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 sm:w-12 transition-all duration-700 delay-500"
                 style={{ backgroundColor: 'var(--accent)' }}></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
                Badge Collection
              </span>
            </h2>
            <div className="h-px w-8 sm:w-12 transition-all duration-700 delay-500"
                 style={{ backgroundColor: 'var(--accent)' }}></div>
          </div>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto transition-all duration-700 delay-700"
             style={{ color: 'var(--text-secondary)' }}>
            Professional certifications and achievements earned through continuous learning and skill development.
          </p>
        </div>

        {/* Badges Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 justify-items-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="transition-all duration-300"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
              }}
            >
              <Badge certification={cert} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-8 sm:mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center p-4 sm:p-6 rounded-lg glow-border transition-all duration-300 hover:scale-105"
               style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              15+
            </div>
            <div className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
              Certifications Earned
            </div>
          </div>
          
          <div className="text-center p-4 sm:p-6 rounded-lg glow-border transition-all duration-300 hover:scale-105"
               style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              5
            </div>
            <div className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
              Projects Built
            </div>
          </div>
          
          <div className="text-center p-6 rounded-lg glow-border"
               style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              250+
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Learning Hours
            </div>
          </div>

          <div className="text-center p-6 rounded-lg glow-border"
               style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              5
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Programming Languages
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Always learning, always growing
            </span>
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-dashed transition-all duration-300 hover:scale-105"
               style={{ borderColor: 'var(--accent)' }}>
            <span className="text-2xl">📚</span>
            <span style={{ color: 'var(--text-primary)' }}>More certifications in progress...</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Certifications;