// small nav toggles for mobiles (works across pages)
function wireHamburger(btnId, navSelector) {
  const btn = document.getElementById(btnId);
  const nav = document.querySelector(navSelector);
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Try wiring multiple hamburger+nav combos (each page uses an ID)
wireHamburger('hamburger','nav.site-nav');
wireHamburger('hamburger2','nav.site-nav');
wireHamburger('hamburger3','nav.site-nav');
wireHamburger('hamburger4','nav.site-nav');

// Close mobile nav on link click (progressive)
document.addEventListener('click', (e) => {
  if (e.target.matches('.site-nav .nav-link')) {
    const nav = document.querySelector('nav.site-nav.open');
    if (nav) nav.classList.remove('open');
  }
});
