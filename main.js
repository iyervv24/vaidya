
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if(btn && nav){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    document.addEventListener('click', function(e){
      if(!nav.contains(e.target) && !btn.contains(e.target)){
        nav.classList.remove('open'); btn.setAttribute('aria-expanded','false');
      }
    });
  }
  // set active nav
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=> a.classList.toggle('active', a.getAttribute('href').includes(path)));
  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=> a.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth', block:'start'});
  }));
});
