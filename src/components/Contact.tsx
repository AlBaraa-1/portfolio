import React, { useState, useEffect, useRef } from 'react';
import { Send, Linkedin, Github, Mail, Terminal } from 'lucide-react';

import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_7ih1kvr';
const EMAILJS_TEMPLATE_ID = 'template_bwjowpe';
const EMAILJS_PUBLIC_KEY = 'XyP-kutZ_-CJmS3qi';

const Contact: React.FC = () => {
  const [showElements, setShowElements] = useState({
    title: false,
    description: false,
    terminal: false,
    form: false
  });
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '> Terminal initialized...',
    '> Type "help" to see all available commands',
    '> Ready for input'
  ]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Staggered animation timeline
          const timeline = [
            { element: 'title', delay: 200 },
            { element: 'description', delay: 500 },
            { element: 'terminal', delay: 800 },
            { element: 'form', delay: 1100 }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const newOutput = [...terminalOutput, `> ${command}`];

    // Handle clear command first (special case)
    if (cmd === 'clear') {
      setTerminalOutput(['> Terminal cleared']);
      return;
    }

    // Handle help command
    if (cmd === 'help') {
      newOutput.push(`Available commands:
  connect --linkedin    Open LinkedIn profile
  connect --github     Open GitHub profile
  connect --email      Open email client
  show-form           Display contact form
  hide-form           Hide contact form
  clear               Clear terminal
  help                Show this help message`);
      setTerminalOutput(newOutput);
      return;
    }

    // Handle connect commands
    if (cmd.startsWith('connect')) {
      const arg = cmd.split('--')[1];
      switch (arg) {
        case 'linkedin':
          newOutput.push('Opening LinkedIn profile...');
          setTimeout(() => window.open('http://www.linkedin.com/in/albaraa-alolabi-0693b5278', '_blank'), 500);
          break;
        case 'github':
          newOutput.push('Opening GitHub profile...');
          setTimeout(() => window.open('https://github.com/AlBaraa-1', '_blank'), 500);
          break;
        case 'email':
          newOutput.push('Opening email client...');
          setTimeout(() => window.location.href = 'mailto:666645@gmail.com', 500);
          break;
        default:
          newOutput.push('Invalid connect command. Available options: --linkedin, --github, --email');
          newOutput.push('Example: connect --linkedin');
      }
    }
    // Handle show-form command
    else if (cmd === 'show-form') {
      newOutput.push('Opening contact form...');
      setShowMessageForm(true);
      setTimeout(() => {
        const formElement = document.querySelector('input[name="name"]') as HTMLInputElement;
        if (formElement) {
          formElement.focus();
        }
      }, 500);
    } else if (cmd === 'hide-form') {
      newOutput.push('Hiding contact form...');
      setShowMessageForm(false);
    }
    // Handle unknown commands
    else {
      newOutput.push(`Command not found: ${cmd}`);
      newOutput.push('Type "help" for available commands');
    }

    setTerminalOutput(newOutput);
    
    setTerminalOutput(newOutput);
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const newOutput = [...terminalOutput];
      newOutput.push('> send-message --submit');
      newOutput.push('❌ Form validation failed. Please check your inputs.');
      setTerminalOutput(newOutput);
      return;
    }

    setIsSubmitting(true);
    const newOutput = [...terminalOutput];
    newOutput.push('> send-message --submit');
    newOutput.push('Sending message...');
    
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      newOutput.push('Message sent successfully! ✅');
      newOutput.push('Thank you for reaching out. I\'ll get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error sending message:', error);
      newOutput.push('❌ Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTerminalOutput(newOutput);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
            showElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Terminal Interface
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            showElements.description ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ color: 'var(--text-secondary)' }}>
            Execute commands to connect with me or send a message through the terminal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 relative items-start">
          {/* Terminal Interface */}
          <div className={`code-block transition-all duration-700 ${
            showElements.terminal ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          } ${!showMessageForm ? 'lg:col-span-2 lg:max-w-xl lg:mx-auto w-full' : 'lg:max-w-full'}`}>
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-opacity-30" 
                 style={{ borderColor: 'var(--border)' }}>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <Terminal className="ml-4 w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                contact_terminal
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleCommand('connect --linkedin')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </button>
              
              <button
                onClick={() => handleCommand('connect --github')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                <Github className="w-4 h-4" />
                GitHub
              </button>
              
              <button
                onClick={() => handleCommand('connect --email')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              
              <button
                onClick={() => handleCommand(showMessageForm ? 'hide-form' : 'show-form')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-primary)'
                }}
              >
                <Send className="w-4 h-4" />
                {showMessageForm ? 'Hide Form' : 'Show Form'}
              </button>
            </div>

            {/* Command Hint */}
            <div className="mb-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Try: <span style={{ color: 'var(--accent)' }}>connect --linkedin</span>, <span style={{ color: 'var(--accent)' }}>show-form</span>, <span style={{ color: 'var(--accent)' }}>help</span>
            </div>

            {/* Terminal Output */}
            <div className={`bg-black bg-opacity-50 rounded-lg p-4 overflow-y-auto font-mono text-sm transition-all duration-700 ${
              !showMessageForm ? 'h-[200px]' : 'h-[calc(100vh*0.3)] max-h-[300px] min-h-[200px]'
            }`}>
              <div className="h-full flex flex-col">
                <div 
                  className="flex-1 overflow-y-auto scroll-smooth"
                  ref={(el) => {
                    // Auto scroll to bottom when content changes
                    if (el) {
                      el.scrollTo({
                        top: el.scrollHeight,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {terminalOutput.map((line, index) => (
                    <div 
                      key={index} 
                      className="mb-1" 
                      style={{ 
                        color: line.startsWith('> ') && !line.startsWith('> Terminal') && !line.startsWith('> Type') && !line.startsWith('> Ready') 
                          ? 'var(--accent)' 
                          : 'var(--terminal-green)' 
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem('command') as HTMLInputElement;
                    const command = input.value.trim();
                    if (command) {
                      handleCommand(command);
                      input.value = '';
                    }
                  }}
                  className="flex items-center mt-2"
                >
                  <span style={{ color: 'var(--accent)' }}>&gt; </span>
                  <input
                    type="text"
                    name="command"
                    className="flex-1 ml-2 bg-transparent border-none outline-none"
                    style={{ color: 'var(--terminal-green)' }}
                    placeholder="Type a command..."
                    autoComplete="off"
                    spellCheck="false"
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`code-block transition-all duration-700 ${
            showMessageForm ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 hidden'
          }`}>
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-opacity-30" 
                 style={{ borderColor: 'var(--border)' }}>
              <Send className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                send_message.form
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 terminal-prompt" 
                       style={{ color: 'var(--accent)' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg border bg-transparent transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  style={{ 
                    borderColor: errors.name ? 'rgb(239, 68, 68)' : 'var(--border)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-primary)'
                  }}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 terminal-prompt" 
                       style={{ color: 'var(--accent)' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg border bg-transparent transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  style={{ 
                    borderColor: errors.email ? 'rgb(239, 68, 68)' : 'var(--border)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-primary)'
                  }}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 terminal-prompt" 
                       style={{ color: 'var(--accent)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border bg-transparent transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                  style={{ 
                    borderColor: errors.message ? 'rgb(239, 68, 68)' : 'var(--border)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-primary)'
                  }}
                  placeholder="Enter your message"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                <span>&gt;</span>
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;