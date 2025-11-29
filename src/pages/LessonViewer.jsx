import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Users, Star, CheckCircle, PlayCircle, Award, MessageCircle } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import Quiz from '../components/Quiz'

const LessonViewer = () => {
  const { lessonId } = useParams()
  const [lesson, setLesson] = useState(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)

  useEffect(() => {
    // Mock lesson data - in real app, this would come from API
    const mockLesson = {
      id: parseInt(lessonId),
      title: 'Introduction to Cybersecurity',
      description: 'Learn the fundamentals of cybersecurity including threat landscape, security principles, and basic defensive techniques.',
      category: 'Cybersecurity',
      difficulty: 'Beginner',
      duration: '45 min',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      students: 1250,
      sections: [
        {
          id: 1,
          title: 'What is Cybersecurity?',
          duration: '8 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          subtitles: [
            { src: '/subtitles/section1-en.vtt', label: 'English', srclang: 'en' }
          ],
          description: 'Understanding the basics of cybersecurity and why it matters in today\'s digital world.'
        },
        {
          id: 2,
          title: 'Common Threats and Vulnerabilities',
          duration: '12 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          subtitles: [
            { src: '/subtitles/section2-en.vtt', label: 'English', srclang: 'en' }
          ],
          description: 'Explore the most common cyber threats and security vulnerabilities.'
        },
        {
          id: 3,
          title: 'Security Principles and Best Practices',
          duration: '15 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          subtitles: [
            { src: '/subtitles/section3-en.vtt', label: 'English', srclang: 'en' }
          ],
          description: 'Learn fundamental security principles and implement best practices.'
        },
        {
          id: 4,
          title: 'Practical Security Measures',
          duration: '10 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          subtitles: [
            { src: '/subtitles/section4-en.vtt', label: 'English', srclang: 'en' }
          ],
          description: 'Implement practical security measures to protect systems and data.'
        }
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What is the primary goal of cybersecurity?',
            options: [
              'To prevent all computer usage',
              'To protect digital assets and information',
              'To monitor user activities',
              'To restrict internet access'
            ],
            correctAnswer: 1
          },
          {
            id: 2,
            question: 'Which of the following is NOT a common cyber threat?',
            options: [
              'Malware',
              'Phishing',
              'Software updates',
              'Social engineering'
            ],
            correctAnswer: 2
          },
          {
            id: 3,
            question: 'What does CIA stand for in cybersecurity?',
            options: [
              'Central Intelligence Agency',
              'Confidentiality, Integrity, Availability',
              'Computer Internet Access',
              'Cyber Intelligence Analysis'
            ],
            correctAnswer: 1
          }
        ]
      }
    }

    setLesson(mockLesson)
  }, [lessonId])

  const handleSectionComplete = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId])
    }
  }

  const handleNextSection = () => {
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handleQuizComplete = () => {
    setLessonCompleted(true)
    setShowQuiz(false)
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const currentSectionData = lesson.sections[currentSection]
  const progress = Math.round(((completedSections.length + (showQuiz ? 1 : 0)) / lesson.sections.length) * 100)

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link to="/lessons" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-gray-600">{lesson.description}</p>
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
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {!showQuiz ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Video Player */}
              <VideoPlayer
                videoUrl={currentSectionData.videoUrl}
                subtitles={currentSectionData.subtitles}
                onEnded={() => handleSectionComplete(currentSectionData.id)}
              />

              {/* Section Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentSectionData.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{currentSectionData.duration}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{currentSectionData.description}</p>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {completedSections.includes(currentSectionData.id) && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {currentSection > 0 && (
                      <button
                        onClick={() => setCurrentSection(currentSection - 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    <button
                      onClick={handleNextSection}
                      disabled={!completedSections.includes(currentSectionData.id)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {currentSection < lesson.sections.length - 1 ? 'Next Section' : 'Take Quiz'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Quiz
              questions={lesson.quiz.questions}
              onComplete={handleQuizComplete}
              lessonTitle={lesson.title}
            />
          )}

          {/* Completion Certificate */}
          {lessonCompleted && (
            <div className="mt-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Congratulations!</h3>
              <p className="text-center text-green-100 mb-4">
                You have successfully completed "{lesson.title}"
              </p>
              <div className="text-center">
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Download Certificate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lesson Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Instructor</span>
                <span className="font-medium">{lesson.instructor}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{lesson.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Difficulty</span>
                <span className="font-medium">{lesson.difficulty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Students</span>
                <span className="font-medium">{lesson.students}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{lesson.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sections List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {lesson.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      index === currentSection ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentSection(index)}
                  >
                    <div className="flex items-center space-x-3">
                      {completedSections.includes(section.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : index === currentSection ? (
                        <PlayCircle className="w-5 h-5 text-blue-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{section.title}</p>
                        <p className="text-sm text-gray-500">{section.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Discussion */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Discussion</h3>
              <MessageCircle className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Join the conversation with other students and get help from the instructor.
            </p>
            <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              View Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonViewer