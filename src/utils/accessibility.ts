/**
 * Accessibility utility functions for color contrast, focus management, and ARIA support
 */

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 guidelines
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: [number, number, number], color2: [number, number, number]): number {
  const l1 = getRelativeLuminance(...color1);
  const l2 = getRelativeLuminance(...color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 * AA: 4.5:1 for normal text, 3:1 for large text
 * AAA: 7:1 for normal text, 4.5:1 for large text
 */
export function meetsContrastRequirement(
  foreground: [number, number, number],
  background: [number, number, number],
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  } else {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  }
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private static focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  /**
   * Get all focusable elements within a container
   */
  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll(this.focusableSelectors));
  }

  /**
   * Trap focus within a container (useful for modals)
   */
  static trapFocus(container: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    // Focus first element
    firstElement?.focus();

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  /**
   * Restore focus to a previously focused element
   */
  static restoreFocus(element: HTMLElement | null): void {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }
}

/**
 * ARIA utilities
 */
export class AriaUtils {
  /**
   * Announce text to screen readers
   */
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  /**
   * Generate unique ID for ARIA relationships
   */
  static generateId(prefix: string = 'aria'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Set up ARIA describedby relationship
   */
  static setDescribedBy(element: HTMLElement, descriptionId: string): void {
    const existingIds = element.getAttribute('aria-describedby') || '';
    const ids = existingIds.split(' ').filter(id => id.length > 0);
    
    if (!ids.includes(descriptionId)) {
      ids.push(descriptionId);
      element.setAttribute('aria-describedby', ids.join(' '));
    }
  }

  /**
   * Remove ARIA describedby relationship
   */
  static removeDescribedBy(element: HTMLElement, descriptionId: string): void {
    const existingIds = element.getAttribute('aria-describedby') || '';
    const ids = existingIds.split(' ').filter(id => id !== descriptionId);
    
    if (ids.length > 0) {
      element.setAttribute('aria-describedby', ids.join(' '));
    } else {
      element.removeAttribute('aria-describedby');
    }
  }
}

/**
 * Keyboard navigation utilities
 */
export class KeyboardNavigation {
  /**
   * Handle arrow key navigation in a list
   */
  static handleArrowNavigation(
    e: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' = 'vertical'
  ): number {
    const isVertical = orientation === 'vertical';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

    if (e.key === nextKey) {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex]?.focus();
      return nextIndex;
    } else if (e.key === prevKey) {
      e.preventDefault();
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      items[prevIndex]?.focus();
      return prevIndex;
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
      return 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      const lastIndex = items.length - 1;
      items[lastIndex]?.focus();
      return lastIndex;
    }

    return currentIndex;
  }

  /**
   * Handle escape key to close modals/dropdowns
   */
  static handleEscape(e: KeyboardEvent, callback: () => void): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      callback();
    }
  }
}

/**
 * Screen reader utilities
 */
export class ScreenReaderUtils {
  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Check if user is using a screen reader
   */
  static isUsingScreenReader(): boolean {
    // This is a heuristic and not 100% accurate
    return (
      navigator.userAgent.includes('NVDA') ||
      navigator.userAgent.includes('JAWS') ||
      navigator.userAgent.includes('VoiceOver') ||
      window.speechSynthesis?.getVoices().length > 0
    );
  }

  /**
   * Format text for screen readers
   */
  static formatForScreenReader(text: string): string {
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces between camelCase
      .replace(/([0-9])([a-zA-Z])/g, '$1 $2') // Add spaces between numbers and letters
      .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }
}

/**
 * Validation for accessibility compliance
 */
export class AccessibilityValidator {
  /**
   * Check if element has proper heading hierarchy
   */
  static validateHeadingHierarchy(container: HTMLElement): string[] {
    const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const errors: string[] = [];
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        errors.push('First heading should be h1');
      }
      
      if (level > previousLevel + 1) {
        errors.push(`Heading level jumps from h${previousLevel} to h${level} - should be sequential`);
      }
      
      previousLevel = level;
    });

    return errors;
  }

  /**
   * Check if images have alt text
   */
  static validateImageAltText(container: HTMLElement): string[] {
    const images = Array.from(container.querySelectorAll('img'));
    const errors: string[] = [];

    images.forEach((img, index) => {
      if (!img.hasAttribute('alt')) {
        errors.push(`Image ${index + 1} is missing alt attribute`);
      } else if (img.getAttribute('alt') === '') {
        // Empty alt is okay for decorative images, but should be intentional
        if (!img.hasAttribute('role') || img.getAttribute('role') !== 'presentation') {
          console.warn(`Image ${index + 1} has empty alt text - ensure this is decorative`);
        }
      }
    });

    return errors;
  }

  /**
   * Check if form inputs have labels
   */
  static validateFormLabels(container: HTMLElement): string[] {
    const inputs = Array.from(container.querySelectorAll('input, select, textarea'));
    const errors: string[] = [];

    inputs.forEach((input, index) => {
      const hasLabel = input.hasAttribute('aria-label') || 
                      input.hasAttribute('aria-labelledby') ||
                      container.querySelector(`label[for="${input.id}"]`) ||
                      input.closest('label');

      if (!hasLabel) {
        errors.push(`Form input ${index + 1} (${input.tagName.toLowerCase()}) is missing a label`);
      }
    });

    return errors;
  }
}