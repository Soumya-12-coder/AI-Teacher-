import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, FileText, CheckCircle, Clock, Users, Star, Github, ExternalLink, Target, Code } from 'lucide-react'

const ProjectViewer = () => {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [completedPhases, setCompletedPhases] = useState([])
  const [projectStarted, setProjectStarted] = useState(false)

  useEffect(() => {
    // Mock project data - in real app, this would come from API
    const mockProject = {
      id: parseInt(projectId),
      title: 'Build a Security Monitoring Dashboard',
      description: 'Create a comprehensive security monitoring dashboard using React and Python backend to visualize security metrics and alerts.',
      category: 'Cybersecurity',
      difficulty: 'Intermediate',
      duration: '2-3 weeks',
      rating: 4.8,
      students: 450,
      technologies: ['React', 'Python', 'Flask', 'D3.js', 'PostgreSQL'],
      repository: 'https://github.com/example/security-dashboard',
      demoUrl: 'https://demo.security-dashboard.com',
      phases: [
        {
          id: 1,
          title: 'Project Setup & Planning',
          description: 'Set up development environment and create project structure.',
          estimatedTime: '2-3 hours',
          tasks: [
            'Create project repository',
            'Set up development environment',
            'Install required dependencies',
            'Create initial project structure',
            'Write project documentation'
          ],
          deliverables: [
            'Project repository with README',
            'Development environment setup guide',
            'Project structure documentation'
          ],
          resources: [
            'React documentation',
            'Flask quickstart guide',
            'PostgreSQL setup guide'
          ]
        },
        {
          id: 2,
          title: 'Backend API Development',
          description: 'Develop REST API endpoints for security data management.',
          estimatedTime: '1-2 weeks',
          tasks: [
            'Design database schema',
            'Create Flask application structure',
            'Implement authentication endpoints',
            'Develop security metrics API',
            'Add data validation and error handling'
          ],
          deliverables: [
            'REST API with authentication',
            'Database schema and migrations',
            'API documentation',
            'Unit tests for API endpoints'
          ],
          resources: [
            'Flask-RESTful documentation',
            'SQLAlchemy ORM guide',
            'JWT authentication tutorial'
          ]
        },
        {
          id: 3,
          title: 'Frontend Dashboard Development',
          description: 'Create responsive dashboard interface with data visualization.',
          estimatedTime: '1-2 weeks',
          tasks: [
            'Design dashboard layout',
            'Implement authentication flow',
            'Create data visualization components',
            'Add responsive design',
            'Implement real-time updates'
          ],
          deliverables: [
            'Responsive dashboard interface',
            'Data visualization components',
            'User authentication system',
            'Real-time update functionality'
          ],
          resources: [
            'React Router documentation',
            'D3.js tutorial',
            'Chart.js examples'
          ]
        },
        {
          id: 4,
          title: 'Integration & Testing',
          description: 'Integrate frontend and backend, implement comprehensive testing.',
          estimatedTime: '3-5 days',
          tasks: [
            'Connect frontend to backend API',
            'Implement error handling',
            'Add loading states and user feedback',
            'Write integration tests',
            'Perform security testing'
          ],
          deliverables: [
            'Fully integrated application',
            'Comprehensive test suite',
            'Error handling implementation',
            'Security audit report'
          ],
          resources: [
            'Jest testing framework',
            'Cypress end-to-end testing',
            'OWASP security guidelines'
          ]
        },
        {
          id: 5,
          title: 'Deployment & Documentation',
          description: 'Deploy application and create comprehensive documentation.',
          estimatedTime: '2-3 days',
          tasks: [
            'Set up production environment',
            'Configure deployment pipeline',
            'Create user documentation',
            'Record demonstration video',
            'Prepare project presentation'
          ],
          deliverables: [
            'Deployed application',
            'Deployment documentation',
            'User guide and documentation',
            'Demo video and presentation'
          ],
          resources: [
            'Docker deployment guide',
            'Heroku deployment tutorial',
            'Documentation best practices'
          ]
        }
      ]
    }

    setProject(mockProject)
  }, [projectId])

  const handleStartProject = () => {
    setProjectStarted(true)
  }

  const handlePhaseComplete = (phaseId) => {
    if (!completedPhases.includes(phaseId)) {
      setCompletedPhases([...completedPhases, phaseId])
    }
  }

  const handleNextPhase = () => {
    if (currentPhase < project.phases.length - 1) {
      setCurrentPhase(currentPhase + 1)
    }
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const currentPhaseData = project.phases[currentPhase]
  const progress = Math.round((completedPhases.length / project.phases.length) * 100)

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link to="/projects" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {!projectStarted ? (
        /* Project Introduction */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Start Project?</h2>
            <p className="text-gray-600 mb-6">
              This hands-on project will guide you through building a real-world application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{project.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-medium">{project.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{project.students}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Phases</h3>
            <div className="space-y-3">
              {project.phases.map((phase, index) => (
                <div key={phase.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{phase.title}</h4>
                    <p className="text-sm text-gray-600">{phase.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {phase.estimatedTime}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Github className="w-5 h-5 mr-2" />
              View Repository
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Demo
            </a>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartProject}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Project
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Phase {currentPhase + 1}: {currentPhaseData.title}
                </h2>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{currentPhaseData.estimatedTime}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{currentPhaseData.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tasks</h3>
                <ul className="space-y-2">
                  {currentPhaseData.tasks.map((task, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Target className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Deliverables</h3>
                <ul className="space-y-2">
                  {currentPhaseData.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Resources</h3>
                <ul className="space-y-2">
                  {currentPhaseData.resources.map((resource, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <ExternalLink className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  {completedPhases.includes(currentPhaseData.id) ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Phase Completed</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePhaseComplete(currentPhaseData.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {currentPhase > 0 && (
                    <button
                      onClick={() => setCurrentPhase(currentPhase - 1)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {currentPhase < project.phases.length - 1 && (
                    <button
                      onClick={handleNextPhase}
                      disabled={!completedPhases.includes(currentPhaseData.id)}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Next Phase
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{project.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-medium">{project.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{project.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{project.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Phases</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {project.phases.map((phase, index) => (
                    <div
                      key={phase.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        index === currentPhase ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentPhase(index)}
                    >
                      {completedPhases.includes(phase.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : index === currentPhase ? (
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{index + 1}</span>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          <span className="text-gray-400 text-xs font-medium">{index + 1}</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{phase.title}</p>
                        <p className="text-xs text-gray-500">{phase.estimatedTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Links</h3>
              <div className="space-y-3">
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5 mr-3" />
                  Repository
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 mr-3" />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectViewer