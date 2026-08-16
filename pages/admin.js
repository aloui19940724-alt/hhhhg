import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Admin(){
  const [products, setProducts] = useState([]);
  const [logged, setLogged] = useState(false);
  const [pass, setPass] = useState('');
  useEffect(()=>{
    if(logged){
      fetch('/api/products').then(r=>r.json()).then(setProducts);
    }
  },[logged]);

  function download(){
    const blob = new Blob([JSON.stringify(products,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='products.json'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <>
      <Head><title>لوحة الإدارة - متجري</title></Head>
      <nav className="navbar"><div className="container"><div className="logo"><i className="fas fa-store"></i><span>متجري</span></div></div></nav>
      <main className="section">
        <div className="container">
          <h2 className="section-title">لوحة الإدارة</h2>
          {!logged ? (
            <div>
              <label>كلمة المرور:</label>
              <input value={pass} onChange={e=>setPass(e.target.value)} type="password" />
              <button className="btn-buy" onClick={()=>{ if(pass === 'admin2026!') setLogged(true); else alert('كلمة المرور غير صحيحة'); }}>دخول</button>
              <small>كلمة المرور الافتراضية: admin2026!</small>
            </div>
          ) : (
            <div>
              <div style={{display:'flex',gap:10,marginBottom:12}}>
                <button className="btn-buy" onClick={download}>تحميل JSON</button>
                <button className="btn-buy" onClick={()=>{ navigator.clipboard.writeText(JSON.stringify(products,null,2)).then(()=>alert('تم النسخ')) }}>نسخ JSON</button>
              </div>

              <div>
                {products.map((p,idx)=> (
                  <div key={p.id} className="product-card" style={{padding:12,marginBottom:10}}>
                    <div style={{display:'flex',gap:12,alignItems:'center'}}>
                      <img src={p.image} style={{width:90,height:60,objectFit:'cover',borderRadius:8}} />
                      <div style={{flex:1,textAlign:'right'}}>
                        <strong>{p.name}</strong>
                        <div style={{color:'var(--gray)'}}>{p.short}</div>
                        <div style={{marginTop:6}}>{p.price}</div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:6}}>
                        <button className="btn-buy" onClick={()=>{ const name = prompt('الاسم', p.name); if(name){ const copy = [...products]; copy[idx].name = name; setProducts(copy); } }}>تعديل</button>
                        <button className="btn-view" onClick={()=>{ if(confirm('حذف؟')){ const copy = products.filter((_,i)=>i!==idx); setProducts(copy); } }} style={{background:'#ef4444'}}>حذف</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </main>
    </>
  );
}
