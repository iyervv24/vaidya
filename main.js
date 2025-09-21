// Simple mobile nav toggle (works across pages)
(function(){
  function toggleMenu(evt){
    const nav = document.querySelector('.site-nav');
    if(!nav) return;
    const visible = nav.style.display === 'flex';
    nav.style.display = visible ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '12px';
  }

  const toggles = document.querySelectorAll('.menu-toggle');
  toggles.forEach(t => t.addEventListener('click', toggleMenu));

  // close mobile menu on link click
  document.addEventListener('click', function(e){
    if(window.innerWidth > 880) return;
    const nav = document.querySelector('.site-nav');
    if(!nav) return;
    if(e.target.matches('.site-nav a')){
      nav.style.display = '';
    }
  });

  // highlight active nav link
  (function setActive(){
    const links = document.querySelectorAll('.site-nav a.nav-link');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a=>{
      const href = a.getAttribute('href');
      if(href === path) a.classList.add('active');
    });
  })();
})();
