import { useEffect, useState } from 'react';

/** Reports whether the viewport is currently in landscape orientation. */
export function useOrientation(): { isLandscape: boolean } {
  const [isLandscape, setIsLandscape] = useState(
    typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : false,
  );

  useEffect(() => {
    const onResize = () => setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return { isLandscape };
}
