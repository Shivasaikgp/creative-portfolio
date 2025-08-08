import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Layout, SkeletonLoader, SEO } from './components';
import { personalInfo, skillsData, experienceData, projectsData, educationData, certificationsData, leadershipData, contactData } from './data';
import type { ContactFormData } from './components/ContactForm';

// Lazy load components for code splitting
const Hero = lazy(() => import('./components/Hero'));
const Skills = lazy(() => import('./components/Skills'));
const ExperienceTimeline = lazy(() => import('./components/ExperienceTimeline'));
const Projects = lazy(() => import('./components/Projects'));
const GitHubSection = lazy(() => import('./components/GitHubSection'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  // Handle contact form submission
  const handleContactFormSubmit = async (formData: ContactFormData): Promise<void> => {
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, you would send this data to your backend
    console.log('Contact form submitted:', formData);
    
    // For demo purposes, we'll just log the data
    // In production, you might want to:
    // 1. Send to a backend API
    // 2. Use a service like EmailJS
    // 3. Integrate with a form handling service like Formspree
    
    // Simulate success (you can also simulate errors for testing)
    if (Math.random() > 0.1) { // 90% success rate
      return Promise.resolve();
    } else {
      throw new Error('Failed to send message');
    }
  };

  return (
    <HelmetProvider>
      <SEO />
      <Layout>
        {/* Hero Section */}
        <Suspense fallback={<SkeletonLoader variant="hero" />}>
          <Hero personalInfo={personalInfo} />
        </Suspense>

        {/* Skills Section */}
        <Suspense fallback={<SkeletonLoader variant="skills" />}>
          <Skills skillCategories={skillsData} />
        </Suspense>

        {/* Experience Section */}
        <Suspense fallback={<SkeletonLoader variant="experience" />}>
          <ExperienceTimeline experiences={experienceData} />
        </Suspense>

        {/* Projects Section */}
        <Suspense fallback={<SkeletonLoader variant="projects" />}>
          <Projects projects={projectsData} />
        </Suspense>

        {/* GitHub Section */}
        <Suspense fallback={<SkeletonLoader variant="skills" />}>
          <GitHubSection />
        </Suspense>

        {/* Education Section */}
        <Suspense fallback={<SkeletonLoader variant="education" />}>
          <Education education={educationData} certifications={certificationsData} leadershipPositions={leadershipData} />
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<SkeletonLoader variant="contact" />}>
          <Contact contactInfo={contactData} onFormSubmit={handleContactFormSubmit} />
        </Suspense>
      </Layout>
    </HelmetProvider>
  )
}

export default App
