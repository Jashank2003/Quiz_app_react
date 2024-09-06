import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizCard from './QuizCard';
import useNavigationBlocking from '../useNavigationBlocking'; // Import the custom hook
import { FaClock } from 'react-icons/fa';

const QuizArea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // To store questions 
  const [questions, setQuestions] = useState([]);
  // To store index of current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // To store time left in secondsfor each question
  const [timeLeft, setTimeLeft] = useState(45);
  // To store user answers or summary after the test
  const [userAnswers, setUserAnswers] = useState([]);
  // To show summary or not
  const [showSummary, setShowSummary] = useState(false);
  // Initial countdown when quiz will start
  const [showInitialCountdown, setShowInitialCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);
  // Trying custom hook to prevent false back navigation
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Use the custom hook not working currently 
  const [isBlocking, setIsBlocking] = useNavigationBlocking('Are you sure you want to leave? Your progress will be lost.');

  useEffect(() => {
    // To get questions from location.state which is passed from LandingPage as in a state property
    if (location.state && location.state.questions) {
      setQuestions(location.state.questions);
    }
    // To show countdown when quiz starts
    if (questions.length > 0 && showInitialCountdown) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setShowInitialCountdown(false);
            setTimeLeft(45);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else if (!showInitialCountdown) {
      const questionTimer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 1 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(questionTimer);
    }
  }, [location.state, questions, showInitialCountdown]);

  useEffect(() => {
    if (timeLeft === 0 && !showSummary) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleAnswerSelect = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = selectedAnswer;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setShowSummary(true);
      return;
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTimeLeft(45);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setTimeLeft(45);
    setUserAnswers([]);
    setShowSummary(false);
    setShowInitialCountdown(true);
    setCountdown(3);
  };

  const handleBackToHome = () => {
    setShowConfirmation(true);
  };

  const confirmNavigation = (confirm) => {
    if (confirm) {
      navigate('/');
    }
    setShowConfirmation(false);
  };

  if (showInitialCountdown) {
    return (
      <div>
          <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      {/* Clock Icon */}
      <div className="mb-4">
        <FaClock className="text-6xl text-yellow-400" />
      </div>

      {/* Countdown Text */}
      <h2 className="text-4xl font-bold">
        Quiz starts in <span className="text-yellow-400">{countdown}</span>...
      </h2>
    </div>
      </div>
    );
  }

  if (showSummary) {
    const score = userAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correct_answer ? acc + 1 : acc;
    }, 0);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
        <p className="text-lg mb-6">Final Score: <span className="text-yellow-400">{score}</span> / {questions.length}</p>
        
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <ul className="list-disc list-inside space-y-4">
  {questions.map((question, index) => {
    const isCorrect = userAnswers[index] === question.correct_answer;
    
    return (
      <li
        key={index}
        className={`border border-gray-700 p-4 rounded-md  ${
          isCorrect ? 'border-green-500' : 'border-red-500'
        }`}
      >
        <strong className="block text-lg mb-2">Q{index + 1}: {question.question}</strong>
        <p><span className="font-semibold">Your Answer:</span> {userAnswers[index]}</p>
        <p><span className="font-semibold">Correct Answer:</span> {question.correct_answer}</p>
      </li>
    );
  })}
</ul>

        <div className="flex mt-6 space-x-4">
          <button
            onClick={handleRetry}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Retry Quiz
          </button>
          <button
            onClick={handleBackToHome}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-white mb-4">Do you want to leave the quiz? Your progress will be lost.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => confirmNavigation(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Yes
          </button>
          <button
            onClick={() => confirmNavigation(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
    );
  }

  if (questions.length === 0) {
    return <h2>Loading...</h2>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Timer Section */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <FaClock className="text-yellow-400" />
        <span className="text-xl">{timeLeft}s</span>
      </div>

      {/* Quiz Card */}
      <div className="flex flex-col items-center w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <QuizCard
          question={currentQuestion.question}
          options={options}
          onAnswerSelect={handleAnswerSelect}
          questionIndex={currentQuestionIndex}
        />
      </div>

      {/* Buttons */}
      <div className="flex mt-6 space-x-4">
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Next Question
        </button>
        <button
          onClick={handleBackToHome}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default QuizArea;
