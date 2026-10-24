// INFORMACIÓN EXTRAÍDA DEL CATÁLOGO PDF ORIGINAL (2026).
// Configurar el WhatsApp antes de habilitar pedidos: ejemplo '56912345678'.
const CONTACTO={whatsapp:'',instagram:''};
const items=[
 {n:'Sahara',col:'Sahara',tipo:'Vestido',precio:29990,img:'sahara',tallas:{"TU":1},desc:'Su caída ligera y el brillo sutil de la tela hacen de Sahara una pieza para moverse, viajar y dejar que el verano haga el resto.'},
 {n:'Elara',col:'Riviera',tipo:'Vestido',precio:29990,img:'elara',tallas:{"TU":1}},
 {n:'Amira',col:'Riviera',tipo:'Vestido',precio:29990,img:'amira',tallas:{"TU":1}},
 {n:'Solea',col:'Riviera',tipo:'Vestido',precio:29990,img:'solea',tallas:{"TU":1}},
 {n:'Nerina',col:'Riviera',tipo:'Vestido',precio:29990,img:'nerina',tallas:{"TU":1}},
 {n:'Calista',col:'Terra Mia',tipo:'Vestido',precio:29990,img:'calista',tallas:{"TU":1},desc:'Textura, movimiento y una elegancia serena que no necesita levantar la voz.'},
 {n:'Aurelia',col:'Terra Mia',tipo:'Vestido',precio:29990,img:'aurelia',tallas:{"TU":1},desc:'Textura, movimiento y una elegancia serena que no necesita levantar la voz.'},
 {n:'Vittoria',col:'Pantalón italiano',tipo:'Pantalón',precio:29990,img:'vittoria',tallas:{"XL":1},desc:'Raya fina, caída limpia y una silueta versátil. Sofisticación mediterránea para todos los días.'},
 {n:'Rosalía',col:'Rosalía',tipo:'Vestido',precio:29990,img:'rosalia',tallas:{"TU":3},desc:'Romántico sin ser dulce en exceso. Sus rosas y su movimiento convierten a Rosalía en una prenda especial.'},
 {n:'Serafina',col:'Giardino',tipo:'Vestido',precio:29990,img:'serafina',tallas:{"TU":1}},
 {n:'Allegra',col:'Giardino',tipo:'Vestido',precio:29990,img:'allegra',tallas:{"TU":1}},
 {n:'Fiorella',col:'Giardino',tipo:'Vestido',precio:29990,img:'fiorella',tallas:{"TU":1}},
 {n:'Capri',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'capri',tallas:{"S":1,"M":1,"L":1,"XL":1,"XXL":1}},
 {n:'Olivia',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'olivia',tallas:{"S":1,"M":1,"L":1}},
 {n:'Lucía',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'lucia',tallas:{"M":1,"L":1,"XL":1,"XXL":1}},
 {n:'Siena',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'siena',tallas:{"S":1,"M":1,"L":1,"XXL":1}},
 {n:'Amalfi',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'amalfi',tallas:{"S":1,"M":1,"L":1,"XL":1}}
];
const CART_KEY='casa_mares_cart_v2';
const money=n=>new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(n);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=id=>items.find(p=>p.img===id);
const sku=(id,talla)=>`${id}|${talla}`;
let cartItems={};
try {
 const saved=JSON.parse(localStorage.getItem(CART_KEY)||'{}');
 if(saved && typeof saved==='object' && !Array.isArray(saved)){
  for(const [key,qty] of Object.entries(saved)){
   const [id,talla]=key.split('|');const p=byId(id);
   if(p && p.tallas[talla] && Number.isInteger(qty) && qty>0)cartItems[key]=Math.min(qty,p.tallas[talla]);
  }
 }
}catch{}
let active='Todas',selected=null;
const filters=document.getElementById('filters'),grid=document.getElementById('grid');
const collections=['Todas',...new Set(items.map(p=>p.col))];
const available=p=>Object.entries(p.tallas).filter(([t,max])=>(cartItems[sku(p.img,t)]||0)<max);
const sizeOptions=(p,chosen='')=>Object.entries(p.tallas).map(([t,max])=>`<option value="${escape(t)}" ${t===chosen?'selected':''} ${(cartItems[sku(p.img,t)]||0)>=max?'disabled':''}>${escape(t)} · ${Math.max(0,max-(cartItems[sku(p.img,t)]||0))} disp.</option>`).join('');
function renderFilters(){filters.innerHTML=collections.map(c=>`<button type="button" class="chip ${active===c?'on':''}" data-cat="${escape(c)}">${escape(c)}</button>`).join('')}
function render(){
 const q=document.getElementById('search').value.trim().toLocaleLowerCase('es');
 const order=document.getElementById('sort').value;
 let data=items.filter(p=>(active==='Todas'||p.col===active)&&[p.n,p.col,p.tipo].join(' ').toLocaleLowerCase('es').includes(q));
 if(order==='low')data.sort((a,b)=>a.precio-b.precio);
 if(order==='high')data.sort((a,b)=>b.precio-a.precio);
 if(order==='alpha')data.sort((a,b)=>a.n.localeCompare(b.n,'es'));
 document.getElementById('counter').textContent=`${data.length} prendas`;
 grid.innerHTML=data.length?data.map(p=>{
  const has=available(p).length>0;
  const chosen=available(p)[0]?.[0]||Object.keys(p.tallas)[0];
  return `<article class="item"><button type="button" class="product-img" data-id="${p.img}" aria-label="Ver detalles de ${escape(p.n)}"><img loading="lazy" src="img/${p.img}.webp" alt="${escape(p.tipo)} ${escape(p.n)}"><span class="collection-tag">${escape(p.col)}</span></button><button type="button" class="zoom-product" data-zoom="${p.img}" aria-label="Ampliar fotografía de ${escape(p.n)}" title="Ampliar fotografía"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button><div class="product-top"><h3>${escape(p.n)}</h3><span class="price">${money(p.precio)}</span></div><p class="type">${escape(p.tipo)} · ${Object.keys(p.tallas).join(', ')}</p><label class="size-label" for="size-${p.img}">Talla</label><select class="size-select" id="size-${p.img}" data-size-for="${p.img}" ${has?'':'disabled'}>${sizeOptions(p,chosen)}</select><div class="product-actions"><button class="ask" type="button" data-id="${p.img}">Ver detalles</button><button class="purchase" type="button" data-add="${p.img}" ${has?'':'disabled'}>${has?'Agregar al carrito +':'Agotado'}</button></div></article>`;
 }).join(''):'<div class="empty">No encontramos prendas con esos filtros.</div>';
}
// Selector de talla en la ventana de detalles, insertado sin modificar index.html.
const modalInfo=document.querySelector('#details .info');
const modalLabel=document.createElement('label');modalLabel.className='size-label';modalLabel.htmlFor='modal-size';modalLabel.textContent='Selecciona una talla';
const modalSize=document.createElement('select');modalSize.id='modal-size';modalSize.className='size-select';
modalInfo.replaceWith(modalLabel,modalSize);
function updateModalCartButton(){
 const btn=document.getElementById('modal-add');if(!selected)return;
 const talla=modalSize.value;
 const free=(selected.tallas[talla]||0)-(cartItems[sku(selected.img,talla)]||0);
 btn.disabled=free<=0;btn.textContent=free>0?'Agregar al carrito →':'Sin unidades disponibles';
}
function openDetails(id){
 const p=byId(id);if(!p)return;selected=p;
 document.getElementById('modal-img').src=`img/${p.img}.webp`;
 document.getElementById('modal-img').alt=`${p.tipo} ${p.n}`;
 document.getElementById('modal-col').textContent=p.col;
 document.getElementById('modal-name').textContent=p.n;
 document.getElementById('modal-desc').textContent=p.desc||'Una prenda de la colección Primavera–Verano 2026 de Casa Mares de la Cruz.';
 document.getElementById('modal-price').textContent=money(p.precio);
 const chosen=available(p)[0]?.[0]||Object.keys(p.tallas)[0];
 modalSize.innerHTML=sizeOptions(p,chosen);updateModalCartButton();
 document.getElementById('details').showModal();
}
function contact(p){
 if(!/^\d{8,15}$/.test(CONTACTO.whatsapp)){alert('El número oficial de WhatsApp todavía no está configurado.');return}
 const talla=p?modalSize.value:'';
 const txt=p?`Hola, quisiera consultar por ${p.tipo} ${p.n}, talla ${talla} (${money(p.precio)}). ¿Está disponible?`:'Hola, quisiera consultar por la colección de Casa Mares de la Cruz.';
 window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(txt)}`,'_blank','noopener,noreferrer');
}
filters.addEventListener('click',e=>{const btn=e.target.closest('[data-cat]');if(btn){active=btn.dataset.cat;renderFilters();render()}});
grid.addEventListener('click',e=>{
 const zoom=e.target.closest('[data-zoom]');if(zoom){openZoom(zoom.dataset.zoom);return}
 const add=e.target.closest('[data-add]');if(add){const sel=grid.querySelector(`[data-size-for="${add.dataset.add}"]`);addToCart(add.dataset.add,sel?.value);return}
 const btn=e.target.closest('[data-id]');if(btn)openDetails(btn.dataset.id);
});
document.getElementById('search').addEventListener('input',render);
document.getElementById('sort').addEventListener('change',render);
document.getElementById('close').addEventListener('click',()=>document.getElementById('details').close());
document.getElementById('details').addEventListener('click',e=>{if(e.target===document.getElementById('details'))document.getElementById('details').close()});
modalSize.addEventListener('change',updateModalCartButton);
document.getElementById('modal-ask').addEventListener('click',()=>contact(selected));
document.getElementById('modal-add').addEventListener('click',()=>{if(selected){const id=selected.img,t=modalSize.value;document.getElementById('details').close();addToCart(id,t)}});
document.getElementById('contact-link')?.addEventListener('click',e=>{if(CONTACTO.whatsapp){e.preventDefault();contact(null)}});
renderFilters();render();
const cartDialog=document.getElementById('cart');let toastTimer;
function notice(text){const el=document.getElementById('toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2900)}
function saveCart(){try{localStorage.setItem(CART_KEY,JSON.stringify(cartItems))}catch{}renderCart();render();if(selected){modalSize.innerHTML=sizeOptions(selected,modalSize.value);updateModalCartButton()}}
function openCart(){renderCart();cartDialog.setAttribute('open','');document.body.classList.add('cart-layout-open');if(window.matchMedia('(max-width: 900px)').matches)requestAnimationFrame(()=>cartDialog.scrollIntoView({behavior:'smooth',block:'start'}))}
function closeCart(){cartDialog.removeAttribute('open');document.body.classList.remove('cart-layout-open')}
function addToCart(id,talla){
 const p=byId(id);if(!p||!talla||!p.tallas[talla])return;
 const key=sku(id,talla),old=cartItems[key]||0;
 if(old>=p.tallas[talla]){notice('No queda stock de esta talla');return}
 cartItems[key]=old+1;saveCart();notice(`${p.n} · Talla ${talla} agregado al carrito`);openCart();
}
function buildOrder(){
 const lines=['Hola, quisiera consultar disponibilidad y realizar este pedido en Casa Mares de la Cruz:',''];let total=0;
 for(const [key,qty] of Object.entries(cartItems)){
  const [id,talla]=key.split('|'),p=byId(id);if(!p)continue;
  const amount=p.precio*qty;total+=amount;
  lines.push(`• ${p.tipo} ${p.n} · Talla ${talla} · ${qty} unidad(es) — ${money(amount)}`);
 }
 lines.push('',`Subtotal estimado: ${money(total)}`,'Por favor, confirmar stock, costo de envío y medios de pago.');return lines.join('\n');
}
function renderCart(){
 const rows=Object.entries(cartItems).map(([key,qty])=>({key,p:byId(key.split('|')[0]),talla:key.split('|')[1],qty})).filter(o=>o.p);
 const total=rows.reduce((a,o)=>a+o.qty*o.p.precio,0),count=rows.reduce((a,o)=>a+o.qty,0);
 document.getElementById('cart-count').textContent=count;
 document.getElementById('cart-items').innerHTML=rows.length?rows.map(({key,p,talla,qty})=>`<div class="cart-row"><img src="img/${p.img}.webp" alt="${escape(p.n)}"><div><div class="cart-name">${escape(p.n)}</div><div class="cart-sub">${escape(p.col)} · Talla ${escape(talla)}</div><strong>${money(p.precio*qty)}</strong><div class="cart-sub">Cantidad: ${qty} · ${money(p.precio)} c/u</div><div class="cart-stock-actions"><button class="remove" data-less="${escape(key)}">− Quitar una</button><button class="remove" data-more="${escape(key)}" ${qty>=p.tallas[talla]?'disabled':''}>+ Añadir una</button></div></div></div>`).join(''):'<div class="cart-empty">Tu carrito está vacío. Explora la colección y agrega tus prendas favoritas.</div>';
 document.getElementById('cart-subtotal').textContent=money(total);
 document.querySelector('.cart-total span').textContent=`Total (${count} ${count===1?'prenda':'prendas'})`;
 for(const k of ['cart-whatsapp','cart-copy','cart-clear'])document.getElementById(k).disabled=!rows.length;
 document.getElementById('cart-contact-status').textContent=/^\d{8,15}$/.test(CONTACTO.whatsapp)?'Al continuar abrirás WhatsApp. El pedido y las existencias deben confirmarse con la boutique.':'WhatsApp todavía no está configurado. Puedes copiar el resumen del pedido.';
}
document.getElementById('cart-open').addEventListener('click',openCart);
document.getElementById('cart-close').addEventListener('click',closeCart);
document.getElementById('cart-items').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 const key=b.dataset.less||b.dataset.more;if(!key||!cartItems[key])return;
 const [id,talla]=key.split('|'),p=byId(id);
 if(b.dataset.less){cartItems[key]--;if(!cartItems[key])delete cartItems[key]}
 else if(p && cartItems[key]<p.tallas[talla])cartItems[key]++;
 saveCart();
});
document.getElementById('cart-clear').addEventListener('click',()=>{if(confirm('¿Vaciar todas las prendas de tu carrito?')){cartItems={};saveCart()}});
document.getElementById('cart-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(buildOrder());notice('Resumen copiado')}catch{notice('No se pudo copiar. Abre el sitio mediante HTTPS o localhost.')}});
document.getElementById('cart-whatsapp').addEventListener('click',()=>{if(!/^\d{8,15}$/.test(CONTACTO.whatsapp)){notice('Falta configurar el WhatsApp de la boutique.');return}window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(buildOrder())}`,'_blank','noopener,noreferrer')});
renderCart();
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&cartDialog.hasAttribute('open')&&!document.getElementById('details').open)closeCart()});
const zoomDialog=document.createElement('dialog');zoomDialog.className='zoom-dialog';zoomDialog.setAttribute('aria-label','Fotografía ampliada del producto');
zoomDialog.innerHTML=`<button type="button" class="zoom-close" aria-label="Cerrar imagen ampliada">×</button><img alt=""><p class="zoom-caption"></p>`;
document.body.appendChild(zoomDialog);
function openZoom(id){const p=byId(id);if(!p)return;zoomDialog.querySelector('img').src=`img/${p.img}.webp`;zoomDialog.querySelector('img').alt=`Fotografía ampliada de ${p.tipo} ${p.n}`;zoomDialog.querySelector('.zoom-caption').textContent=`${p.tipo} ${p.n} · ${money(p.precio)}`;zoomDialog.showModal()}
zoomDialog.querySelector('.zoom-close').addEventListener('click',()=>zoomDialog.close());
zoomDialog.addEventListener('click',e=>{if(e.target===zoomDialog)zoomDialog.close()});
