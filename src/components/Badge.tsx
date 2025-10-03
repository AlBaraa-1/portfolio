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
      {/* Aura Effect for Featured Badges */}
      {certification.featured && (
        <>
          {/* Outer Rotating Aura */}
          <div className="absolute inset-0 rounded-full" 
               style={{
                 background: 'conic-gradient(from 0deg, rgba(251, 191, 36, 0.8), rgba(255, 215, 0, 0.6), rgba(251, 191, 36, 0.4), rgba(255, 223, 0, 0.8), rgba(251, 191, 36, 0.8))',
                 filter: 'blur(12px)',
                 animation: 'auraGlow 4s linear infinite',
                 zIndex: -3
               }}>
          </div>
          
          {/* Middle Pulsing Aura */}
          <div className="absolute inset-0 rounded-full" 
               style={{
                 background: 'radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, rgba(251, 191, 36, 0.4) 40%, rgba(251, 191, 36, 0.2) 70%, transparent 100%)',
                 filter: 'blur(6px)',
                 animation: 'aurapulse 2s ease-in-out infinite',
                 zIndex: -2
               }}>
          </div>
          
          {/* Inner Steady Glow */}
          <div className="absolute inset-0 rounded-full" 
               style={{
                 background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0.2) 60%, transparent 80%)',
                 transform: 'scale(1.3)',
                 filter: 'blur(3px)',
                 zIndex: -1
               }}>
          </div>
          
          {/* Sparkle Effects */}
          <div className="absolute -inset-4 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-300"
                style={{
                  top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                  left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                  animation: `sparkle 3s linear infinite`,
                  animationDelay: `${i * 0.5}s`,
                  fontSize: '8px',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                ✨
              </div>
            ))}
          </div>
        </>
      )}
      
      <div
        className="group cursor-pointer transition-all duration-150 hover:scale-105 relative z-10"
        onClick={handleClick}
        {...handleMouseEvents}
      >
                <div className={`w-28 sm:w-32 h-28 sm:h-32 rounded-full border-2 flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-150 hover:scale-105 active:scale-95 touch-none sm:touch-auto group relative overflow-hidden ring-2 ring-opacity-60 ${
                  certification.featured ? 'ring-yellow-400' : 'ring-[var(--accent)]'
                }`}
             style={{ 
               borderColor: certification.featured ? '#fbbf24' : 'var(--accent)',
               backgroundColor: certification.featured ? 'rgba(251, 191, 36, 0.1)' : 'rgba(var(--accent-rgb), 0.1)',
               boxShadow: certification.featured 
                 ? '0 10px 15px -3px rgba(251, 191, 36, 0.3), 0 4px 6px -2px rgba(251, 191, 36, 0.05)' 
                 : '0 10px 15px -3px rgba(var(--accent-rgb), 0.3), 0 4px 6px -2px rgba(var(--accent-rgb), 0.05)'
             }}>
          {/* Badge Indicator */}
          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
            certification.featured ? 'bg-yellow-400 text-black' : 'text-white'
          }`} style={{
            backgroundColor: certification.featured ? '#fbbf24' : 'var(--accent)'
          }}>
            {certification.featured ? '⭐' : '🏆'}
          </div>
          
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
          <div className={`bg-opacity-95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border max-w-xs w-[250px] sm:w-64 transform transition-all duration-100 ease-out animate-fade-in ring-2 ring-opacity-50 ${
            certification.featured ? 'ring-yellow-400' : 'ring-[var(--accent)]'
          }`}
               onClick={(e) => e.stopPropagation()}
               style={{ 
                 backgroundColor: certification.featured ? 'rgba(251, 191, 36, 0.05)' : 'rgba(var(--accent-rgb), 0.05)',
                 borderColor: certification.featured ? '#fbbf24' : 'var(--accent)',
                 boxShadow: certification.featured 
                   ? '0 20px 25px -5px rgba(251, 191, 36, 0.2), 0 10px 10px -5px rgba(251, 191, 36, 0.1)' 
                   : '0 20px 25px -5px rgba(var(--accent-rgb), 0.2), 0 10px 10px -5px rgba(var(--accent-rgb), 0.1)'
               }}>
            
            {/* Badge Header */}
            <div className={`flex items-center gap-2 mb-3 pb-2 border-b border-opacity-30 ${
              certification.featured ? 'border-yellow-400' : 'border-[var(--accent)]'
            }`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                certification.featured ? 'bg-yellow-400 text-black' : 'text-white'
              }`} style={{
                backgroundColor: certification.featured ? '#fbbf24' : 'var(--accent)'
              }}>
                {certification.featured ? '⭐' : '🏆'}
              </div>
              <span className={`text-xs font-bold tracking-wide ${
                certification.featured ? 'text-yellow-400' : ''
              }`} style={{
                color: certification.featured ? '#fbbf24' : 'var(--accent)'
              }}>
                {certification.featured ? 'FEATURED ACHIEVEMENT' : 'PROFESSIONAL CERTIFICATION'}
              </span>
            </div>
            
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
        
        @keyframes auraGlow {
          0% { opacity: 0.4; transform: scale(1.8) rotate(0deg); }
          50% { opacity: 0.7; transform: scale(2.0) rotate(180deg); }
          100% { opacity: 0.4; transform: scale(1.8) rotate(360deg); }
        }
        
        @keyframes aurapulse {
          0% { opacity: 0.6; transform: scale(1.4); }
          50% { opacity: 0.8; transform: scale(1.5); }
          100% { opacity: 0.6; transform: scale(1.4); }
        }
        
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Badge;