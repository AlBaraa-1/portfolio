import React, { useEffect, useRef, useState } from 'react';
import { Download, Save } from 'lucide-react';

const Resume: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [glitchText, setGlitchText] = useState('???');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const glitchCharacters = '!<>-_\\/%^#@&*+=[]{}~`';
    const baseText = '[REDACTED]';
    let interval: NodeJS.Timeout;

    if (isVisible) {
      interval = setInterval(() => {
        const shouldGlitch = Math.random() < 0.7;
        if (shouldGlitch) {
          const glitched = baseText
            .split('')
            .map(char => 
              Math.random() < 0.3 
                ? glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)]
                : char
            )
            .join('');
          setGlitchText(glitched);
        } else {
          setGlitchText(baseText);
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isVisible]);

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

  const handleDownload = () => {
    const fileId = '1uArFKF3qpZpoA577kaPZgqUBYmvhMjyr';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'AlBaraa_Alolabi_Resume.pdf'); // Set the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" ref={sectionRef} className="relative py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Save Game
            </span>
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Download my complete professional profile and experience documentation.
          </p>
        </div>

        {/* Retro Game Save Interface */}
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="code-block max-w-2xl mx-auto">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6 p-3 sm:p-4 border-b border-opacity-30" 
                 style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 sm:ml-4 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                save_game_terminal.exe
              </span>
            </div>

            {/* Game Save Content */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Save className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
                  Game Save Available
                </span>
              </div>
              
              <div className="ml-4 sm:ml-8 space-y-2 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="font-mono">📄 Player Profile: AlBaraa AlOlabi</div>
                <div className="font-mono">🎓 Class: Computer Science</div>
                <div className="font-mono">⚔️ Main Quest: AI & Computer Vision</div>
                <div className="font-mono">🎯 Side Quests: [{Math.floor(Math.random() * 3) + 8}] Active</div>
                <div className="flex items-center gap-2 font-mono">⭐ Character Level: <span 
                  style={{
                    color: 'var(--accent)',
                  }}
                >{glitchText}</span></div>
                <div className="font-mono border-t border-opacity-30 mt-4 pt-2" style={{ borderColor: 'var(--border)' }}>
                  📝 File Size: 2.4 MB  |  💾 Last Save: {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
                  Ready to download save file?
                </span>
                <span className="animate-blink" style={{ color: 'var(--accent)' }}>|</span>
              </div>

              {/* Download Button */}
              <div className="text-center mt-6 sm:mt-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleDownload}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ 
                      borderColor: 'var(--accent)',
                      color: 'var(--accent)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Download className="w-5 sm:w-6 h-5 sm:h-6 group-hover:animate-bounce" />
                    <span>📄</span> Save Resume
                  </button>
                  <button
                    onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ 
                      borderColor: 'var(--accent)',
                      color: 'var(--accent)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <span>👁️</span> {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className={`mt-8 sm:mt-12 md:mt-16 transition-all duration-500 ${isPreviewVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0 overflow-hidden'}`}>
          <div className="max-w-4xl mx-auto rounded-lg border-2 border-dashed p-3 sm:p-4 transition-all duration-300 hover:scale-[1.02]"
               style={{ borderColor: 'var(--accent)' }}>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-center" style={{ color: 'var(--text-primary)' }}>
              Resume Preview
            </h3>
            <div className="relative w-full" style={{ paddingTop: '141.4%' }}> {/* Aspect ratio for A4 */}
              <iframe
                src="https://drive.google.com/file/d/1uArFKF3qpZpoA577kaPZgqUBYmvhMjyr/preview"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing for arrow */}
      <div className="mt-16"></div>

      {/* Scroll Indicator - Arrow to Contact */}
      <button
        onClick={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        aria-label="Scroll to contact"
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

export default Resume;