import { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { Download, Mail, Github, Linkedin } from 'lucide-react';
import { useParallax } from '../hooks';
import LazyImage from './LazyImage';

interface HeroProps {
  personalInfo: {
    name: string;
    title: string;
    tagline: string;
    profileImage: string;
    resumeUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    email: string;
  };
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const texts = [
    'Software Engineer',
    'Full Stack Developer',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  // Parallax scroll values
  const scrollY = useParallax();
  const y1 = useTransform(useMotionValue(scrollY), [0, 1000], [0, -200]);
  const y2 = useTransform(useMotionValue(scrollY), [0, 1000], [0, -100]);
  const y3 = useTransform(useMotionValue(scrollY), [0, 1000], [0, -50]);
  const opacity = useTransform(useMotionValue(scrollY), [0, 300], [1, 0]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  // Enhanced floating particles with parallax
  const particles = Array.from({ length: 30 }, (_, i) => {
    const size = Math.random() * 4 + 2;
    const initialX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200);
    const initialY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800);
    
    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: `rgba(${i % 2 === 0 ? '37, 99, 235' : '249, 115, 22'}, ${Math.random() * 0.3 + 0.1})`,
          x: initialX + mousePosition.x * (i % 3),
          y: initialY + mousePosition.y * (i % 3),
        }}
        animate={{
          x: [initialX - 50, initialX + 50, initialX - 50],
          y: [initialY - 30, initialY + 30, initialY - 30],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: Math.random() * 8 + 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 2,
        }}
      />
    );
  });

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50"
      aria-label="Hero section - Introduction"
    >
      {/* Parallax Background Layers */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: y1, opacity }}
      >
        {/* Background gradient with parallax */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-transparent to-secondary-100/50" />
        
        {/* Enhanced floating particles with mouse interaction */}
        {particles}
      </motion.div>

      {/* Mid-layer geometric shapes with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: y2 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-primary-300/30 rounded-full"
          animate={{ 
            rotate: 360,
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            x: { duration: 0.5 },
            y: { duration: 0.5 }
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-400/20 rounded-lg"
          animate={{ 
            rotate: -360, 
            scale: [1, 1.2, 1],
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: 0.8 },
            y: { duration: 0.8 }
          }}
        />
        <motion.div
          className="absolute top-1/2 left-20 w-12 h-12 border-2 border-secondary-300/30"
          animate={{ 
            rotate: 45, 
            y: [-10, 10, -10],
            x: mousePosition.x * 1,
          }}
          transition={{ 
            rotate: { duration: 0.5 },
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: 0.6 }
          }}
        />
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-primary-400/10 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            x: mousePosition.x * 3,
            y: mousePosition.y * 3,
          }}
          transition={{
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: 0.4 },
            y: { duration: 0.4 }
          }}
        />
      </motion.div>

      {/* Main content with subtle parallax */}
      <motion.div 
        className="relative z-10 container-responsive text-center"
        style={{ y: y3 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Profile Image with 3D effects */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="relative inline-block perspective-1000">
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 15,
                  rotateX: 5,
                  z: 50
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative transform-gpu"
                style={{
                  x: mousePosition.x * 0.5,
                  y: mousePosition.y * 0.5,
                }}
              >
                <motion.div
                  className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto"
                  whileHover={{ 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                  }}
                >
                  <LazyImage
                    src={personalInfo.profileImage}
                    alt={`Professional headshot of ${personalInfo.name}, Software Engineer from IIT Kharagpur`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Enhanced gradient overlay */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-secondary-500/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Glowing effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-400/30 to-secondary-400/30 blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
              
              {/* Multiple floating rings with different speeds */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-400/30"
                animate={{ 
                  rotate: 360, 
                  scale: [1, 1.15, 1],
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-secondary-400/20"
                animate={{ 
                  rotate: -360, 
                  scale: [1.1, 1, 1.1],
                }}
                transition={{ 
                  rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                }}
              />
            </div>
          </motion.div>

          {/* Enhanced Name and Title with 3D text effects */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-gradient mb-4"
              style={{
                x: mousePosition.x * 0.2,
                y: mousePosition.y * 0.2,
              }}
              whileHover={{
                scale: 1.02,
                textShadow: '0 0 20px rgba(37, 99, 235, 0.3)',
              }}
              transition={{ duration: 0.3 }}
              role="heading"
              aria-level={1}
            >
              {personalInfo.name.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.05,
                    ease: 'easeOut'
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
            
            {/* Enhanced Typewriter Effect with glow */}
            <div className="h-12 md:h-16 flex items-center justify-center mb-6">
              <motion.h2 
                className="text-xl md:text-2xl lg:text-3xl text-slate-600 font-medium"
                style={{
                  x: mousePosition.x * 0.1,
                  y: mousePosition.y * 0.1,
                }}
                role="heading"
                aria-level={2}
                aria-live="polite"
                aria-label={`Current role: ${currentText}`}
              >
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentText}
                </motion.span>
                <motion.span
                  animate={{ 
                    opacity: [1, 0],
                    scaleY: [1, 1.2, 1]
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' },
                    scaleY: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' }
                  }}
                  className="inline-block w-0.5 h-6 md:h-8 bg-gradient-to-b from-primary-500 to-secondary-500 ml-1 shadow-lg"
                  aria-hidden="true"
                />
              </motion.h2>
            </div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{
                x: mousePosition.x * 0.05,
                y: mousePosition.y * 0.05,
              }}
              whileHover={{
                scale: 1.02,
                color: '#475569',
              }}
            >
              {personalInfo.tagline}
            </motion.p>
          </motion.div>

          {/* Enhanced Action Buttons with magnetic effect */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4"
            style={{ opacity }}
          >
            <motion.a
              href={personalInfo.resumeUrl}
              download
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.3), 0 10px 10px -5px rgba(37, 99, 235, 0.1)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 px-6 py-3 text-base sm:text-lg font-medium rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 touch-manipulation w-full sm:w-auto justify-center"
              style={{
                x: mousePosition.x * 0.3,
                y: mousePosition.y * 0.3,
                minHeight: '48px'
              }}
              aria-label={`Download ${personalInfo.name}'s resume (PDF)`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div className="relative z-10 flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Download size={20} />
                </motion.div>
                Download Resume
              </motion.div>
            </motion.a>
            
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.1)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 px-6 py-3 text-base sm:text-lg font-medium rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 touch-manipulation w-full sm:w-auto justify-center"
              style={{
                x: mousePosition.x * 0.3,
                y: mousePosition.y * 0.3,
                minHeight: '48px'
              }}
              aria-label={`Send email to ${personalInfo.email}`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary-400 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div className="relative z-10 flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail size={20} />
                </motion.div>
                Get In Touch
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Enhanced Social Links with orbital animation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-4 sm:gap-6"
            style={{ opacity }}
          >
            <motion.a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.3, 
                y: -8,
                rotate: 360,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
              }}
              whileTap={{ scale: 0.9 }}
              className="p-3 sm:p-4 bg-white rounded-full shadow-lg transition-all duration-300 text-slate-600 hover:text-primary-600 relative group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 touch-manipulation"
              style={{
                x: mousePosition.x * 0.2,
                y: mousePosition.y * 0.2,
                minWidth: '48px',
                minHeight: '48px'
              }}
              aria-label={`Visit ${personalInfo.name}'s GitHub profile (opens in new tab)`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div className="relative z-10">
                <Github size={24} />
              </motion.div>
            </motion.a>
            
            <motion.a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.3, 
                y: -8,
                rotate: -360,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
              }}
              whileTap={{ scale: 0.9 }}
              className="p-3 sm:p-4 bg-white rounded-full shadow-lg transition-all duration-300 text-slate-600 hover:text-primary-600 relative group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 touch-manipulation"
              style={{
                x: mousePosition.x * 0.2,
                y: mousePosition.y * 0.2,
                minWidth: '48px',
                minHeight: '48px'
              }}
              aria-label={`Visit ${personalInfo.name}'s LinkedIn profile (opens in new tab)`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div className="relative z-10">
                <Linkedin size={24} />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator with fade on scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ 
          opacity: useTransform(useMotionValue(scrollY), [0, 200], [1, 0])
        }}
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center cursor-pointer group hover:border-primary-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 bg-transparent"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll down to about section"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-slate-400 rounded-full mt-2 group-hover:bg-primary-500 transition-colors duration-300"
            aria-hidden="true"
          />
        </motion.button>
        
        {/* Scroll text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-xs text-slate-400 mt-2 text-center group-hover:text-primary-500 transition-colors duration-300"
        >
          Scroll
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;