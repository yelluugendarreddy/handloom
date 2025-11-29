import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

export default function Signup(){
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo-only: pretend signup succeeded and log user in
    login(email)
    navigate('/home')
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:480, marginTop:20}}>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button className="button" type="submit">Create account</button>
        </form>

        <p style={{marginTop:12}}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}
