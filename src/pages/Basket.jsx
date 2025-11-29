import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasketContext } from '../App';

export default function Basket() {
  const navigate = useNavigate();
  const { basket, addToBasket, removeFromBasket } = useContext(BasketContext);

  const calculateTotal = (items) => items.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);

  const removeItem = (id) => removeFromBasket(id);
  const clearAll = () => {
    basket.forEach(item => removeFromBasket(item.id));
  };
  const increaseQty = (item) => addToBasket(item);
  const decreaseQty = (item) => {
    if (item.qty > 1) {
      // Remove one and add back with reduced quantity
      removeFromBasket(item.id);
      addToBasket({ ...item, qty: item.qty - 1 });
    } else {
      removeFromBasket(item.id);
    }
  };

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ff8c00, #ffb347)'
    }}>
      <div style={{ width: '90%', maxWidth: 700, background: '#fff', padding: 30, borderRadius: 16, boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
        <h2 style={{ textAlign: 'center', color: '#ff6600', fontWeight: 600, marginBottom: 25 }}>Your Basket</h2>

        <div>
          {basket.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontSize: 16, marginTop: 30 }}>Your basket is empty </p>
          ) : (
            basket.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                <img src={item.image} alt={item.name} style={{ width: 60, borderRadius: 8, marginRight: 10 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 500, color: '#333' }}>{item.name}</span>
                  <span style={{ color: '#444', fontWeight: 500, marginTop: 5 }}>₹{(item.price * (item.qty || 1)).toFixed(0)}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <button onClick={() => decreaseQty(item)} style={{ padding: '4px 8px', background: '#ff6600', color: '#fff', border: 'none', borderRadius: 5 }}>-</button>
                    <span>{item.qty || 1}</span>
                    <button onClick={() => increaseQty(item)} style={{ padding: '4px 8px', background: '#ff6600', color: '#fff', border: 'none', borderRadius: 5 }}>+</button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', color: '#ff3300', cursor: 'pointer' }}>Remove</button>
              </div>
            ))
          )}
        </div>

        {basket.length > 0 && (
          <div style={{ textAlign: 'right', fontWeight: 600, color: '#333', fontSize: 18, marginTop: 20 }}>Total: ₹{calculateTotal(basket)}</div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 25, flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/products')} style={{ flex: 1, padding: 14, background: '#ff6600', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}> Back to Products</button>
          <button onClick={() => navigate('/delivery')} style={{ flex: 1, padding: 14, background: '#ff6600', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>Proceed to Delivery</button>
          <button onClick={clearAll} style={{ flex: 1, padding: 14, background: '#ff6600', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>Clear Basket</button>
        </div>
      </div>
    </div>
  );
}
