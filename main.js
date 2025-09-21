// main.js — small helpers for mobile nav
(() => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.style.display = expanded ? '' : 'flex';
    // For small screens we set column layout
    if (window.innerWidth <= 980 && !expanded) {
      siteNav.style.flexDirection = 'column';
      siteNav.style.gap = '12px';
      siteNav.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.45))';
      siteNav.style.padding = '12px';
      siteNav.style.position = 'absolute';
      siteNav.style.right = '16px';
      siteNav.style.top = '70px';
      siteNav.style.borderRadius = '10px';
      siteNav.style.zIndex = 1200;
    } else {
      // clear inline styles to use stylesheet defaults
      siteNav.style.removeProperty('flex-direction');
      siteNav.style.removeProperty('gap');
      siteNav.style.removeProperty('background');
      siteNav.style.removeProperty('padding');
      siteNav.style.removeProperty('position');
      siteNav.style.removeProperty('right');
      siteNav.style.removeProperty('top');
      siteNav.style.removeProperty('border-radius');
      siteNav.style.removeProperty('z-index');
    }
  });

  // If the user resizes, ensure nav is visible on large screens
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      siteNav.style.display = 'flex';
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      // collapse nav on small widths to keep header clean
      siteNav.style.display = '';
    }
  });
})();
