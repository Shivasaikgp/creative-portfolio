import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react'],
          'react-helmet-async': ['react-helmet-async'],
          
          // Component chunks
          'hero': ['./src/components/Hero.tsx'],
          'skills': ['./src/components/Skills.tsx', './src/components/SkillCategoryCard.tsx', './src/components/SkillItem.tsx'],
          'experience': ['./src/components/ExperienceTimeline.tsx', './src/components/AnimatedCounter.tsx'],
          'projects': ['./src/components/Projects.tsx', './src/components/ProjectCard.tsx', './src/components/ProjectModal.tsx'],
          'education': ['./src/components/Education.tsx'],
          'contact': ['./src/components/Contact.tsx', './src/components/ContactForm.tsx'],
        }
      }
    },
    // Enable source maps for better debugging
    sourcemap: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Additional optimizations
    minify: 'esbuild',
    // Asset optimization
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'react-helmet-async']
  },
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  }
})
