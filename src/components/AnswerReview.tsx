import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { Quiz } from '../data/quizzes';
import './AnswerReview.css';

interface AnswerReviewProps {
  quiz: Quiz;
  selectedOptions: Record<number, number>;
  onClose: () => void;
}

export default function AnswerReview({ quiz, selectedOptions, onClose }: AnswerReviewProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="review-overlay">
      <div className="review-container">
        <div className="review-header">
          <h2>📋 Answer Review</h2>
          <p className="review-subtitle">
            {quiz.questions.filter((q, i) => selectedOptions[i] === q.correctAnswerIndex).length} of {quiz.questions.length} correct
          </p>
          <button className="review-close-btn" onClick={onClose}>
            ← Back to Results
          </button>
        </div>

        <div className="review-list">
          {quiz.questions.map((question, index) => {
            const userAnswer = selectedOptions[index];
            const isCorrect = userAnswer === question.correctAnswerIndex;
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={question.id}
                className={`review-card ${isCorrect ? 'correct' : 'wrong'}`}
              >
                <div className="review-card-header" onClick={() => toggleExpand(index)}>
                  <div className="review-card-status">
                    {isCorrect
                      ? <CheckCircle2 size={22} className="icon-correct" />
                      : <XCircle size={22} className="icon-wrong" />
                    }
                  </div>
                  <div className="review-card-question">
                    <span className="review-q-number">Q{index + 1}.</span>
                    <span>{question.text}</span>
                  </div>
                  <div className="review-card-toggle">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="review-card-body">
                    <div className="review-options">
                      {question.options.map((option, optIdx) => {
                        const isUserPick = userAnswer === optIdx;
                        const isCorrectOption = question.correctAnswerIndex === optIdx;
                        let className = 'review-option';
                        if (isCorrectOption) className += ' correct-option';
                        if (isUserPick && !isCorrectOption) className += ' wrong-option';

                        return (
                          <div key={optIdx} className={className}>
                            <span className="review-option-letter">{String.fromCharCode(65 + optIdx)}</span>
                            <span className="review-option-text">{option}</span>
                            {isCorrectOption && <span className="review-badge correct-badge">✓ Correct</span>}
                            {isUserPick && !isCorrectOption && <span className="review-badge wrong-badge">✗ Your Answer</span>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="review-explanation">
                      <strong>💡 Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
