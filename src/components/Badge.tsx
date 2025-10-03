import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { Certification } from '../data/portfolioData';

interface BadgeProps {
  certification: Certification;
}

const Badge: React.FC<BadgeProps> = ({ certification }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (badgeRef.current && !badgeRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile]);

  const handleClick = () => {
    if (isMobile) {
      setShowTooltip(!showTooltip);
    } else if (certification.link) {
      window.open(certification.link, '_blank');
    }
  };

  const handleMouseEvents = isMobile ? {} : {
    onMouseEnter: () => setShowTooltip(true),
    onMouseLeave: () => setShowTooltip(false)
  };

  return (
    <div className="relative" ref={badgeRef}>
      <div
        className="group cursor-pointer transition-all duration-150 hover:scale-105"
        onClick={handleClick}
        {...handleMouseEvents}
      >
                <div className={`w-28 sm:w-32 h-28 sm:h-32 rounded-full border-2 flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-150 hover:scale-105 active:scale-95 touch-none sm:touch-auto group relative overflow-hidden ${
                  certification.featured ? 'ring-2 ring-yellow-400 ring-opacity-60' : ''
                }`}
             style={{ 
               borderColor: certification.featured ? '#fbbf24' : 'var(--accent)',
               backgroundColor: certification.featured ? 'rgba(251, 191, 36, 0.1)' : 'var(--bg-secondary)',
               boxShadow: certification.featured 
                 ? '0 10px 15px -3px rgba(251, 191, 36, 0.3), 0 4px 6px -2px rgba(251, 191, 36, 0.05)' 
                 : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          {/* Featured Badge Indicator */}
          {certification.featured && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold shadow-lg">
              ⭐
            </div>
          )}
          
          <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{certification.icon}</div>
          <div className="text-[10px] sm:text-xs font-bold text-center leading-tight tracking-wide"
               style={{ 
                 color: certification.featured ? '#fbbf24' : 'var(--text-primary)',
                 textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
               }}>
            {certification.title.split(':')[0]}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-20 animate-fadeIn">
          <div className={`bg-opacity-95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border max-w-xs w-[250px] sm:w-64 transform transition-all duration-100 ease-out animate-fade-in ${
            certification.featured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
          }`}
               onClick={(e) => e.stopPropagation()}
               style={{ 
                 backgroundColor: certification.featured ? 'rgba(251, 191, 36, 0.05)' : 'var(--bg-primary)',
                 borderColor: certification.featured ? '#fbbf24' : 'var(--accent)',
                 boxShadow: certification.featured 
                   ? '0 20px 25px -5px rgba(251, 191, 36, 0.2), 0 10px 10px -5px rgba(251, 191, 36, 0.1)' 
                   : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
               }}>
            
            {/* Featured Badge Header */}
            {certification.featured && (
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-yellow-400 border-opacity-30">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold">
                  ⭐
                </div>
                <span className="text-xs font-bold text-yellow-400 tracking-wide">
                  FEATURED ACHIEVEMENT
                </span>
              </div>
            )}
            
            <div className={`text-sm font-bold mb-2 leading-snug tracking-wide ${
              certification.featured ? 'text-yellow-400' : ''
            }`} style={{ 
              color: certification.featured ? '#fbbf24' : 'var(--text-primary)', 
              textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)' 
            }}>
              {certification.title}
            </div>
            <div className="text-xs mb-2 font-medium tracking-wide" style={{ 
              color: certification.featured ? '#fbbf24' : 'var(--accent)', 
              opacity: 0.9 
            }}>
              {certification.issuer} • {certification.date}
            </div>
            <div className="text-xs leading-relaxed tracking-wide" style={{ color: 'var(--text-secondary)', opacity: 0.95 }}>
              {certification.description}
            </div>
            {certification.link && (
              <button
                onClick={() => certification.link && window.open(certification.link, '_blank')}
                className={`group/btn relative flex items-center gap-2 mt-3 text-xs px-4 py-2 rounded-md transition-all duration-150 hover:scale-102 w-full justify-center overflow-hidden ${
                  certification.featured ? 'font-semibold' : ''
                }`}
                style={{ 
                  backgroundColor: certification.featured ? 'rgba(251, 191, 36, 0.1)' : 'var(--bg-primary)',
                  color: certification.featured ? '#fbbf24' : 'var(--accent)',
                  border: certification.featured ? '1px solid #fbbf24' : '1px solid var(--accent)'
                }}>
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-10 transition-opacity duration-150"
                     style={{ 
                       background: certification.featured 
                         ? 'linear-gradient(45deg, #fbbf24, transparent, #fbbf24)' 
                         : 'linear-gradient(45deg, var(--accent), transparent, var(--accent))' 
                     }}></div>
              
                <div className="flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-1">
                  <ExternalLink className="w-3 h-3 transition-transform duration-150 group-hover:rotate-12" />
                  <span>
                    {certification.featured 
                      ? (isMobile ? 'View Achievement' : 'View Achievement Certificate') 
                      : (isMobile ? 'Open Certificate' : 'View Certificate')
                    }
                  </span>
                </div>
              </button>
            )}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-8 border-transparent border-t-current"
                 style={{ color: certification.featured ? '#fbbf24' : 'var(--accent)' }}></div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Badge;