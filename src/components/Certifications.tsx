import React, { useEffect, useRef, useState } from 'react';
import { certifications } from '../data/portfolioData';
import Badge from './Badge';

const Certifications: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile-specific limits
  const mobileLimit = 4; // Show only 4 additional badges on mobile
  const nonFeaturedCerts = certifications.filter(cert => !cert.featured);
  const displayedCerts = isMobile && !showAllMobile 
    ? nonFeaturedCerts.slice(0, mobileLimit) 
    : nonFeaturedCerts;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="relative py-12 sm:py-16 md:py-20">
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

        {/* Featured Certifications Section */}
        {certifications.some(cert => cert.featured) && (
          <div className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-8" style={{ color: '#fbbf24' }}>
              ⭐ Featured Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
              {certifications
                .filter(cert => cert.featured)
                .map((cert, index) => (
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
          </div>
        )}

        {/* Other Certifications */}
        {displayedCerts.length > 0 && (
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-center" style={{ color: 'var(--text-primary)' }}>
                Additional Certifications
              </h3>
              {isMobile && nonFeaturedCerts.length > mobileLimit && (
                <span className="text-sm px-3 py-1 rounded-full" style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-secondary)' 
                }}>
                  {showAllMobile ? nonFeaturedCerts.length : `${mobileLimit}/${nonFeaturedCerts.length}`}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 justify-items-center">
              {displayedCerts.map((cert, index) => (
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

            {/* Mobile Show More/Less Button */}
            {isMobile && nonFeaturedCerts.length > mobileLimit && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllMobile(!showAllMobile)}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-primary)',
                    boxShadow: '0 4px 12px rgba(var(--accent-rgb), 0.3)'
                  }}
                >
                  <span>{showAllMobile ? 'Show Less' : `Show ${nonFeaturedCerts.length - mobileLimit} More`}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showAllMobile ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        <div className={`mt-8 sm:mt-12 md:mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`grid gap-4 sm:gap-6 md:gap-8 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4'}`}>
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
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg mb-20" style={{ color: 'var(--text-secondary)' }}>
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Always learning, always growing
            </span>
          </p>
        </div>
      </div>

      {/* Scroll Indicator - Arrow to Resume */}
      <button
        onClick={() => {
          const resumeSection = document.getElementById('resume');
          if (resumeSection) {
            resumeSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        aria-label="Scroll to resume"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center p-2 rounded-full bg-transparent hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[var(--accent)] animate-bounce"
          aria-hidden="true"
        >
          <path d="M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
};

export default Certifications;