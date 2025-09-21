/* main.js - mobile menu toggle + simple helpers */
(function(){
  // show/hide nav for mobile
  function toggleMenu(event){
    const nav = document.querySelector('.site-nav');
    if(!nav) return;
    const open = nav.style.display === 'flex';
    if(open){
      nav.style.display = '';
      nav.classList.remove('mobile-open');
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.classList.add('mobile-open');
    }
  }

  document.querySelectorAll('.menu-toggle').forEach(btn=>{
    btn.addEventListener('click', toggleMenu);
  });

  // close mobile nav after clicking a link
  document.addEventListener('click', function(e){
    if(window.innerWidth > 880) return;
    const nav = document.querySelector('.site-nav');
    if(!nav) return;
    if(e.target.matches('.site-nav a')){
      nav.style.display = '';
      nav.classList.remove('mobile-open');
    }
  });

  // set active nav link by file
  (function setActive(){
    const url = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav a.nav-link').forEach(a=>{
      if(a.getAttribute('href') === url) a.classList.add('active');
    });
  })();

  // small lazyload hint: add loading attr to images if not present
  document.querySelectorAll('img').forEach(img=>{
    if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
  });

  // Prevent hero-title clipping by forcing repaint after fonts load (fixes glyph clipping)
  window.addEventListener('load', ()=> {
    const hero = document.querySelector('.hero-title');
    if(hero) hero.style.willChange = 'transform';
    setTimeout(()=>{ if(hero) hero.style.willChange = ''; }, 600);
  });
})();
