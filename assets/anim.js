/* NOMBRILL : animations (apparition au défilement, titres, compteurs, en-tête). */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var top = document.querySelector(".top");
  function onScroll() {
    if (top) top.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Titre principal : les mots montent un par un
  document.querySelectorAll("[data-words]").forEach(function (h) {
    if (reduce) return;
    var words = h.textContent.trim().split(/\s+/);
    h.setAttribute("aria-label", h.textContent.trim());
    h.textContent = "";
    words.forEach(function (w, i) {
      var o = document.createElement("span");
      o.className = "w";
      o.setAttribute("aria-hidden", "true");
      var s = document.createElement("span");
      s.textContent = w;
      s.style.animationDelay = 80 + i * 70 + "ms";
      o.appendChild(s);
      h.appendChild(o);
      h.appendChild(document.createTextNode(" "));
    });
  });

  // Compteurs
  function count(el) {
    var to = parseFloat(el.dataset.count), t0 = null, dur = 900;
    var pre = el.dataset.pre || "";
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(to * e);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var items = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(count);
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();

/* Vidéo de l'accueil : à l'arrêt si le visiteur a demandé de réduire les animations */
(function () {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("video[autoplay]").forEach(function (v) {
    v.removeAttribute("autoplay");
    v.pause();
  });
})();
