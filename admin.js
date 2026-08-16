// admin.js - client-side admin to load products.json into localStorage, edit, add, delete, and download JSON
(function(){
  const PASS = 'admin2026!'; // default password
  const loginBtn = document.getElementById('login-btn');
  const passInput = document.getElementById('admin-pass');
  const adminArea = document.getElementById('admin-area');
  const adminLogin = document.getElementById('admin-login');
  const productsList = document.getElementById('products-list');

  function loadProductsSource(){
    return fetch('products.json').then(r=>r.json());
  }

  function saveToLocal(products){
    localStorage.setItem('products', JSON.stringify(products, null, 2));
  }

  function getLocal(){
    const s = localStorage.getItem('products');
    return s ? JSON.parse(s) : null;
  }

  function renderList(){
    const list = getLocal() || [];
    productsList.innerHTML = '';
    list.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.style.padding = '15px';
      card.style.marginBottom = '12px';
      card.innerHTML = `
        <div style="display:flex; gap:12px; align-items:center;">
          <img src="${p.image}" alt="" style="width:90px; height:60px; object-fit:cover; border-radius:8px;">
          <div style="flex:1; text-align:right;">
            <strong>${p.name}</strong>
            <div style="color:var(--gray)">${p.short || ''}</div>
            <div style="margin-top:6px;">${p.price}</div>
          </div>
          <div style="display:flex; gap:6px; flex-direction:column;">
            <button class="btn-buy" data-idx="${idx}" style="padding:6px 10px;">تعديل</button>
            <button class="btn-view" data-del="${idx}" style="padding:6px 10px; background:#ef4444;">حذف</button>
          </div>
        </div>
      `;
      productsList.appendChild(card);
    });

    // attach handlers
    productsList.querySelectorAll('button[data-idx]').forEach(btn => {
      btn.addEventListener('click', function(){
        const idx = Number(this.getAttribute('data-idx'));
        openEdit(idx);
      });
    });

    productsList.querySelectorAll('button[data-del]').forEach(btn => {
      btn.addEventListener('click', function(){
        const idx = Number(this.getAttribute('data-del'));
        if(confirm('هل أنت متأكد من حذف المنتج؟')){
          const arr = getLocal(); arr.splice(idx,1); saveToLocal(arr); renderList();
        }
      });
    });
  }

  function openEdit(idx){
    const arr = getLocal();
    const p = arr[idx];
    const form = document.createElement('div');
    form.style.display='grid'; form.style.gap='8px'; form.style.marginTop='10px';
    form.innerHTML = `
      <input id="e-name" value="${p.name}">
      <input id="e-slug" value="${p.slug}">
      <input id="e-price" value="${p.price_number}">
      <input id="e-image" value="${p.image}">
      <textarea id="e-long">${p.long}</textarea>
      <button id="save-edit" class="btn-buy">حفظ التعديلات</button>
      <button id="cancel-edit" class="btn-view">إلغاء</button>
    `;
    productsList.innerHTML = '';
    productsList.appendChild(form);

    document.getElementById('save-edit').addEventListener('click', function(){
      p.name = document.getElementById('e-name').value;
      p.slug = document.getElementById('e-slug').value;
      p.price_number = Number(document.getElementById('e-price').value) || p.price_number;
      p.price = p.price_number + ' ر.س / شهر';
      p.image = document.getElementById('e-image').value;
      p.long = document.getElementById('e-long').value;
      saveToLocal(arr);
      renderList();
    });

    document.getElementById('cancel-edit').addEventListener('click', function(){ renderList(); });
  }

  // initial actions
  loginBtn.addEventListener('click', function(){
    const pass = passInput.value;
    if(pass === PASS){
      adminLogin.style.display='none'; adminArea.style.display='block';
      // load products.json into localStorage if not present
      if(!getLocal()){
        loadProductsSource().then(list => { saveToLocal(list); renderList(); });
      } else renderList();
    } else alert('كلمة المرور غير صحيحة');
  });

  document.getElementById('download-json').addEventListener('click', function(){
    const data = getLocal() || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'products.json'; a.click(); URL.revokeObjectURL(url);
  });

  document.getElementById('copy-json').addEventListener('click', function(){
    const data = getLocal() || [];
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(()=> alert('تم نسخ JSON إلى الحافظة'));
  });

  document.getElementById('reset-local').addEventListener('click', function(){
    if(confirm('إعادة تحميل المنتجات من products.json سيحل محل التغييرات المحلية. متابعة؟')){
      loadProductsSource().then(list => { saveToLocal(list); renderList(); });
    }
  });

  document.getElementById('add-product').addEventListener('click', function(){
    const name = document.getElementById('new-name').value.trim();
    const slug = document.getElementById('new-slug').value.trim();
    const priceNum = Number(document.getElementById('new-price').value) || 0;
    const image = document.getElementById('new-image').value.trim() || '';
    const long = document.getElementById('new-long').value.trim() || '';
    if(!name || !slug){ alert('يرجى إدخال اسم و slug'); return; }
    const arr = getLocal() || [];
    const newItem = { id: slug, type: 'custom', name, short:'', price: priceNum + ' ر.س / شهر', price_number: priceNum, currency:'ر.س', long, features:[], image, slug };
    arr.push(newItem); saveToLocal(arr); renderList();
    // clear
    document.getElementById('new-name').value=''; document.getElementById('new-slug').value=''; document.getElementById('new-price').value=''; document.getElementById('new-image').value=''; document.getElementById('new-long').value='';
  });
})();
