import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    // Use IntersectionObserver for more reliable section visibility detection
    const observers: IntersectionObserver[] = [];
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0% -40% 0%', // focus on center area of viewport
      threshold: 0.01,
    };

  const callback = (entries: any[]) => {
      // pick the entry that's intersecting and closest to the center (highest intersectionRatio)
      let bestEntry: any = null;
      entries.forEach(entry => {
        if (!bestEntry) {
          if (entry.isIntersecting) bestEntry = entry;
        } else if (entry.isIntersecting && entry.intersectionRatio > (bestEntry.intersectionRatio ?? 0)) {
          bestEntry = entry;
        }
      });

      if (bestEntry && bestEntry.isIntersecting) {
        const target = bestEntry.target as HTMLElement | null;
        if (target && target.id) setActiveSection(target.id);
      }
    };

    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        const obs = new IntersectionObserver(callback, options);
        obs.observe(el);
        observers.push(obs);
      }
    });

    // Fallback: set initial section based on scroll position
    const initial = navItems.slice().reverse().find(it => {
      const el = document.getElementById(it.id);
      return el && el.getBoundingClientRect().top <= window.innerHeight / 2;
    });
    if (initial) setActiveSection(initial.id);

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-opacity-30" 
         style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold terminal-prompt" style={{ color: 'var(--accent)' }}>
              AlBaraa.dev
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 lg:space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'glow-border'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    color: activeSection === item.id ? 'var(--accent)' : 'var(--text-primary)',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="flex items-center gap-2">
              <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="p-3 rounded-md transition-all duration-300 hover:bg-opacity-10 hover:bg-current active:scale-95"
              style={{ color: 'var(--text-primary)' }}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        role="menu"
        aria-hidden={!isOpen}
        className={`md:hidden backdrop-blur-md border-t border-opacity-30 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}
      >
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full px-4 py-3 rounded-md text-base font-medium text-left transition-all duration-300 hover:bg-opacity-10 hover:bg-current active:scale-98 ${
                  activeSection === item.id ? 'glow-border' : ''
                }`}
                style={{
                  color: activeSection === item.id ? 'var(--accent)' : 'var(--text-primary)',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;