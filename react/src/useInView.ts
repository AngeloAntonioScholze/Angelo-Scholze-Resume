import { useEffect, useRef, useState } from 'react';

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(reducedMotion);

  useEffect(() => {
    if (inView || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setInView(true);
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView]);

  return { ref, inView };
}

export function useReveal<T extends HTMLElement>(base = '') {
  const { ref, inView } = useInView<T>();
  return { ref, className: `${base} reveal${inView ? ' go' : ''}`.trim() };
}
