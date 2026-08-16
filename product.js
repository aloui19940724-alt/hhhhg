// product.js - render product page from products.json by slug
(function(){
  function getParam(name){
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function el(tag, attrs, html){
    const node = document.createElement(tag);
    if(attrs) Object.keys(attrs).forEach(k => node.setAttribute(k, attrs[k]));
    if(html) node.innerHTML = html;
    return node;
  }

  const slug = getParam('slug');
  const container = document.getElementById('product-container');

  if(!slug){
    container.innerHTML = '<p>لم يتم تحديد المنتج.</p>';
    return;
  }

  fetch('products.json').then(r => r.json()).then(list => {
    const p = list.find(x => x.slug === slug);
    if(!p){
      container.innerHTML = '<p>المنتج غير موجود.</p>';
      return;
    }

    document.title = p.name + ' — متجري';
    const html = `
      <div class="product-detail-card">
        <div class="product-media">
          <img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:12px; max-height:420px; object-fit:cover;">
        </div>
        <div class="product-info">
          <h1>${p.name}</h1>
          <p class="price">${p.price}</p>
          <p class="product-long">${p.long}</p>
          <ul class="features">${p.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul>
          <div style="display:flex; gap:10px; margin-top:15px;">
            <button class="btn-buy" id="buy-now">اشتر الآن</button>
            <a class="btn-view" href="index.html">العودة للمتجر</a>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    document.getElementById('buy-now').addEventListener('click', function(){
      buyProduct(p.name);
    });
  }).catch(err => {
    container.innerHTML = '<p>خطأ في تحميل بيانات المنتج.</p>';
    console.error(err);
  });
})();
