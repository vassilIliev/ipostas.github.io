import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { getImageUrl } from '../utils/imageUtils'
import { useIsMobile } from '../hooks/useIsMobile'
import './ProjectDetail.css'

function ProjectDetail() {
  const { projectId } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const isMobile = useIsMobile()

  // Hooks must be called first, before any early returns
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsLightboxOpen(false)
    } else if (e.key === 'ArrowLeft') {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : project.images.length - 1)
    } else if (e.key === 'ArrowRight') {
      setCurrentImageIndex(prev => prev < project.images.length - 1 ? prev + 1 : 0)
    }
  }, [isLightboxOpen])

  useEffect(() => {
    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleKeyDown, isLightboxOpen])

  // Find the project after hooks are defined
  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return (
      <div className="project-detail-loading">
        <h2>Проектът не е намерен</h2>
        <Link to="/projects" className="btn">
          Обратно към проектите
        </Link>
      </div>
    )
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex(prev => prev < project.images.length - 1 ? prev + 1 : 0)
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : project.images.length - 1)
  }

  return (
    <div className="project-detail">
      <div className="container">
        {/* Back Button */}
        <div className="back-button">
          <Link to="/projects" className="back-link">
            ← Обратно към проектите
          </Link>
        </div>

        {/* Project Header */}
        <div className="project-header">
          <div className="project-poster">
            <img
              src={getImageUrl(project.poster)}
              alt={project.title}
              onError={(e) => {
                // Prevent infinite loop by checking if fallback was already tried
                if (!e.target.dataset.fallback) {
                  e.target.dataset.fallback = 'true'
                  e.target.src = 'data:image/svg+xml;base64,' + btoa(`
                    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
                      <rect width="400" height="600" fill="#1a1a1a"/>
                      <text x="200" y="300" font-family="Arial" font-size="16" fill="#d4a574" text-anchor="middle" dominant-baseline="middle">
                        ${project.title}
                      </text>
                    </svg>
                  `)
                }
              }}
            />
          </div>

          <div className="project-main-info">
            <h1>{project.title}</h1>
            <p className="project-description">{project.description}</p>
          </div>
        </div>

        {/* Project Details and Gallery */}
        <div className={`project-content ${!(project.director || project.consultants) ? 'no-sidebar' : ''}`}>
          {/* Only show project sidebar if project has credit details */}
          {(project.director || project.consultants) && (
            <div className="project-sidebar">
              <h3>Детайли за проекта</h3>
            <div className="project-details">
              {/* Common fields for projects that don't have custom fields */}
              {project.id !== 'invasion' && project.id !== 'sweet-death' && project.id !== 'sunny-line' && (
                <>
                  <div className="detail-item">
                    <span className="detail-label">Режисьор:</span>
                    <span className="detail-value">{project.director}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Участват:</span>
                    <span className="detail-value">{project.participants}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Музика:</span>
                    <span className="detail-value">{project.music}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Сценография:</span>
                    <span className="detail-value">{project.scenography}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Мултимедия:</span>
                    <span className="detail-value">{project.multimedia}</span>
                  </div>
                </>
              )}

                {/* Special fields for sweet-death project */}
                {project.id === 'sweet-death' && (
                  <>
                    <div className="detail-item">
                      <span className="detail-label">Режисьор:</span>
                      <span className="detail-value">{project.director}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Сценография и костюми:</span>
                      <span className="detail-value">{project.scenographyAndCostumes}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Музика:</span>
                      <span className="detail-value">{project.music}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Участват:</span>
                      <span className="detail-value">{project.participants}</span>
                    </div>
                  </>
              )}

              {/* Special fields for sunny-line project */}
              {project.id === 'sunny-line' && (
                <>
                  <div className="detail-item">
                    <span className="detail-label">Режисьор:</span>
                    <span className="detail-value">{project.director}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Участват:</span>
                    <span className="detail-value">{project.participants}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Композитор:</span>
                    <span className="detail-value">{project.composer}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Сценография:</span>
                    <span className="detail-value">{project.scenography}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Превод:</span>
                    <span className="detail-value">{project.translation}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Плакат:</span>
                    <span className="detail-value">{project.posterDesign}</span>
                  </div>
                </>
              )}

              {/* Special fields for invasion project */}
              {project.id === 'invasion' && (
                  <>
                    <div className="detail-item">
                      <span className="detail-label">Консултанти:</span>
                      <span className="detail-value">{project.consultants}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Сценография и костюми:</span>
                      <span className="detail-value">{project.scenographyAndCostumes}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Музика:</span>
                      <span className="detail-value">{project.music}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Превод:</span>
                      <span className="detail-value">{project.translation}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Участват:</span>
                      <span className="detail-value">{project.participants}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Графичен дизайнер - Плакат:</span>
                      <span className="detail-value">{project.graphicDesigner}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Image Gallery */}
          <div className="project-gallery">
            <h3>Галерия</h3>
            <div className="gallery-grid">
            {project.images.map((image, index) => (
              <div
                key={index}
                className={`gallery-item ${isMobile ? 'mobile-no-click' : ''}`}
                onClick={isMobile ? undefined : () => openLightbox(index)}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${project.title} - кадър ${index + 1}`}
                  onError={(e) => {
                    // Prevent infinite loop by checking if fallback was already tried
                    if (!e.target.dataset.fallback) {
                      e.target.dataset.fallback = 'true'
                      e.target.src = 'data:image/svg+xml;base64,' + btoa(`
                        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                          <rect width="300" height="200" fill="#1a1a1a"/>
                          <text x="150" y="100" font-family="Arial" font-size="16" fill="#d4a574" text-anchor="middle" dominant-baseline="middle">
                            ${project.title}
                          </text>
                        </svg>
                      `)
                    }
                  }}
                />
                <div className="gallery-overlay">
                  <div className="zoom-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && !isMobile && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <img
              src={getImageUrl(project.images[currentImageIndex])}
              alt={`${project.title} - кадър ${currentImageIndex + 1}`}
              onError={(e) => {
                // Prevent infinite loop by checking if fallback was already tried
                if (!e.target.dataset.fallback) {
                  e.target.dataset.fallback = 'true'
                  e.target.src = 'data:image/svg+xml;base64,' + btoa(`
                    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                      <rect width="800" height="600" fill="#1a1a1a"/>
                      <text x="400" y="300" font-family="Arial" font-size="16" fill="#d4a574" text-anchor="middle" dominant-baseline="middle">
                        ${project.title}
                      </text>
                    </svg>
                  `)
                }
              }}
            />
            
            <button className="lightbox-nav lightbox-next" onClick={nextImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>
            
            <div className="lightbox-counter">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail