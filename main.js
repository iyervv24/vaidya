document.addEventListener('DOMContentLoaded',()=>{
  const hb=document.querySelector('.hamburger'); const mob=document.querySelector('.mobile-nav');
  if(hb && mob){ hb.addEventListener('click',()=> mob.style.display = (mob.style.display==='block'?'none':'block')); }
  document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=> mob.style.display='none'));
});