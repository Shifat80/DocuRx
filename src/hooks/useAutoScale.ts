import { RefObject, useEffect, useState } from 'react';

/**
 * Scales a fixed-size child (e.g. an 8.5in x 11in page rendered at CSS
 * pixel size) down to fit inside its container, without ever scaling up.
 */
export function useAutoScale(
  containerRef: RefObject<HTMLElement>,
  contentWidthPx: number
): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recalc = () => {
      const available = container.clientWidth;
      setScale(Math.min(1, available / contentWidthPx));
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, contentWidthPx]);

  return scale;
}
