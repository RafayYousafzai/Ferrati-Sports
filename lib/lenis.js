import Lenis from "@studio-freight/lenis";

export const initLenis = () => {
  const lenis = new Lenis({
    easing: (t) => t * 10, // linear smoothness
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
};
