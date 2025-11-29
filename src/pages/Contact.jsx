import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo: just show success message
    setSent(true)
  }

  return (
    <div className="container">
      {/* Page Header */}
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd Love to Hear from You</p>
      </div>

      <div className="contact-layout">
        {/* Contact Information */}
        <div className="contact-info">
          <div className="card info-card">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Visit Us</h4>
                <p>123 Handloom Street<br />Textile District<br />Mumbai, 400001</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h4>Call Us</h4>
                <p>+91 123 456 7890</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <h4>Email Us</h4>
                <p>info@handloomfashion.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form card">
          {sent ? (
            <div className="success-message">
              <h3>Thank You! 🎉</h3>
              <p>Your message has been received. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <button className="button" type="submit">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
