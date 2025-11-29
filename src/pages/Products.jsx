import React, { useContext, useState, useEffect } from 'react'
import { BasketContext } from '../App'

const PRODUCTS = [
  { id: 1, name: 'Bag', price: 1200, image: '/images/img2.jpeg' },
  { id: 2, name: 'Each Saree', price: 1500, image: '/images/img3.jpeg' },
  { id: 3, name: 'Saree', price: 5500, image: '/images/img4.jpeg' },
  { id: 4, name: 'Saree', price: 6500, image: '/images/img5.webp' },
  { id: 5, name: 'Shirt', price: 1000, image: '/images/img6.jpg' },
  { id: 6, name: 'Shirt', price: 900, image: '/images/img7.jpg' },
  { id: 7, name: 'Slippers', price: 700, image: '/images/img8.jpeg' },
  { id: 8, name: 'Slipper', price: 600, image: '/images/img10.jpeg' },
  { id: 9, name: 'Cushions', price: 350, image: '/images/img11.jpg' },
  { id: 10, name: 'Wall Hanging', price: 250, image: '/images/img12.webp' },
  { id: 11, name: 'Decoration Item', price: 200, image: '/images/img13.jpg' },
  { id: 12, name: 'Handloom Stoles', price: 200, image: '/images/img14.jpg' },
  { id: 13, name: 'Towel', price: 150, image: '/images/img15.jpg' },
  { id: 14, name: 'Hats', price: 400, image: '/images/img16.jpeg' }
]

export default function Products() {
  const { addToBasket } = useContext(BasketContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS)

  useEffect(() => {
    const filtered = PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm])

  // Tawk.to Integration
  useEffect(() => {
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/68d61e4927d62b194f180193/1j626ck0e';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [])

  const handleAddToBasket = (product) => {
    addToBasket(product)
    alert(`${product.name} added to basket!`)
  }

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search Handloom Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p className={`no-results ${filteredProducts.length === 0 ? 'visible' : ''}`}>
        No matching products found.
      </p>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <img 
              src={product.image} 
              alt={product.name}
              onError={(e) => {
                console.log('Image failed to load:', product.image);
                e.target.src = 'https://via.placeholder.com/200x200?text=Product+Image';
              }}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <h3>{product.name}</h3>
            <div className="price-row">
              <div style={{fontSize:18, color:'var(--accent)'}}>₹{product.price}</div>
              <div className="old-price">₹{Math.round(product.price * 1.15)}</div>
              <div style={{marginLeft:'auto'}} className="offer-badge">20% OFF</div>
            </div>
            <button 
              className="button"
              onClick={() => handleAddToBasket(product)}
            >
              Add to Basket
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '2rem', textAlign: 'center', padding: '15px 0' }}>
        <p>&copy; 2025 Handloom Fashion. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
