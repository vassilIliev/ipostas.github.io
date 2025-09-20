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
                    e.target.src = `https://via.placeholder.com/300x450/1a1a1a/d4a574?text=${encodeURIComponent(project.title)}`
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