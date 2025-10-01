// React import not required with the new JSX transform
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import GitHubActivity from './components/GitHubActivity';
import Research from './components/Research';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import Contact from './components/Contact';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <About />
        <Projects />
        <GitHubActivity />
        <Research />
        <Certifications />
        <Resume />
        <Contact />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
