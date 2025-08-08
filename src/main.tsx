import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ComponentPreloader, ResourceHints, PerformanceMonitor } from './utils'

// Initialize performance optimizations
ResourceHints.setupResourceHints();
PerformanceMonitor.monitorWebVitals();

// Setup intelligent preloading
const cleanupPreloading = ComponentPreloader.setupIntelligentPreloading();

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupPreloading);

// Preload critical components after initial render
setTimeout(() => {
  ComponentPreloader.preloadCriticalComponents();
}, 1000);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
