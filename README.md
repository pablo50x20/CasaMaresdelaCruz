# Casa Mares de la Cruz — sitio web de catálogo

Sitio estático HTML/CSS/JavaScript construido a partir del PDF «Catálogo.pdf» entregado por el usuario. 17 prendas, fotografías extraídas del catálogo, filtros por colección, búsqueda, ordenamiento y vista de detalle. Diseño responsivo con la identidad boutique mediterránea Primavera–Verano 2026.

## Ver

Abre `index.html` con el navegador. Los archivos de fotos están en `/img` y deben conservarse junto al HTML. Para evitar restricciones de `file://` puedes ejecutar un servidor local: `python -m http.server 8000` y abrir `http://localhost:8000`.

## Configurar antes de publicar

En la constante `CONTACTO` dentro de `index.html`, introduce el número oficial `whatsapp` en formato internacional sin `+`, por ejemplo `56912345678`. Hasta que esté configurado, los botones informan que no se pueden recibir consultas. No se han inventado tallas, stock, medios de pago ni condiciones de envío. Solicitar estos datos a la marca.

La nomenclatura de las 17 prendas, los precios y los textos descriptivos publicados proceden de las páginas del catálogo original. Los breves textos predeterminados de detalle son textos genéricos cuando el PDF no contiene descripción individual.

## Publicar

Puedes subir la carpeta al repositorio privado de GitHub y publicar con Firebase Hosting. Debes elegir esta carpeta como `public` al ejecutar `firebase init hosting` o copiar sus contenidos a la carpeta pública establecida. Las imágenes son archivos estáticos públicos y pueden descargarse mediante el navegador, como en cualquier tienda web.

## Derechos sobre imágenes

Las fotografías son extraídas del PDF aportado, no proceden de bancos de imágenes externos. Antes de difundir el sitio públicamente, confirma que tienes autorización para publicar las fotografías y materiales de marca.


## Carrito de compras (versión 2)
- Carrito funcional con agregar prendas, cantidades, eliminar, vaciar y subtotal en CLP.
- Persiste localmente en el navegador (`localStorage`), no es una compra ni reserva stock.
- Puede copiarse un resumen del pedido.
- Para enviar el pedido por WhatsApp, configura `CONTACTO.whatsapp` en `index.html`, usando número internacional solo con dígitos (por ejemplo, Chile `569XXXXXXXX`).
- Hasta tener el WhatsApp oficial, el botón informa que falta configurar el número y no simula envío.
- El catálogo fuente no informa tallas, inventario, pagos ni políticas de envío. Todos quedan sujetos a confirmación.
- Si en una etapa posterior se desean pagos reales, se necesita un backend, gestión de stock y una pasarela de pago.


## Estructura de archivos

- `index.html`: contenido de la página y estructura del catálogo.
- `style.css`: estilos de la boutique y del carrito.
- `script.js`: catálogo, filtros, detalles, carrito, WhatsApp y almacenamiento local.
- `img/`: imágenes de prendas.

Los tres archivos deben permanecer juntos en la misma carpeta. Abre `index.html` en el navegador o usa un servidor local. Para editar el WhatsApp, busca `CONTACTO.whatsapp` en `script.js`.
