import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import { getImageUrl } from './utils/imageUtils'
import './App.css'

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Debug logging for deployment issues
  useEffect(() => {
    console.log('=== DEPLOYMENT DEBUG INFO ===')
    console.log('Current URL:', window.location.href)
    console.log('Base URL:', import.meta.env.BASE_URL)
    console.log('Environment:', import.meta.env.MODE)
    console.log('Production:', import.meta.env.PROD)
    console.log('Development:', import.meta.env.DEV)
    console.log('Build time:', typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : 'Unknown')
    console.log('Router basename:', import.meta.env.BASE_URL)
    console.log('==============================')
  }, [])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <img 
            src={getImageUrl("/images/projects/logos/Asset 2-8.png")} 
            alt="ИПОСТАС Logo" 
            className="loading-logo"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'block'
            }}
          />
          <div className="loading-text-fallback" style={{display: 'none'}}>
            <h2>ИПОСТАС</h2>
            <p>Продуцентска компания</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App