import products from '../../products.json';
import Head from 'next/head';

export async function getStaticPaths(){
  const paths = products.map(p => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }){
  const p = products.find(x => x.slug === params.slug) || null;
  return { props: { product: p } };
}

export default function ProductPage({ product }){
  if(!product) return <p>المنتج غير موجود.</p>;
  return (
    <>
      <Head>
        <title>{product.name} — متجري</title>
        <meta name="description" content={product.short} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.short} />
        <meta property="og:image" content={product.image} />
      </Head>

      <nav className="navbar"><div className="container"><div className="logo"><i className="fas fa-store"></i><span>متجري</span></div></div></nav>
      <main className="section">
        <div className="container product-detail">
          <div className="product-detail-card">
            <div className="product-media">
              <img src={product.image} alt={product.name} style={{width:'100%',borderRadius:12,maxHeight:420,objectFit:'cover'}} />
            </div>
            <div className="product-info">
              <h1>{product.name}</h1>
              <p className="price">{product.price}</p>
              <p className="product-long">{product.long}</p>
              <ul className="features">{product.features.map((f,i)=>(<li key={i}>✓ {f}</li>))}</ul>
              <div style={{display:'flex',gap:10,marginTop:15}}>
                <button className="btn-buy" onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966501234567'}?text=${encodeURIComponent('مرحبا! أريد شراء: '+product.name)}`, '_blank')}>اشتر الآن</button>
                <a className="btn-view" href="/">العودة للمتجر</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
