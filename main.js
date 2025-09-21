/* main.js — robust mobile toggle + helper fixes */
(function(){
  const MOBILE_BREAK = 880;

  function qs(sel){return document.querySelector(sel)}

  const toggle = qs('.menu-toggle');
  const nav = qs('.site-nav');

  // Safety: if either missing, bail gracefully
  if(!nav) return;

  // Ensure nav has no leftover inline styles
  function resetNavForDesktop(){
    nav.style.display = '';
    nav.classList.remove('mobile');
    document.body.classList.remove('nav-open');
    if(toggle) toggle.setAttribute('aria-expanded','false');
  }

  // Toggle mobile menu
  function openMobile(){
    nav.style.display = 'flex';
    nav.classList.add('mobile');
    document.body.classList.add('nav-open'); // optional: lock scroll if you want css for it
    if(toggle) toggle.setAttribute('aria-expanded','true');
  }
  function closeMobile(){
    nav.style.display = '';
    nav.classList.remove('mobile');
    document.body.classList.remove('nav-open');
    if(toggle) toggle.setAttribute('aria-expanded','false');
  }
  function toggleMobile(){
    if(nav.classList.contains('mobile')) closeMobile(); else openMobile();
  }

  // Attach toggle button
  if(toggle){
    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      toggleMobile();
    });
  }

  // Close when clicking outside
  document.addEventListener('click', function(e){
    if(window.innerWidth > MOBILE_BREAK) return;
    if(!nav.classList.contains('mobile')) return;
    // if click is outside nav and not on toggle -> close
    if(!nav.contains(e.target) && !(toggle && toggle.contains(e.target))){
      closeMobile();
    }
  });

  // Close when user clicks a nav link on mobile
  nav.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    if(window.innerWidth <= MOBILE_BREAK){
      // small delay to allow navigation to begin
      setTimeout(closeMobile, 80);
    }
  });

  // Reset on resize to avoid stuck open/hidden states
  window.addEventListener('resize', function(){
    if(window.innerWidth > MOBILE_BREAK){
      resetNavForDesktop();
    } else {
      // leave as-is on small screens
    }
  });

  // Active nav link by filename
  (function setActive(){
    const path = location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach(a=>{
      const href = a.getAttribute('href');
      if(href && href.indexOf(path) !== -1) a.classList.add('active');
      else a.classList.remove('active');
    });
  })();

  // Add lazy-loading for images (help perf)
  document.querySelectorAll('img').forEach(img=>{
    if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
    if(!img.style.objectFit) img.style.objectFit = 'cover';
  });

  // Small repaint trick to avoid clipped glyph issues on some devices
  window.addEventListener('load', ()=>{
    const hero = document.querySelector('.hero-title');
    if(hero){ hero.style.willChange = 'transform'; setTimeout(()=>hero.style.willChange='',300); }
  });
})();
