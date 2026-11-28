// Vídeos do produto: carregam e tocam só quando aparecem na tela, e pausam ao sair.
const videos = document.querySelectorAll("[data-pvideo]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const economia = navigator.connection?.saveData === true;

if (videos.length && !reduzir && !economia && "IntersectionObserver" in window) {
  const carregar = (v) => {
    if (v.dataset.loaded) return;
    v.querySelectorAll("source[data-src]").forEach((s) => (s.src = s.dataset.src));
    v.load();
    v.dataset.loaded = "1";
  };
  const io = new IntersectionObserver(
    (entradas) => {
      entradas.forEach(({ target: v, isIntersecting }) => {
        if (isIntersecting) {
          carregar(v);
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    },
    { rootMargin: "200px 0px", threshold: 0.25 }
  );
  videos.forEach((v) => io.observe(v));
}
