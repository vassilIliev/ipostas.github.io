import './Contact.css'

function Contact() {

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Свържете се с нас</h1>
            <p>Готови сме да обсъдим вашия следващ проект</p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-content">
            {/* Contact Cards */}
            <div className="contact-cards centered">
              <div className="contact-card">
                <div className="card-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10s4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.627 0 12-5.372 12-12 0-6.627-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/>
                  </svg>
                </div>
                <h3>Управител</h3>
                <p>Петър Петров - Перо</p>
              </div>

              <div className="contact-card">
                <div className="card-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3>Имейл</h3>
                <a href="mailto:ipostas93@gmail.com">ipostas93@gmail.com</a>
              </div>

              <div className="contact-card">
                <div className="card-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <h3>Телефон</h3>
                <a href="tel:+359892353510">089 235 3510</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact