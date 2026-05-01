import { useState, useEffect } from 'react';
import { quizzes } from './data/quizzes';
import type { Quiz } from './data/quizzes';
import { addLeaderboardEntry, updateProgress, getProgress } from './data/storage';
import Landing from './components/Landing';
import QuizEngine from './components/QuizEngine';
import Results from './components/Results';
import AnswerReview from './components/AnswerReview';

type AppState = 'landing' | 'quiz' | 'results' | 'review';

function App() {
  const [view, setView] = useState<AppState>('landing');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [rank, setRank] = useState<number>(0);
  const [progress, setProgress] = useState(getProgress());

  // Refresh progress when returning to landing
  useEffect(() => {
    if (view === 'landing') {
      setProgress(getProgress());
    }
  }, [view]);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setScore(0);
    setTimeTaken(0);
    setSelectedOptions({});
    setRank(0);
    setView('quiz');
  };

  const handleFinishQuiz = (finalScore: number, finalTime: number, options: Record<number, number>) => {
    setScore(finalScore);
    setTimeTaken(finalTime);
    setSelectedOptions(options);
    setView('results');
  };

  const handleSetUserName = (name: string) => {
    setUserName(name);
    if (selectedQuiz) {
      // Save to leaderboard & progress
      const newRank = addLeaderboardEntry({
        name,
        score,
        timeTaken,
        date: new Date().toISOString(),
        quizId: selectedQuiz.id,
      });
      setRank(newRank);
      updateProgress(selectedQuiz.id, score, timeTaken);
    }
  };

  const handleBackToHome = () => {
    setSelectedQuiz(null);
    setScore(0);
    setTimeTaken(0);
    setSelectedOptions({});
    setView('landing');
  };

  return (
    <div className="app-container">
      {view === 'landing' && (
        <Landing quizzes={quizzes} onStartQuiz={handleStartQuiz} progress={progress} />
      )}
      
      {view === 'quiz' && selectedQuiz && (
        <QuizEngine 
          quiz={selectedQuiz} 
          onFinish={handleFinishQuiz}
          onCancel={handleBackToHome}
        />
      )}

      {view === 'results' && selectedQuiz && (
        <Results 
          quiz={selectedQuiz}
          score={score}
          timeTaken={timeTaken}
          userName={userName}
          setUserName={handleSetUserName}
          onRestart={handleBackToHome}
          onReviewAnswers={() => setView('review')}
          rank={rank}
        />
      )}

      {view === 'review' && selectedQuiz && (
        <AnswerReview
          quiz={selectedQuiz}
          selectedOptions={selectedOptions}
          onClose={() => setView('results')}
        />
      )}
    </div>
  );
}

export default App;
