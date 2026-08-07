import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { Directive } from 'vue';

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const OPTIONS: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -10% 0px' };

export function useInView() {
  const el = ref<HTMLElement | null>(null);
  const inView = ref(reducedMotion());
  let io: IntersectionObserver | null = null;

  onMounted(() => {
    if (inView.value || !el.value) return;
    io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        inView.value = true;
        io?.disconnect();
      }
    }, OPTIONS);
    io.observe(el.value);
  });

  onBeforeUnmount(() => io?.disconnect());

  return { el, inView };
}

const observers = new WeakMap<HTMLElement, IntersectionObserver>();

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('reveal');
    if (reducedMotion()) {
      el.classList.add('go');
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        el.classList.add('go');
        io.disconnect();
      }
    }, OPTIONS);
    io.observe(el);
    observers.set(el, io);
  },
  unmounted(el) {
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};
