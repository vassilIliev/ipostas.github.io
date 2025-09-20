import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getImageUrl } from '../utils/imageUtils'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

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
    
    // Check if we're on the home page
    const isOnHomePage = location.pathname === '/'
    
    if (!isOnHomePage) {
      // Navigate to home page first, then scroll will be handled by useEffect
      navigate('/', { state: { scrollToAbout: true } })
      return
    }
    
    // If already on home page, scroll to about section
    scrollToAboutSection()
  }
  
  const scrollToAboutSection = () => {
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

  // Handle navigation from other pages to about section
  useEffect(() => {
    // Handle hash navigation when page loads
    if (location.hash === '#about') {
      scrollToAboutSection()
    }
    
    // Handle navigation with state (when coming from other pages)
    if (location.state?.scrollToAbout && location.pathname === '/') {
      scrollToAboutSection()
      // Clear the state to prevent scrolling on subsequent renders
      navigate('/', { replace: true })
    }
  }, [location.hash, location.state, location.pathname, navigate])

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <div className="logo-container">
              <img 
                src={getImageUrl("/images/projects/logos/Asset 2-8.png")} 
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
