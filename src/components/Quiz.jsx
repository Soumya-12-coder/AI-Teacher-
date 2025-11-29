import React, { useState } from 'react'
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react'

const Quiz = ({ questions, onComplete, lessonTitle }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setQuizCompleted(true)
    if (onComplete) {
      onComplete()
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setQuizCompleted(false)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    }
  }

  const score = showResults ? calculateScore() : null
  const currentQ = questions[currentQuestion]
  const isAnswered = selectedAnswers[currentQ?.id] !== undefined

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {score.percentage >= 70 ? (
              <Trophy className="w-16 h-16 text-yellow-500" />
            ) : (
              <RotateCcw className="w-16 h-16 text-orange-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Results</h2>
          <p className="text-gray-600">{lessonTitle}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{score.correct}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">{score.total - score.correct}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{score.percentage}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[question.id]
            const isCorrect = userAnswer === question.correctAnswer
            
            return (
              <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Question {index + 1}: {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = userAnswer === optionIndex
                        const isCorrectOption = optionIndex === question.correctAnswer
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              isCorrectOption
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : isSelected
                                ? 'bg-red-50 border-red-200 text-red-800'
                                : 'bg-gray-50 border-gray-200 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                              <span>{option}</span>
                              {isCorrectOption && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                              )}
                              {isSelected && !isCorrectOption && (
                                <XCircle className="w-4 h-4 text-red-500 ml-auto" />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRetry}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Retry Quiz
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {score.percentage >= 70 ? 'Complete Lesson' : 'Continue Anyway'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Quiz</h2>
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQ.question}
        </h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers[currentQ.id] === index
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQ.id] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQ.id] === index && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="font-medium text-gray-700">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  )
}

export default Quiz