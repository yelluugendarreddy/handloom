import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BasketContext, AuthContext } from '../App'

export default function Home() {
  const { basket } = useContext(BasketContext)
  const { user } = useContext(AuthContext)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
  }

  // small mock numbers to make the dashboard feel real (these are placeholders — integrate real metrics later)
  const totalSales = '₹' + (Math.floor(Math.random() * 40000) + 10000).toLocaleString()
  const ordersCount = Math.floor(Math.random() * 120) + 20
  const productsCount = 36

  return (
    <div>
      <div className="page-header container" style={{padding: '10px 0'}}>
        <h1>Dashboard</h1>
      </div>

      <div className="container" style={{paddingBottom: 30}}>
        <div className="dashboard-hero">
          <div className="welcome">
            <h2>Welcome back{user ? `, ${user?.email.split('@')[0]}` : ''} 👋</h2>
            <p>Here's a snapshot of your store — quick access to products, orders and payments.</p>

            <form onSubmit={handleSearch} className="hero-search-bar" style={{marginTop:12}}>
              <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search products, categories, sellers..." />
              <button type="submit">🔍</button>
            </form>

            <div className="quick-actions" style={{marginTop:14}}>
              <button className="btn explore" onClick={()=>navigate('/products')}>Explore products</button>
              <button className="btn orders" onClick={()=>navigate('/basket')}>View cart ({basket.reduce((s,i)=>s+i.qty,0)})</button>
              <button className="btn wallet" onClick={()=>navigate('/contact')}>Contact Sales</button>
            </div>
          </div>

          <div style={{width:280, minWidth:200}}>
            <div className="card" style={{padding:12}}>
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <div style={{width:64, height:64, borderRadius:12, background: 'linear-gradient(135deg,#fde68a,#fb923c)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>H</div>
                <div>
                  <div style={{color:'#111', fontWeight:800}}>Handloom Store</div>
                  <div style={{fontSize:12, color:'#6b7280'}}>Manage orders & payments</div>
                </div>
              </div>

              <div style={{marginTop:10}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:13, color:'#6b7280'}}>
                  <div>Available Balance</div>
                  <div style={{fontWeight:700, color:'#0f172a'}}>₹ 24,350</div>
                </div>
                <div style={{marginTop:10, height:8, background:'#f1f5f9', borderRadius:8, overflow:'hidden'}}>
                  <div style={{width:'62%', height:'100%', background:'linear-gradient(90deg,#34d399,#06b6d4)'}} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics removed — simplified dashboard per request */}

        <div style={{marginTop:20}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 style={{margin:0, color:'#0b2545'}}>Featured products</h2>
            <div style={{color:'#0fe02fff'}}>Curated for your store</div>
          </div>

          <div className="featured-grid" style={{marginTop:12}}>
            <div className="featured-item">
              <img src="/images/img2.jpeg" alt="featured 1" />
              <h3>Pure Cotton Saree</h3>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:700, color:'var(--accent)'}}>₹1299</div>
                <button className="button" onClick={()=>navigate('/products')}>Add</button>
              </div>
            </div>

            <div className="featured-item">
              <img src="/images/img3.jpeg" alt="featured 2" />
              <h3>Handloom Stole</h3>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:700, color:'var(--accent)'}}>₹499</div>
                <button className="button" onClick={()=>navigate('/products')}>Add</button>
              </div>
            </div>

            <div className="featured-item">
              <img src="/images/img14.jpg" alt="featured 3" />
              <h3>Ethnic Dupatta</h3>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:700, color:'var(--accent)'}}>₹699</div>
                <button className="button" onClick={()=>navigate('/products')}>Add</button>
              </div>
            </div>

            <div className="featured-item">
              <img src="/images/img10.jpeg" alt="featured 4" />
              <h3>Handwoven Throw</h3>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:700, color:'var(--accent)'}}>₹1599</div>
                <button className="button" onClick={()=>navigate('/products')}>Add</button>
              </div>
            </div>
          </div>
        </div>

        <footer style={{marginTop:40, padding:'12px 0', textAlign:'center', color:'#1ac740ff', borderTop:'1px solid #e5e7eb'}}>
          © 2025 Handloom — handcrafted cloth marketplace
        </footer>
      </div>
    </div>
  )
}
