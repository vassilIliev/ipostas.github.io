import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the user is on a mobile device
 * @returns {boolean} true if mobile, false if desktop/tablet
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check for mobile screen size (768px and below)
      const isMobileScreen = window.matchMedia('(max-width: 768px)').matches;
      
      // Check for touch capability (additional mobile indicator)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Consider it mobile if it's a small screen OR touch device with small screen
      setIsMobile(isMobileScreen && (isTouchDevice || window.innerWidth <= 768));
    };

    // Check on mount
    checkIsMobile();

    // Listen for resize events
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', checkIsMobile);

    return () => {
      mediaQuery.removeEventListener('change', checkIsMobile);
    };
  }, []);

  return isMobile;
};
