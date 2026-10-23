// Progressive enhancements only. Core page content is static HTML.
const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('primary-nav');
function closeMenu() { menu?.classList.remove('open'); menuButton?.setAttribute('aria-expanded','false'); }
menuButton?.addEventListener('click', () => {
  const expanded=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!expanded));
  menu.classList.toggle('open',!expanded);
});
document.addEventListener('keydown', event => { if(event.key==='Escape'){ closeMenu(); } });
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click', event=>{ if(!event.target.closest('.site-header')) closeMenu(); });

function setupFilters({formId,itemSelector,searchId,yearId,kindId,countId,emptyId,noun}) {
  const form=document.getElementById(formId); if(!form) return;
  const items=[...document.querySelectorAll(itemSelector)];
  const search=document.getElementById(searchId),year=document.getElementById(yearId),kind=kindId?document.getElementById(kindId):null;
  const params=new URLSearchParams(location.search);
  search.value=params.get('q')||'';
  if([...year.options].some(o=>o.value===params.get('year')))year.value=params.get('year');
  if(kind&&[...kind.options].some(o=>o.value===params.get('type')))kind.value=params.get('type');
  const update=(save=true)=>{
    const words=search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible=0;
    items.forEach(item=>{
      const show=words.every(word=>item.dataset.search.includes(word))&&(year.value==='all'||item.dataset.year===year.value)&&(!kind||kind.value==='all'||item.dataset.kind===kind.value);
      item.hidden=!show;if(show)visible++;
    });
    const label=visible===1?(noun==='updates'?'update':'publication / manuscript'):noun;
    document.getElementById(countId).textContent=`${visible} ${label}`;
    document.getElementById(emptyId).hidden=visible!==0;
    if(save){const p=new URLSearchParams();if(search.value.trim())p.set('q',search.value.trim());if(year.value!=='all')p.set('year',year.value);if(kind&&kind.value!=='all')p.set('type',kind.value);history.replaceState(null,'',`${location.pathname}${p.size?'?'+p:''}${location.hash}`);}
  };
  form.addEventListener('submit',e=>{e.preventDefault();update();});
  search.addEventListener('input',()=>update());year.addEventListener('change',()=>update());kind?.addEventListener('change',()=>update());update(false);
}
setupFilters({formId:'paper-filters',itemSelector:'[data-paper]',searchId:'paper-search',yearId:'paper-year',kindId:'paper-kind',countId:'paper-count',emptyId:'paper-empty',noun:'publications & manuscripts'});
setupFilters({formId:'news-filters',itemSelector:'[data-news]',searchId:'news-search',yearId:'news-year',countId:'news-count',emptyId:'news-empty',noun:'updates'});

const galleryData=document.getElementById('gallery-data');
const lightbox=document.getElementById('lightbox');
if(galleryData&&lightbox&&typeof lightbox.showModal==='function'){
  const albums=JSON.parse(galleryData.textContent);
  let album,position=0,opener;
  const photo=document.getElementById('lightbox-image');
  const previous=document.getElementById('lightbox-prev'),next=document.getElementById('lightbox-next');
  function renderPhoto(){
    photo.src=album.images[position];photo.alt=`${album.title} — photo ${position+1}`;
    document.getElementById('lightbox-title').textContent=album.title;
    document.getElementById('lightbox-counter').textContent=`${position+1} / ${album.images.length}`;
    previous.disabled=position===0;next.disabled=position===album.images.length-1;
  }
  document.querySelectorAll('[data-album]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();opener=link;album=albums[Number(link.dataset.album)];position=0;renderPhoto();lightbox.showModal();document.body.style.overflow='hidden';
  }));
  document.getElementById('lightbox-close').addEventListener('click',()=>lightbox.close());
  previous.addEventListener('click',()=>{if(position>0){position--;renderPhoto();}});
  next.addEventListener('click',()=>{if(position<album.images.length-1){position++;renderPhoto();}});
  lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();next.click();}if(event.key==='ArrowLeft'){event.preventDefault();previous.click();}});
  lightbox.addEventListener('click',event=>{if(event.target===lightbox){const r=lightbox.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)lightbox.close();}});
  lightbox.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus();});
}
