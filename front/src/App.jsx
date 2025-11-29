import React, { createContext, useState, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Basket from './pages/Basket'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ThankYou from './pages/ThankYou'
import Payment from './pages/Payment'
import Delivery from './pages/Delivery'

export const AuthContext = createContext()
export const BasketContext = createContext()

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('handloom_user')) || null)
  const [basket, setBasket] = useState([])

  const login = (email) => {
    const u = { email }
    setUser(u)
    localStorage.setItem('handloom_user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('handloom_user')
  }

  const addToBasket = (product) => {
    setBasket(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromBasket = (id) => {
    setBasket(prev => prev.filter(p => p.id !== id))
  }

  // Small wrapper to protect routes that require authentication
  const ProtectedRoute = ({ children }) => {
    const { user: currentUser } = useContext(AuthContext)
    if (!currentUser) return <Navigate to="/login" replace />
    return children
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
        <NavBar />
        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes - require login */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/basket" element={<ProtectedRoute><Basket /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/thank-you" element={<ProtectedRoute><ThankYou /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/delivery" element={<ProtectedRoute><Delivery /></ProtectedRoute>} />
            
            {/* Admin portal removed */}
          </Routes>
        </main>
      </BasketContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
