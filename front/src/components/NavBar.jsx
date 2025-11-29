import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext, BasketContext } from '../App'

export default function NavBar(){
  const { user, logout } = useContext(AuthContext)
  const { basket } = useContext(BasketContext)
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/home')
  }

  return (
    <nav style={{background: 'var(--accent)', padding: '0.5rem 0', position: 'sticky', top:0, zIndex:60}}>
      <div className="container header-links" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
          <Link to="/home" style={{display:'flex', alignItems:'center', gap:12, color:'#fff', textDecoration:'none'}}>
            <div style={{width:46, height:36, borderRadius:6, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)', fontWeight:800}}>H</div>
            <strong style={{color: '#fff', letterSpacing:0.6, marginLeft:6}}>Handloom</strong>
          </Link>
        </div>

        <div style={{flex:1, margin:'0 1rem', display:'flex', justifyContent:'center'}}>
          <input
            type="search"
            placeholder="Search for products, brands and more"
            style={{width:'60%', maxWidth:720, padding:'10px 14px', borderRadius:4, border:'none', outline:'none'}}
          />
        </div>

        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <Link to="/products" style={{color:'#fff', textDecoration:'none'}}>Explore</Link>
          {/* Admin portal removed */}
          <Link to="/basket" style={{color:'#f0e8e8ff', textDecoration:'none'}}>Cart ({basket.reduce((s,i)=>s+i.qty,0)})</Link>
          {user ? (
            <>
              <span style={{color:'rgba(255,255,255,0.9)'}}>Hi, {user.email}</span>
              <button className="button secondary" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{color:'#fff', textDecoration:'none'}}>Login</Link>
              <Link to="/signup" style={{color:'#fff', textDecoration:'none'}}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
