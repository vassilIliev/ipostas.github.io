import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActiveLink = (path) => {
    return location.pathname === path
  }

  const scrollToAbout = (e) => {
    e.preventDefault()
    closeMenu()
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = '/#about'
      return
    }
    
    // Scroll to about section with offset for fixed header
    setTimeout(() => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const headerHeight = 80 // Account for fixed header
        const elementPosition = aboutSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  // Handle hash navigation when page loads
  useEffect(() => {
    if (location.hash === '#about') {
      setTimeout(() => {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          const headerHeight = 80
          const elementPosition = aboutSection.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 500) // Wait for page to fully load
    }
  }, [location.hash])

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <div className="logo-container">
              <img 
                src="/images/projects/logos/Asset 2-8.png" 
                alt="ИПОСТАС Logo" 
                className="logo-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'block'
                }}
              />
              <div className="logo-text-fallback" style={{display: 'none'}}>
                <span className="logo-text">ИПОСТАС</span>
              </div>
            </div>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Начало
            </Link>
            <a 
              href="#about" 
              className="nav-link"
              onClick={scrollToAbout}
            >
              За нас
            </a>
            <Link 
              to="/projects" 
              className={`nav-link ${isActiveLink('/projects') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Проекти
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Контакти
            </Link>
          </nav>

          <button 
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
