// =============================================
// ANIMASI SCROLL — irpanchumaedi.com
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // 1. Intersection Observer — fade in saat elemen masuk viewport
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animasi hanya sekali
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Terapkan ke semua section dan kartu
  const targets = document.querySelectorAll(
    '.home-section, article, .card, .wg-hero'
  );
  targets.forEach(function (el) {
    observer.observe(el);
  });

  // 2. Navbar shadow saat scroll
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 3. Animasi stagger pada skill cards (delay per item)
  const featurettes = document.querySelectorAll('.featurette');
  featurettes.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.1) + 's';
  });

});
