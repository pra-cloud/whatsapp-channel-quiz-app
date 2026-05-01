import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { Quiz } from '../data/quizzes';
import './QuizEngine.css';

interface QuizEngineProps {
  quiz: Quiz;
  onFinish: (score: number, timeTaken: number, selectedOptions: Record<number, number>) => void;
  onCancel: () => void;
}

const SECONDS_PER_QUESTION = 30;

export default function QuizEngine({ quiz, onFinish, onCancel }: QuizEngineProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [timedOut, setTimedOut] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasSelected = selectedOptions[currentQuestionIndex] !== undefined;
  const progressPercentage = ((currentQuestionIndex) / quiz.questions.length) * 100;
  const isTimeCritical = questionTimeLeft <= 10;

  // Total time counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Per-question countdown
  useEffect(() => {
    setQuestionTimeLeft(SECONDS_PER_QUESTION);
    setTimedOut(false);
  }, [currentQuestionIndex]);

  const handleAutoAdvance = useCallback(() => {
    if (isLastQuestion) {
      // Submit quiz
      let score = 0;
      quiz.questions.forEach((q, index) => {
        if (selectedOptions[index] === q.correctAnswerIndex) {
          score++;
        }
      });
      const finalScorePercentage = Math.round((score / quiz.questions.length) * 100);
      onFinish(finalScorePercentage, totalSecondsElapsed, selectedOptions);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [isLastQuestion, quiz.questions, selectedOptions, totalSecondsElapsed, onFinish]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimedOut(true);
          // Auto-advance after a brief pause
          setTimeout(() => handleAutoAdvance(), 1200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex, handleAutoAdvance]);

  const handleSelectOption = (optionIndex: number) => {
    if (timedOut) return;
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (timedOut) return;
    if (isLastQuestion) {
      let score = 0;
      quiz.questions.forEach((q, index) => {
        if (selectedOptions[index] === q.correctAnswerIndex) {
          score++;
        }
      });
      const finalScorePercentage = Math.round((score / quiz.questions.length) * 100);
      onFinish(finalScorePercentage, totalSecondsElapsed, selectedOptions);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Countdown ring calculation
  const countdownPercentage = (questionTimeLeft / SECONDS_PER_QUESTION) * 100;

  return (
    <div className="container quiz-container">
      <div className="quiz-header">
        <button className="back-button" onClick={onCancel}>
          <ArrowLeft size={20} />
          <span>Exit Quiz</span>
        </button>
        <div className="quiz-header-right" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="quiz-timer" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--accent-blue)', fontWeight: 600 }}>
            <Clock size={16} />
            <span>{formatTime(totalSecondsElapsed)}</span>
          </div>
          <div className="quiz-progress-meta">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="glass-panel question-panel">
        {/* Countdown timer */}
        <div className={`countdown-bar ${isTimeCritical ? 'critical' : ''} ${timedOut ? 'expired' : ''}`}>
          <div className="countdown-fill" style={{ width: `${countdownPercentage}%` }} />
          <div className="countdown-text">
            {timedOut ? (
              <><AlertTriangle size={14} /> Time's Up!</>
            ) : (
              <><Clock size={14} /> {questionTimeLeft}s</>
            )}
          </div>
        </div>

        <h2 className="question-text">{currentQuestion.text}</h2>
        
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOptions[currentQuestionIndex] === index;
            return (
              <button
                key={index}
                className={`option-button ${isSelected ? 'selected' : ''} ${timedOut ? 'disabled' : ''}`}
                onClick={() => handleSelectOption(index)}
                disabled={timedOut}
              >
                <div className="option-content">
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </div>
                {isSelected && <CheckCircle2 className="option-check" size={20} />}
              </button>
            );
          })}
        </div>

        <div className="question-actions">
          <button 
            className="button-secondary action-btn" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            style={{ opacity: currentQuestionIndex === 0 ? 0 : 1 }}
          >
            <ArrowLeft size={18} />
            <span>Previous</span>
          </button>

          <button 
            className={`button-primary action-btn ${!hasSelected || timedOut ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!hasSelected || timedOut}
          >
            <span>{isLastQuestion ? 'Submit & Get Badge' : 'Next Question'}</span>
            {!isLastQuestion && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
