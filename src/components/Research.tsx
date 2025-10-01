import React, { useEffect, useRef, useState } from 'react';
import { Trophy, ExternalLink, FileText } from 'lucide-react';
import { research } from '../data/portfolioData';

const Research: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="research" 
      ref={sectionRef} 
      className="py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div 
              className="h-px w-8 sm:w-12 transition-all duration-700 delay-500"
              style={{ backgroundColor: 'var(--accent)' }}
            ></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span style={{ color: 'var(--accent)' }} className="terminal-prompt">
                Achievements Unlocked
              </span>
            </h2>
            <div 
              className="h-px w-8 sm:w-12 transition-all duration-700 delay-500"
              style={{ backgroundColor: 'var(--accent)' }}
            ></div>
          </div>
          <p 
            className="text-lg sm:text-xl max-w-3xl mx-auto transition-all duration-700 delay-700"
            style={{ color: 'var(--text-secondary)' }}
          >
            Research contributions and academic publications in the field of computer vision and AI.
          </p>
        </div>

        {/* Research Papers */}
        <div className="space-y-8">
          {research.map((paper, index) => (
            <div
              key={paper.id}
              className={`group relative overflow-hidden rounded-xl transition-all duration-700 transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                hover:shadow-xl hover:-translate-y-1`}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                animationDelay: `${index * 200}ms`,
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-xl transition-opacity duration-700 opacity-50"
                   style={{
                     background: `linear-gradient(45deg, 
                       var(--accent) 0%, 
                       transparent 40%,
                       transparent 60%,
                       var(--accent) 100%
                     )`,
                   }}
              ></div>
              
              <div className="relative p-4 sm:p-6 md:p-8 lg:p-12 z-10">
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                  {/* Paper Content */}
                  <div className="lg:col-span-2">
                    {/* Conference */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-block px-3 sm:px-4 py-1.5 rounded-lg text-sm sm:text-base font-semibold"
                            style={{ 
                              backgroundColor: 'var(--accent)', 
                              color: 'var(--bg-primary)',
                              boxShadow: '0 0 15px var(--accent)'
                            }}>
                        {paper.conference}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 leading-tight"
                        style={{ color: 'var(--text-primary)' }}>
                      {paper.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-justify"
                       style={{ color: 'var(--text-secondary)' }}>
                      {paper.abstract}
                    </p>

                    {/* Action Button */}
                    <button
                      onClick={() => window.open(paper.link, '_blank')}
                      className="group/btn relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--accent)',
                      }}
                    >
                      {/* Gradient border */}
                      <div 
                        className="absolute inset-0 rounded-lg border-2 transition-all duration-300"
                        style={{ 
                          borderColor: 'var(--accent)',
                          opacity: 0.5
                        }}
                      ></div>

                      {/* Hover gradient */}
                      <div 
                        className="absolute inset-0 rounded-lg opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"
                        style={{ 
                          background: 'linear-gradient(to right, var(--accent), transparent, var(--accent))'
                        }}
                      ></div>

                      {/* Moving light effect */}
                      <div 
                        className="absolute top-0 -left-[100%] w-[200%] h-full group-hover/btn:left-[100%] transition-all duration-1000 ease-in-out"
                        style={{ 
                          background: 'linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.2), transparent)',
                          opacity: 0.5
                        }}
                      ></div>

                      {/* Button content */}
                      <div className="relative flex items-center gap-2 sm:gap-3">
                        <FileText 
                          className="w-4 sm:w-5 h-4 sm:h-5 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-6" 
                          style={{ 
                            filter: 'drop-shadow(0 0 8px var(--accent))'
                          }}
                        />
                        <span 
                          className="relative transition-transform duration-300 group-hover/btn:translate-x-1"
                          style={{
                            textShadow: '0 0 10px var(--accent)'
                          }}
                        >
                          Read Paper
                        </span>
                        <ExternalLink 
                          className="w-3 sm:w-4 h-3 sm:h-4 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:rotate-12" 
                          style={{ 
                            filter: 'drop-shadow(0 0 8px var(--accent))'
                          }}
                        />
                      </div>
                    </button>
                  </div>

                  {/* Visual Element */}
                  <div className="lg:col-span-1 flex flex-col items-center justify-center gap-4">
                    <div className="relative group/trophy">
                      <div 
                        className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-2 flex items-center justify-center transition-transform duration-500 group-hover/trophy:scale-102"
                        style={{ 
                          borderColor: 'var(--accent)',
                          boxShadow: '0 0 10px var(--accent)'
                        }}
                      >
                        <Trophy 
                          className="w-16 h-16 lg:w-20 lg:h-20 transition-all duration-500 group-hover/trophy:scale-110 group-hover/trophy:rotate-12" 
                          style={{ color: 'var(--accent)' }} 
                        />
                      </div>
                      
                      {/* Floating particles - reduced */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping opacity-50"
                           style={{ 
                             backgroundColor: 'var(--accent)',
                             animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'
                           }}></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-ping opacity-50"
                           style={{ 
                             backgroundColor: 'var(--accent)',
                             animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite 1s'
                           }}></div>
                    </div>

                    {/* Badges Container */}
                    <div className="flex flex-col gap-2 items-center">
                      {/* Published Badge */}
                      <div 
                        className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 group-hover:scale-102 border w-full"
                        style={{ 
                          borderColor: 'var(--accent)',
                          color: 'var(--accent)',
                          backgroundColor: 'var(--bg-primary)'
                        }}
                      >
                        <span className="text-sm font-medium whitespace-nowrap">Published {paper.year}</span>
                      </div>

                      {/* Test Badge */}
                      <div 
                        className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 group-hover:scale-102 border w-full"
                        style={{ 
                          borderColor: 'var(--accent)',
                          color: 'var(--accent)',
                          backgroundColor: 'var(--bg-primary)'
                        }}
                      >
                        <span className="text-base font-medium whitespace-nowrap">Test Status: Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                   style={{ 
                     background: 'radial-gradient(circle at center, var(--accent), transparent 70%)'
                   }}></div>
            </div>
          ))}
        </div>

        {/* Future Research Section */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div 
            className="group inline-block p-8 rounded-xl border-2 border-dashed transition-all duration-500 hover:scale-105 relative overflow-hidden"
            style={{ borderColor: 'var(--accent)' }}
          >
            {/* Background glow effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{ 
                background: 'radial-gradient(circle at center, var(--accent), transparent 70%)'
              }}
            ></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-4xl mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <span role="img" aria-label="rocket">🚀</span>
              </div>
              <h3 
                className="text-xl font-bold mb-2 transition-all duration-500 group-hover:text-2xl"
                style={{ color: 'var(--text-primary)' }}
              >
                More Research Coming Soon
              </h3>
              <p 
                className="transition-all duration-500 group-hover:opacity-80"
                style={{ color: 'var(--text-secondary)' }}
              >
                Currently working on exciting new projects in computer vision and AI
              </p>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full animate-ping"
                   style={{ backgroundColor: 'var(--accent)', animationDelay: '0s' }}></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full animate-ping"
                   style={{ backgroundColor: 'var(--accent)', animationDelay: '0.5s' }}></div>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping"
                   style={{ backgroundColor: 'var(--accent)', animationDelay: '1s' }}></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full animate-ping"
                   style={{ backgroundColor: 'var(--accent)', animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;