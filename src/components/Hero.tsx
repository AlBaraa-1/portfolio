import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

const Hero: React.FC = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [showElements, setShowElements] = useState({
    pressStart: false,
    title: false,
    subtitle: false,
    buttons: false
  });
  const fullText = "I build intelligent systems that see the world";

  useEffect(() => {
    // Staggered animation timeline
    const timeline = [
      { element: 'pressStart', delay: 800 },
      { element: 'title', delay: 300 },
      { element: 'subtitle', delay: 100 },
      { element: 'buttons', delay: 500 }
    ];

    timeline.forEach(({ element, delay }) => {
      setTimeout(() => {
        setShowElements(prev => ({ ...prev, [element]: true }));
      }, delay);
    });

    const timer = setTimeout(() => setShowTypewriter(true), 1000);
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
    }, 50);

    return () => clearInterval(typeInterval);
  }, [showTypewriter]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // resume section removed — kept simple scroll-to-about behavior

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 sm:py-0">
      <div className="text-center z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Press Start Animation */}
        <div className={`mb-6 sm:mb-8 transition-all duration-700 ${
          showElements.pressStart ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <span className="text-xl sm:text-2xl md:text-3xl font-mono animate-blink" style={{ color: 'var(--accent)' }}>
            &gt; Press Start
          </span>
        </div>

        {/* Main Title */}
        <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight transition-all duration-700 ${
          showElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
            Hi, I'm AlBaraa
          </span>
          <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mt-2 sm:mt-0 block sm:inline">
            Computer Vision Explorer
          </span>
        </h1>

        {/* Typewriter Subtitle */}
        <div className={`mb-8 sm:mb-12 h-16 sm:h-20 flex items-center justify-center px-2 sm:px-4 transition-all duration-700 ${
          showElements.subtitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <p className="text-lg sm:text-xl md:text-2xl font-mono" style={{ color: 'var(--text-secondary)' }}>
            {typewriterText}
            {showTypewriter && (
              <span className="animate-blink ml-1" style={{ color: 'var(--accent)' }}>|</span>
            )}
          </p>
        </div>

        {/* CTA Button (Start) */}
        <div className={`flex justify-center mt-8 sm:mt-12 lg:mt-16 transition-all duration-700 ${
          showElements.buttons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={scrollToAbout}
            className="group w-full sm:w-1/2 md:w-1/3 flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-lg font-semibold text-base sm:text-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ 
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
              backgroundColor: 'transparent'
            }}
          >
            <Play className="w-5 sm:w-6 h-5 sm:h-6 group-hover:animate-pulse" />
             Start
          </button>
        </div>

        {/* Scroll Indicator - Arrow */}
        <button
          onClick={scrollToAbout}
          aria-label="Scroll to about"
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
      </div>
    </section>
  );
};

export default Hero;