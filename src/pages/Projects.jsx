import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import './Projects.css'

function Projects() {

  return (
    <div className="projects-page">
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <h1>Нашите проекти</h1>
        </div>


        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
              <div className="project-poster">
                <img
                  src={project.poster}
                  alt={project.title}
                  onError={(e) => {
                    // Prevent infinite loop by checking if fallback was already tried
                    if (!e.target.dataset.fallback) {
                      e.target.dataset.fallback = 'true'
                      e.target.src = 'data:image/svg+xml;base64,' + btoa(`
                        <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
                          <rect width="300" height="450" fill="#1a1a1a"/>
                          <text x="150" y="225" font-family="Arial" font-size="16" fill="#d4a574" text-anchor="middle" dominant-baseline="middle">
                            ${project.title}
                          </text>
                        </svg>
                      `)
                    }
                  }}
                />
              </div>
              
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
              </div>
            </Link>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Projects