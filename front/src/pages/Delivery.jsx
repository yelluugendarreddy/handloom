import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Delivery() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass delivery details to payment page where the user will complete payment
    navigate('/payment', { state: formData });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ff8c00, #ffb347)',
      padding: '20px'
    }}>
      <div style={{
        width: '90%',
        maxWidth: 600,
        background: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#ff6600', marginBottom: '25px' }}>Delivery Details</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#444' }}>Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#444' }}>Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#444' }}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#444' }}>Delivery Address *</label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows="3"
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ color: '#444' }}>City *</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ color: '#444' }}>State *</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#444' }}>PIN Code *</label>
            <input
              type="text"
              name="pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => navigate('/basket')}
              style={{
                flex: 1,
                padding: '14px',
                background: '#ff6600',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Back to Basket
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '14px',
                background: '#ff6600',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}