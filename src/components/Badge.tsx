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
        className="group cursor-pointer transition-all duration-300 hover:scale-110 animate-glow"
        onClick={handleClick}
        {...handleMouseEvents}
      >
                <div className="w-28 sm:w-32 h-28 sm:h-32 rounded-full border-3 sm:border-4 flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-300 sm:hover:animate-bounce-slow active:scale-95 touch-none sm:touch-auto glow-border shadow-lg"
             style={{ 
               borderColor: 'var(--accent)',
               backgroundColor: 'var(--bg-secondary)',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{certification.icon}</div>
          <div className="text-[10px] sm:text-xs font-bold text-center leading-tight tracking-wide"
               style={{ 
                 color: 'var(--text-primary)',
                 textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
               }}>
            {certification.title.split(':')[0]}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-20 animate-fadeIn">
          <div className="bg-opacity-95 backdrop-blur-md rounded-lg p-3 sm:p-4 shadow-xl border-2 max-w-xs w-[250px] sm:w-64 transform transition-all duration-200 ease-in-out animate-fade-in active:scale-95 sm:active:scale-100"
               onClick={(e) => e.stopPropagation()}
               style={{ 
                 backgroundColor: 'var(--bg-primary)',
                 borderColor: 'var(--accent)',
                 boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
               }}>
            <div className="text-sm font-bold mb-2 leading-snug tracking-wide" style={{ color: 'var(--text-primary)', textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)' }}>
              {certification.title}
            </div>
            <div className="text-xs mb-2 font-medium tracking-wide" style={{ color: 'var(--accent)', opacity: 0.9 }}>
              {certification.issuer} • {certification.date}
            </div>
            <div className="text-xs leading-relaxed tracking-wide" style={{ color: 'var(--text-secondary)', opacity: 0.95 }}>
              {certification.description}
            </div>
            {certification.link && (
              <button
                onClick={() => certification.link && window.open(certification.link, '_blank')}
                className="flex items-center gap-1 mt-3 text-xs px-3 py-2 rounded-md transition-all duration-300 hover:scale-105 w-full justify-center"
                style={{ 
                  backgroundColor: isMobile ? 'var(--accent)' : 'transparent',
                  color: isMobile ? 'var(--bg-primary)' : 'var(--accent)',
                  border: isMobile ? 'none' : '1px solid var(--accent)'
                }}
              >
                <ExternalLink className="w-3 h-3" />
                {isMobile ? 'Open Certificate' : 'View Certificate'}
              </button>
            )}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-8 border-transparent border-t-current"
                 style={{ color: 'var(--accent)' }}></div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Badge;