import { getImageUrl } from '../utils/imageUtils'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <img 
              src={getImageUrl("/images/projects/logos/Asset 2-8.png")} 
              alt="ИПОСТАС Logo" 
              className="footer-logo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <h3 className="footer-logo-fallback" style={{display: 'none'}}>ИПОСТАС</h3>
            <div className="footer-contact">
              <a href="mailto:ipostas93@gmail.com" className="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                ipostas93@gmail.com
              </a>
              <a href="tel:+359892353510" className="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                089 235 3510
              </a>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; {currentYear} ИПОСТАС</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
