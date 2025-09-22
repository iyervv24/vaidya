// main.js - small UI behaviors
document.addEventListener('DOMContentLoaded', function(){
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.site-nav');
  if(burger && nav){
    burger.addEventListener('click', function(){
      nav.classList.toggle('visible');
      nav.style.display = nav.classList.contains('visible') ? 'flex' : '';
      nav.style.flexDirection = window.innerWidth <= 900 ? 'column' : 'row';
      nav.style.gap = '18px';
      nav.style.background = window.innerWidth <= 900 ? 'rgba(3,6,10,0.95)' : '';
      nav.style.position = window.innerWidth <= 900 ? 'absolute' : '';
      nav.style.right = window.innerWidth <= 900 ? '20px' : '';
      nav.style.top = window.innerWidth <= 900 ? '62px' : '';
      nav.style.padding = window.innerWidth <= 900 ? '12px' : '';
      nav.style.borderRadius = window.innerWidth <= 900 ? '10px' : '';
    });
    window.addEventListener('resize', function(){ if(window.innerWidth>900){ nav.style.display='flex'; nav.classList.remove('visible'); } });
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var t = document.querySelector(this.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
  });
});