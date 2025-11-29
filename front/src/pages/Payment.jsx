import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BasketContext, AuthContext } from '../App';

export default function Payment() {
  const { basket, removeFromBasket } = useContext(BasketContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [merchant, setMerchant] = useState({ upiId: 'merchant@upi', name: 'Handloom' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const delivery = location.state || {};

  useEffect(() => {
    // try fetching merchant info from backend. If your backend is running on a
    // different origin set VITE_API_BASE in your .env (e.g. VITE_API_BASE=http://localhost:5000)
    // default to localhost:5000 during local development if VITE_API_BASE is not set
    const base = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
    fetch(`${base}/api/payments/info`).then(r => r.json()).then(data => setMerchant(data)).catch(() => {});
  }, []);

  const calculateTotal = (items) => items.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
  const total = Math.round(calculateTotal(basket));

  const openUPIPay = () => {
    // Build a UPI deep-link. On mobile this will open the UPI app.
    const pa = encodeURIComponent(merchant.upiId);
    const pn = encodeURIComponent(merchant.name || 'Handloom');
    const am = encodeURIComponent(total.toString());
    const uri = `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR`;

    // Some browsers block direct navigation, so use window.open
    window.open(uri);
  };

  const confirmPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const base = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
      const body = {
        userEmail: user?.email || 'guest@handloom',
        upiId: merchant.upiId,
        amount: total,
        items: basket.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty || 1 })),
        delivery
      };

      const res = await fetch(`${base}/api/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Payment failed');

      // Clear basket after successful payment
      basket.forEach(item => removeFromBasket(item.id));

      // Navigate to thank you
      navigate('/thank-you');
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#ff8c00,#ffb347)' }}>
      <div style={{ width: '95%', maxWidth: 700, background: '#fff', padding: 28, borderRadius: 14, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
        <h2 style={{ textAlign: 'center', color: '#ff6600', marginBottom: 20 }}>UPI Payment</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          <div style={{ padding: 12, borderRadius: 8, border: '1px solid #eee', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#444' }}>Payee (merchant) UPI ID</div>
              <div style={{ marginTop: 8, fontSize: 18, color: '#111' }}>{merchant.upiId}</div>
              <div style={{ marginTop: 6, color: '#666', fontSize: 13 }}>Please pay exactly the total amount shown below using your preferred UPI app.</div>
            </div>

            {/* QR image comes from /images/qr.jpeg (public folder) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.open('/images/qr.jpeg', '_blank')}>
              <img alt="UPI QR code" src="/images/qr.jpeg" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
              <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Scan QR to pay</div>
            </div>
          </div>

          <div style={{ padding: 12, borderRadius: 8, border: '1px solid #eee' }}>
            <div style={{ fontWeight: 600 }}>Order Total</div>
            <div style={{ marginTop: 8, fontSize: 22, color: '#111', fontWeight: 700 }}>₹{total}</div>
            <div style={{ color: '#666', marginTop: 8 }}>Only the total price of products is allowed for payment — amount is non-editable.</div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button onClick={openUPIPay} style={{ flex: 1, padding: 12, background: '#00a86b', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>Open UPI app to Pay</button>
            <button onClick={() => navigator.clipboard?.writeText(merchant.upiId)} style={{ padding: 12, background: '#fff', border: '1px solid #ddd', borderRadius: 10, cursor: 'pointer' }}>Copy UPI ID</button>
          </div>

          <div style={{ marginTop: 6, color: '#444' }}>
            After paying in your app, click below to confirm — we will record the payment against this order (this example records a payment server-side).
          </div>

          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

          {basket.length === 0 && (
            <div style={{ color: '#aa6600', fontWeight: 600, padding: 8 }}>Your basket is empty — add products before confirming payment.</div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={confirmPayment} disabled={loading || basket.length === 0} style={{ flex: 1, padding: 12, background: loading || basket.length === 0 ? '#e0a070' : '#ff6600', color: '#fff', border: 'none', borderRadius: 10, cursor: loading || basket.length === 0 ? 'not-allowed' : 'pointer' }}>{loading ? 'Processing…' : 'Confirm Payment'}</button>
            <button onClick={() => navigate('/basket')} style={{ padding: 12, background: '#fff', border: '1px solid #ddd', borderRadius: 10, cursor: 'pointer' }}>Back to basket</button>
          </div>
        </div>
      </div>
    </div>
  );
}
