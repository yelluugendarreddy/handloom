import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(135deg, #ff8c00, #ffb347)",
      margin: 0,
      padding: 0,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        textAlign: "center",
        background: "#fff",
        padding: "50px 40px",
        borderRadius: "16px",
        maxWidth: "550px",
        width: "90%",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
        animation: "fadeIn 1s ease-in-out"
      }}>
        <div style={{
          fontSize: "60px",
          color: "#ff6600",
          marginBottom: "15px"
        }}>✅</div>
        <h2 style={{
          color: "#ff6600",
          marginBottom: "10px",
          fontWeight: 600,
          fontSize: "26px"
        }}>Thank You for Your Order!</h2>
        <p style={{
          color: "#555",
          fontSize: "15px",
          marginBottom: "25px",
          lineHeight: 1.6
        }}>Your order has been received successfully.
          Our team will process it shortly and contact you with delivery updates.</p>

        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: "#ff6600",
            color: "white",
            border: "none",
            padding: "14px 28px",
            fontSize: "16px",
            fontWeight: 600,
            borderRadius: "10px",
            cursor: "pointer",
            transition: "background 0.3s ease"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#e65c00"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#ff6600"}
        >
          Continue Shopping
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}