import React from 'react'

export default function About() {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="page-header">
        <h1>About Handloom Fashion</h1>
        <p>Celebrating India's Rich Textile Heritage</p>
      </div>

      {/* Main Content */}
      <div className="content-grid">
        <div className="card feature-card">
          <h2>Our Heritage</h2>
          <p>
            At Handloom Fashion, we're dedicated to preserving and promoting India's rich handloom traditions. 
            Our products celebrate the intricate craftsmanship passed down through generations of skilled artisans.
          </p>
        </div>

        <div className="card feature-card">
          <h2>Our Mission</h2>
          <p>
            We strive to support local artisans while bringing authentic handloom products to a global audience. 
            Each piece tells a story of tradition, skill, and cultural heritage.
          </p>
        </div>

        <div className="card feature-card">
          <h2>Quality & Authenticity</h2>
          <p>
            Every product in our collection is carefully curated, ensuring the highest quality and authenticity. 
            We work directly with artisans to bring you genuine handloom creations.
          </p>
        </div>

        <div className="card feature-card">
          <h2>Sustainable Fashion</h2>
          <p>
            We believe in sustainable fashion that respects both traditions and the environment. 
            Our handloom products represent a conscious choice for eco-friendly, timeless pieces.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <span className="value-icon">🎨</span>
            <h3>Artisan Support</h3>
            <p>Empowering local craftsmen and preserving traditional skills</p>
          </div>
          <div className="value-item">
            <span className="value-icon">🌿</span>
            <h3>Sustainability</h3>
            <p>Promoting eco-friendly and sustainable fashion choices</p>
          </div>
          <div className="value-item">
            <span className="value-icon">💫</span>
            <h3>Quality</h3>
            <p>Ensuring excellence in every handcrafted piece</p>
          </div>
          <div className="value-item">
            <span className="value-icon">🤝</span>
            <h3>Community</h3>
            <p>Building a community that appreciates traditional crafts</p>
          </div>
        </div>
      </div>
    </div>
  )
}
