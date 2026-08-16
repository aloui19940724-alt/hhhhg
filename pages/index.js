import Link from 'next/link';
import products from '../products.json';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>متجري - البوتات والاشتراكات</title>
        <meta name="description" content="متجر لبيع البوتات والاشتراكات" />
      </Head>

      <nav className="navbar">
        <div className="container">
          <div className="logo"><i className="fas fa-store"></i><span>متجري</span></div>
          <ul className="nav-links">
            <li><a href="#bots">البوتات</a></li>
            <li><a href="#subscriptions">الاشتراكات</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
            <li><Link href="/admin"><a>لوحة الإدارة</a></Link></li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content container">
          <h1>أفضل البوتات والاشتراكات</h1>
          <p>احصل على البوتات الذكية والاشتراكات الممتازة بأفضل الأسعار</p>
        </div>
      </section>

      <main>
        <section id="bots" className="section">
          <div className="container">
            <h2 className="section-title">🤖 البوتات المتاحة</h2>
            <p className="section-subtitle">بوتات ذكية لجميع المنصات</p>

            <div className="products-grid">
              {products.filter(p => p.type === 'bot').map(p => (
                <div key={p.id} className="product-card">
                  <div className="product-icon"><i className="fas fa-box"></i></div>
                  <h3>{p.name}</h3>
                  <p>{p.short}</p>
                  <ul className="features">
                    {p.features.map((f, i) => <li key={i}>✓ {f}</li>)}
                  </ul>
                  <div className="price">{p.price}</div>
                  <div className="card-actions">
                    <Link href={`/products/${p.slug}`}><a className="btn-view">عرض المنتج</a></Link>
                    <button className="btn-buy" onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966501234567'}?text=${encodeURIComponent('مرحبا! أريد شراء: '+p.name)}`, '_blank')}>اشتر الآن</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="subscriptions" className="section alt-bg">
          <div className="container">
            <h2 className="section-title">💳 اشتراكات المنصات</h2>
            <p className="section-subtitle">اشتراكات رسمية بأسعار مخفضة</p>

            <div className="products-grid">
              {products.filter(p => p.type === 'subscription').map(p => (
                <div key={p.id} className="subscription-card">
                  <div className="platform-icon"><i className="fas fa-box"></i></div>
                  <h3>{p.name}</h3>
                  <p>{p.short}</p>
                  <div className="original-price">{p.original_price || ''}</div>
                  <div className="discount-price">{p.price}</div>
                  <small className="discount-label">{p.discount_label || ''}</small>
                  <div className="card-actions">
                    <Link href={`/products/${p.slug}`}><a className="btn-view">عرض المنتج</a></Link>
                    <button className="btn-buy" onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966501234567'}?text=${encodeURIComponent('مرحبا! أريد شراء: '+p.name)}`, '_blank')}>اشتر الآن</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title">تواصل معنا</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3>معلومات التواصل</h3>
                <div className="info-item"><i className="fas fa-phone"></i><span>+966 50 123 4567</span></div>
                <div className="info-item"><i className="fas fa-envelope"></i><span>info@marketplace.com</span></div>
                <div className="info-item"><i className="fas fa-map-marker-alt"></i><span>السعودية</span></div>
              </div>
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); const name = e.target.name.value; const email = e.target.email.value; const msg = e.target.message.value; window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966501234567'}?text=${encodeURIComponent('مرسل: '+name+'\nالبريد: '+email+'\nالرسالة: '+msg)}`, '_blank'); e.target.reset(); }}>
                <input name="name" type="text" placeholder="اسمك" required />
                <input name="email" type="email" placeholder="بريدك الإلكتروني" required />
                <textarea name="message" placeholder="رسالتك" rows="5" required></textarea>
                <button type="submit" className="btn-buy">إرسال</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container"><p>&copy; 2024 متجري. جميع الحقوق محفوظة.</p></div>
      </footer>
    </>
  );
}
