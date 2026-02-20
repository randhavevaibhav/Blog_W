import { useState, useEffect } from 'react';

export const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Define the media query
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    // Initial check
    setIsMobile(mql.matches);

    // Listener for changes
    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handleChange);

    // Cleanup
    return () => mql.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isMobile;
};
