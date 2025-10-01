import React, { useState, useEffect, useRef } from 'react';

const About: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showElements, setShowElements] = useState({
    title: false,
    subtitle: false,
    codeBlock: false,
    status: false
  });
  const sectionRef = useRef<HTMLElement>(null);

  const codeContent = `{
  "role": "Computer Vision Explorer",
  "specialization": "AI & Machine Learning",
  "location": "United Arab Emirates",
  "mainSkills": [
    "Computer Vision",
    "Deep Learning",
    "Python",
    "TensorFlow"
  ],
  "achievements": [
    "Published Researcher",
    "AI Innovator",
    "CS50x Graduate"
  ],
  "currentQuest": "Building intelligent systems that see the world"
}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Staggered animation timeline
          const timeline = [
            { element: 'title', delay: 100 },
            { element: 'subtitle', delay: 200 },
            { element: 'codeBlock', delay: 100 },
            { element: 'status', delay: 2000 }
          ];

          timeline.forEach(({ element, delay }) => {
            setTimeout(() => {
              setShowElements(prev => ({ ...prev, [element]: true }));
            }, delay);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const chunkSize = 5; // Larger chunks for faster typing
    const typeInterval = setInterval(() => {
      if (index <= codeContent.length) {
        setDisplayedCode(codeContent.slice(0, index));
        index += chunkSize;
      } else {
        setDisplayedCode(codeContent);
        clearInterval(typeInterval);
      }
    }, 10); // Even faster interval

    return () => clearInterval(typeInterval);
  }, [isVisible]);

  const highlightSyntax = (code: string) => {
    return code
      .replace(/"([^"]*)":/g, '<span style="color: #93c5fd;">"$1"</span>:') // Lighter blue for keys
      .replace(/: "([^"]*)"/g, ': <span style="color: #6ee7b7;">"$1"</span>') // Brighter green for values
      .replace(/\[|\]|{|}/g, '<span style="color: #fcd34d;">$&</span>'); // Consistent yellow for brackets
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-10 sm:py-20"
      style={{ scrollMarginTop: '4rem' }}
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 transition-all duration-700 ${
          showElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              ./whoami
            </span>
          </h2>
          <p className={`text-xl transition-all duration-700 delay-300 ${
            showElements.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ color: 'var(--text-secondary)' }}>
            Computer Vision Explorer & AI Enthusiast
          </p>
        </div>

        <div className={`code-block w-full max-w-3xl mx-auto overflow-hidden transition-all duration-1000 ${
          showElements.codeBlock ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-opacity-30" style={{ borderColor: 'var(--border)' }}>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              profile.json
            </span>
          </div>
          
          <pre className="text-xs sm:text-sm md:text-base leading-relaxed p-2 sm:p-4 whitespace-pre-wrap break-words">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightSyntax(displayedCode)
              }}
              style={{ color: 'var(--text-primary)' }}
            />
            {isVisible && displayedCode.length < codeContent.length && (
              <span className="animate-blink ml-1" style={{ color: 'var(--accent)' }}>|</span>
            )}
          </pre>
        </div>

        <div className={`text-center mt-8 transition-all duration-700 ${
          showElements.status ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Status: Ready for new adventures
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;