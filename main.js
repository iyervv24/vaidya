// toggle nav
(() => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (!navToggle || !siteNav) return;
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.style.display = expanded ? '' : 'flex';
  });
})();