import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Admin() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (session) {
      fetch('/api/products')
        .then((r) => r.json())
        .then(setProducts)
        .catch(console.error);
    }
  }, [session]);

  function download() {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Head>
        <title>لوحة الإدارة - متجري</title>
      </Head>

      <nav className="navbar">
        <div className="container">
          <div className="logo"><i className="fas fa-store"></i><span>متجري</span></div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <h2 className="section-title">لوحة الإدارة</h2>

          {status === 'loading' && <p>جار التحقق...</p>}

          {!session && status !== 'loading' && (
            <div style={{ maxWidth: 520 }}>
              <p>أدخل بريدك الإلكتروني لتلقي رابط تسجيل الدخول (Magic Link).</p>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e6e9ef' }}
              />
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button className="btn-buy" onClick={() => signIn('email', { email, redirect: false })}>
                  إرسال رابط التسجيل
                </button>
                <small style={{ alignSelf: 'center', color: 'var(--gray)' }}>ستصلك رسالة بالبريد خلال دقائق.</small>
              </div>
            </div>
          )}

          {session && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>مرحباً، {session.user?.email}</div>
                <div>
                  <button className="btn-view" onClick={() => signOut({ callbackUrl: '/' })}>
                    تسجيل الخروج
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button className="btn-buy" onClick={download}>
                  تحميل JSON
                </button>
                <button
                  className="btn-buy"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(products, null, 2)).then(() => alert('تم نسخ JSON'));
                  }}
                >
                  نسخ JSON
                </button>
              </div>

              <div style={{ marginTop: 18 }}>
                {products.map((p, idx) => (
                  <div key={p.id} className="product-card" style={{ padding: 12, marginBottom: 10 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <img src={p.image} style={{ width: 90, height: 60, objectFit: 'cover', borderRadius: 8 }} alt="" />
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        <strong>{p.name}</strong>
                        <div style={{ color: 'var(--gray)' }}>{p.short}</div>
                        <div style={{ marginTop: 6 }}>{p.price}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <button
                          className="btn-buy"
                          onClick={() => {
                            const name = prompt('الاسم', p.name);
                            if (name) {
                              const copy = [...products];
                              copy[idx].name = name;
                              setProducts(copy);
                            }
                          }}
                        >
                          تعديل
                        </button>
                        <button
                          className="btn-view"
                          onClick={() => {
                            if (confirm('حذف؟')) {
                              const copy = products.filter((_, i) => i !== idx);
                              setProducts(copy);
                            }
                          }}
                          style={{ background: '#ef4444' }}
                        >
                          حذف
                        </button>
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
