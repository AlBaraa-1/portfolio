import React, { useState, useEffect } from 'react';
import { Play, Download } from 'lucide-react';

const Hero: React.FC = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "I build intelligent systems that see the world";

  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTypewriter) return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [showTypewriter]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToResume = () => {
    const resumeSection = document.getElementById('resume');
    if (resumeSection) {
      resumeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 sm:py-0">
      <div className="text-center z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Press Start Animation */}
        <div className="mb-6 sm:mb-8">
          <span className="text-xl sm:text-2xl md:text-3xl font-mono animate-blink" style={{ color: 'var(--accent)' }}>
            &gt; Press Start
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
            Hi, I'm AlBaraa
          </span>
          <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mt-2 sm:mt-0 block sm:inline">
            Computer Vision Explorer
          </span>
        </h1>

        {/* Typewriter Subtitle */}
        <div className="mb-8 sm:mb-12 h-16 sm:h-20 flex items-center justify-center px-2 sm:px-4">
          <p className="text-lg sm:text-xl md:text-2xl font-mono" style={{ color: 'var(--text-secondary)' }}>
            {typewriterText}
            {showTypewriter && (
              <span className="animate-blink ml-1" style={{ color: 'var(--accent)' }}>|</span>
            )}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <button
            onClick={scrollToAbout}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-lg font-semibold text-base sm:text-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ 
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
              backgroundColor: 'transparent'
            }}
          >
            <Play className="w-5 sm:w-6 h-5 sm:h-6 group-hover:animate-pulse" />
            <span>🎮</span> Enter Portfolio
          </button>
          
          <button
            onClick={scrollToResume}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-lg font-semibold text-base sm:text-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ 
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
              backgroundColor: 'transparent'
            }}
          >
            <Download className="w-6 h-6" />
            <span>👀</span> View Resume
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: 'var(--accent)' }}>
            <div className="w-1 h-3 rounded-full mt-2 animate-pulse" style={{ backgroundColor: 'var(--accent)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;