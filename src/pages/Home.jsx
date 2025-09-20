import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Home.css'

// Project Carousel Component
function ProjectCarousel() {
  const [currentImage, setCurrentImage] = useState(0)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  
  // Selection of images from different projects
  const galleryImages = [
    {
      src: '/images/projects/morphine/Морфин 19-0539.jpg',
      project: 'Морфин',
      alt: 'Кадър от Морфин'
    },
    {
      src: '/images/projects/invasion/SPAM-5547.jpg',
      project: 'Нахлуване',
      alt: 'Кадър от Нахлуване'
    },
    {
      src: '/images/projects/sweet-death/TEA09042.jpg',
      project: 'Сладка смърт',
      alt: 'Кадър от Сладка смърт'
    },
    {
      src: '/images/projects/morphine/Морфин 27-0608.jpg',
      project: 'Морфин',
      alt: 'Кадър от Морфин'
    },
    {
      src: '/images/projects/sunny-line/10 (1 of 1).jpg',
      project: 'Слънчева линия',
      alt: 'Кадър от Слънчева линия'
    },
    {
      src: '/images/projects/invasion/SPAM-5573.jpg',
      project: 'Нахлуване',
      alt: 'Кадър от Нахлуване'
    }
  ]

  // Auto-advance carousel only if user hasn't interacted
  useEffect(() => {
    if (hasUserInteracted) return

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length)
    }, 4000)
    
    return () => clearInterval(timer)
  }, [galleryImages.length, hasUserInteracted])

  const nextImage = () => {
    setHasUserInteracted(true)
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setHasUserInteracted(true)
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToImage = (index) => {
    setHasUserInteracted(true)
    setCurrentImage(index)
  }

  return (
    <div className="project-carousel">
      <div className="carousel-container">
        <button className="carousel-btn carousel-prev" onClick={prevImage} aria-label="Previous image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div className="carousel-images">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-image ${index === currentImage ? 'active' : ''}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x300/1a1a1a/d4a574?text=${encodeURIComponent(image.project)}`
                }}
              />
              <div className="image-overlay">
                <span className="project-name">{image.project}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-btn carousel-next" onClick={nextImage} aria-label="Next image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
      
      <div className="carousel-indicators">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImage ? 'active' : ''}`}
            onClick={() => goToImage(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title fade-in">
              ИПОСТАС
            </h1>
            <p className="hero-description slide-up">
            Независима културна организация, която работи предимно с артисти от независимия културен сектор. Най-важната ѝ цел е да даде предпоставка на млади дейци да развият своя потенциал в изкуството. 
            </p>
            <div className="hero-buttons slide-up">
              <Link to="/projects" className="btn">
                Разгледайте проектите
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Свържете се с нас
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section-padding">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>За нас</h2>
              <p>
              Ипостас ЕООД е независима културна организация, представлявана от нейния основател и управител – Петър Силви Петров, с основна дейност - производство, продуциране и разпространение на културни продукти. Организацията работи предимно с артисти от независимия културен сектор, като нейна най-важна цел е да даде предпоставка и основа на млади културни дейци да развиват своя творчески потенциал в сферата на изкуството. До този момент организацията е реализирала шест проекта, с финансова помощ от НФК, Министерство на културата и Столична Община, давайки възможност на над 30 артисти от различни културни направления, да надградят своя професионален профил посредством участие в дейностите на организацията.
              </p>
            </div>
            <div className="about-gallery">
              <ProjectCarousel />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
