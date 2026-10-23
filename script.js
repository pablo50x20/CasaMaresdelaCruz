// INFORMACIÓN EXTRAÍDA DEL CATÁLOGO PDF ORIGINAL (2026).
// Configurar el WhatsApp antes de habilitar pedidos: ejemplo '56912345678'.
const CONTACTO={whatsapp:'',instagram:''};
const items=[
 {n:'Sahara',col:'Sahara',tipo:'Vestido',precio:29990,img:'sahara',desc:'Su caída ligera y el brillo sutil de la tela hacen de Sahara una pieza para moverse, viajar y dejar que el verano haga el resto.'},
 {n:'Elara',col:'Riviera',tipo:'Vestido',precio:24990,img:'elara'},
 {n:'Amira',col:'Riviera',tipo:'Vestido',precio:24990,img:'amira'},
 {n:'Solea',col:'Riviera',tipo:'Vestido',precio:24990,img:'solea'},
 {n:'Nerina',col:'Riviera',tipo:'Vestido',precio:24990,img:'nerina'},
 {n:'Calista',col:'Terra Mia',tipo:'Vestido',precio:24990,img:'calista',desc:'Textura, movimiento y una elegancia serena que no necesita levantar la voz.'},
 {n:'Aurelia',col:'Terra Mia',tipo:'Vestido',precio:24990,img:'aurelia',desc:'Textura, movimiento y una elegancia serena que no necesita levantar la voz.'},
 {n:'Vittoria',col:'Pantalón italiano',tipo:'Pantalón',precio:16990,img:'vittoria',desc:'Raya fina, caída limpia y una silueta versátil. Sofisticación mediterránea para todos los días.'},
 {n:'Rosalía',col:'Rosalía',tipo:'Vestido',precio:29990,img:'rosalia',desc:'Romántico sin ser dulce en exceso. Sus rosas y su movimiento convierten a Rosalía en una prenda especial.'},
 {n:'Serafina',col:'Giardino',tipo:'Vestido',precio:29990,img:'serafina'},
 {n:'Allegra',col:'Giardino',tipo:'Vestido',precio:29990,img:'allegra'},
 {n:'Fiorella',col:'Giardino',tipo:'Vestido',precio:29990,img:'fiorella'},
 {n:'Capri',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'capri'},
 {n:'Olivia',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'olivia'},
 {n:'Lucía',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'lucia'},
 {n:'Siena',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'siena'},
 {n:'Amalfi',col:'Mediterránea',tipo:'Vestido',precio:16990,img:'amalfi'}
];


const CART_KEY='casa_mares_cart_v1';
let cartItems={};
try {
  const saved=JSON.parse(localStorage.getItem(CART_KEY)||'{}');
  if(saved && typeof saved==='object' && !Array.isArray(saved)){
    for(const [id,qty] of Object.entries(saved)){
      // Solo una unidad física por modelo. Normalizamos carritos antiguos.
      if(items.some(p=>p.img===id) && Number.isInteger(qty) && qty>0) cartItems[id]=1;
    }
  }
  localStorage.setItem(CART_KEY,JSON.stringify(cartItems));
} catch {}
const money=n=>new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(n);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let active='Todas',selected=null;const filters=document.getElementById('filters'),grid=document.getElementById('grid');const collections=['Todas',...new Set(items.map(p=>p.col))];
function renderFilters(){filters.innerHTML=collections.map(c=>`<button type="button" class="chip ${active===c?'on':''}" data-cat="${escape(c)}">${escape(c)}</button>`).join('')}
function render(){const q=document.getElementById('search').value.trim().toLocaleLowerCase('es');const order=document.getElementById('sort').value;let data=items.filter(p=>(active==='Todas'||p.col===active)&&[p.n,p.col,p.tipo].join(' ').toLocaleLowerCase('es').includes(q));if(order==='low')data.sort((a,b)=>a.precio-b.precio);if(order==='high')data.sort((a,b)=>b.precio-a.precio);if(order==='alpha')data.sort((a,b)=>a.n.localeCompare(b.n,'es'));document.getElementById('counter').textContent=`${data.length} prendas`;grid.innerHTML=data.length?data.map(p=>`<article class="item"><button type="button" class="product-img" data-id="${p.img}" aria-label="Ver detalles de ${escape(p.n)}"><img loading="lazy" src="img/${p.img}.webp" alt="${escape(p.tipo)} ${escape(p.n)}"><span class="collection-tag">${escape(p.col)}</span></button><div class="product-top"><h3>${escape(p.n)}</h3><span class="price">${money(p.precio)}</span></div><p class="type">${escape(p.tipo)}</p><div class="product-actions"><button class="ask" type="button" data-id="${p.img}">Ver detalles</button><button class="purchase" type="button" data-add="${p.img}" ${cartItems[p.img]?'disabled aria-disabled="true"':''}>${cartItems[p.img]?'En el carrito ✓':'Agregar al carrito +'}</button></div></article>`).join(''):'<div class="empty">No encontramos prendas con esos filtros.</div>'}
function updateModalCartButton(){const btn=document.getElementById('modal-add');const added=selected&&Boolean(cartItems[selected.img]);btn.disabled=Boolean(added);btn.textContent=added?'Ya está en tu carrito ✓':'Agregar al carrito →'}
function openDetails(id){const p=items.find(i=>i.img===id);if(!p)return;selected=p;document.getElementById('modal-img').src=`img/${p.img}.webp`;document.getElementById('modal-img').alt=`${p.tipo} ${p.n}`;document.getElementById('modal-col').textContent=p.col;document.getElementById('modal-name').textContent=p.n;document.getElementById('modal-desc').textContent=p.desc||'Una prenda de la colección Primavera–Verano 2026 de Casa Mares de la Cruz.';document.getElementById('modal-price').textContent=money(p.precio);updateModalCartButton();document.getElementById('details').showModal()}
function contact(p){if(!/^\d{8,15}$/.test(CONTACTO.whatsapp)){alert('El número oficial de WhatsApp aún no está configurado. Debe incorporarse antes de publicar la tienda para recibir pedidos.');return}const txt=p?`Hola, quisiera consultar por ${p.tipo} ${p.n} de Casa Mares de la Cruz (${money(p.precio)}). ¿Qué tallas y stock tienen disponibles?`:'Hola, quisiera consultar por la colección de Casa Mares de la Cruz.';window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(txt)}`,'_blank','noopener,noreferrer')}
filters.addEventListener('click',e=>{const btn=e.target.closest('[data-cat]');if(btn){active=btn.dataset.cat;renderFilters();render()}});grid.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add){addToCart(add.dataset.add);return}const btn=e.target.closest('[data-id]');if(btn)openDetails(btn.dataset.id)});document.getElementById('search').addEventListener('input',render);document.getElementById('sort').addEventListener('change',render);document.getElementById('close').addEventListener('click',()=>document.getElementById('details').close());document.getElementById('details').addEventListener('click',e=>{if(e.target===document.getElementById('details'))document.getElementById('details').close()});document.getElementById('modal-ask').addEventListener('click',()=>contact(selected));document.getElementById('modal-add').addEventListener('click',()=>{if(selected){document.getElementById('details').close();addToCart(selected.img)}});document.getElementById('contact-link')?.addEventListener('click',e=>{if(CONTACTO.whatsapp){e.preventDefault();contact(null)}});renderFilters();render();
// Carrito local: máximo 1 unidad de cada modelo; no reserva inventario ni cobra.
const cartDialog=document.getElementById('cart');
let toastTimer;
function notice(text){const el=document.getElementById('toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2900)}
function saveCart(){try{localStorage.setItem(CART_KEY,JSON.stringify(cartItems))}catch{}renderCart();render();if(selected)updateModalCartButton()}
function openCart(){
  renderCart();
  cartDialog.setAttribute('open', '');
  document.body.classList.add('cart-layout-open');
  if(window.matchMedia('(max-width: 900px)').matches){
    requestAnimationFrame(()=>cartDialog.scrollIntoView({behavior:'smooth',block:'start'}));
  }
}
function closeCart(){
  cartDialog.removeAttribute('open');
  document.body.classList.remove('cart-layout-open');
}
function addToCart(id){if(!items.some(p=>p.img===id))return;if(cartItems[id]){notice('Ya tienes esa única unidad en tu carrito');return}cartItems[id]=1;saveCart();notice('Prenda agregada al carrito');if(!document.getElementById('details').open)openCart()}
function changeQty(id,by){if(!(id in cartItems))return;if(by<0){delete cartItems[id];saveCart()}else{notice('Solo hay una unidad disponible de esta prenda')}}
function buildOrder(){const lines=['Hola, quisiera consultar disponibilidad y realizar este pedido en Casa Mares de la Cruz:',''];let total=0;for(const [id,q] of Object.entries(cartItems)){const p=items.find(i=>i.img===id);if(!p)continue;let amount=p.precio*q;total+=amount;lines.push(`• ${p.tipo} ${p.n} (${p.col}) — ${money(amount)}`)}lines.push('',`Subtotal estimado: ${money(total)}`,'Por favor, confirmen tallas, stock, costo de envío y medios de pago.');return lines.join('\n')}
function renderCart(){const rows=Object.entries(cartItems).map(([id,qty])=>({p:items.find(p=>p.img===id),qty})).filter(o=>o.p);const total=rows.reduce((a,o)=>a+o.qty*o.p.precio,0);document.getElementById('cart-count').textContent=rows.reduce((a,o)=>a+o.qty,0);document.getElementById('cart-items').innerHTML=rows.length?rows.map(({p,qty})=>`<div class="cart-row"><img src="img/${p.img}.webp" alt="${escape(p.n)}"><div><div class="cart-name">${escape(p.n)}</div><div class="cart-sub">${escape(p.col)} · Talla por confirmar</div><strong>${money(p.precio*qty)}</strong><div class="cart-sub">Cantidad: 1 · Unidad única</div><button class="remove" data-remove="${p.img}">Eliminar</button></div></div>`).join(''):'<div class="cart-empty">Tu carrito está vacío. Explora la colección y agrega tus prendas favoritas.</div>';document.getElementById('cart-subtotal').textContent=money(total);document.querySelector('.cart-total span').textContent=`Total (${rows.length} ${rows.length===1?'prenda':'prendas'})`;document.getElementById('cart-whatsapp').disabled=!rows.length;document.getElementById('cart-copy').disabled=!rows.length;document.getElementById('cart-clear').disabled=!rows.length;document.getElementById('cart-contact-status').textContent=/^\d{8,15}$/.test(CONTACTO.whatsapp)?'Al continuar abrirás WhatsApp para enviar tu pedido. La compra requiere confirmación de la boutique.':'WhatsApp todavía no está configurado. Puedes copiar el resumen para enviarlo por otro medio.'}
document.getElementById('cart-open').addEventListener('click',()=>{renderCart();openCart()});document.getElementById('cart-close').addEventListener('click',()=>closeCart());document.getElementById('cart-items').addEventListener('click',e=>{const btn=e.target.closest('button');if(!btn)return;if(btn.dataset.remove){delete cartItems[btn.dataset.remove];saveCart()}else if(btn.dataset.qty)changeQty(btn.dataset.item,Number(btn.dataset.qty))});document.getElementById('cart-clear').addEventListener('click',()=>{if(confirm('¿Vaciar todas las prendas de tu carrito?')){cartItems={};saveCart()}});document.getElementById('cart-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(buildOrder());notice('Resumen copiado')}catch{notice('No se pudo copiar. Abre el sitio mediante HTTPS o localhost.')}});document.getElementById('cart-whatsapp').addEventListener('click',()=>{if(!/^\d{8,15}$/.test(CONTACTO.whatsapp)){notice('Falta configurar el número de WhatsApp de la boutique.');return}window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(buildOrder())}`,'_blank','noopener,noreferrer')});renderCart();

// Permite cerrar el panel lateral con Escape.
document.addEventListener('keydown',e=>{if(e.key==='Escape' && cartDialog.hasAttribute('open') && !document.getElementById('details').open)closeCart()});
