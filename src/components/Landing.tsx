import { useState } from 'react';
import { Terminal, Cloud, Brain, Play, ChevronRight, ArrowLeft, Trophy, Zap, BookOpen, Lock } from 'lucide-react';
import type { Quiz, Category } from '../data/quizzes';
import { categories } from '../data/quizzes';
import type { ProgressData } from '../data/storage';
import './Landing.css';

interface LandingProps {
  quizzes: Quiz[];
  onStartQuiz: (quiz: Quiz) => void;
  progress: ProgressData;
}

const iconMap: Record<string, React.ReactNode> = {
  terminal: <Terminal size={32} />,
  cloud: <Cloud size={32} />,
  brain: <Brain size={32} />
};

const smallIconMap: Record<string, React.ReactNode> = {
  terminal: <Terminal size={20} />,
  cloud: <Cloud size={20} />,
  brain: <Brain size={20} />
};

const difficultyEmoji: Record<string, string> = {
  Beginner: '🟢',
  Intermediate: '🟡',
  Advanced: '🔴',
};

export default function Landing({ quizzes, onStartQuiz, progress }: LandingProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const bestOverall = Object.values(progress.bestScores).reduce((max, s) => Math.max(max, s.score), 0);

  // Get quizzes for a category, sorted by difficulty
  const getQuizzesForCategory = (categoryId: string): Quiz[] => {
    const order = { Beginner: 0, Intermediate: 1, Advanced: 2 };
    return quizzes
      .filter(q => q.category === categoryId)
      .sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  };

  const getCompletedCount = (categoryId: string): number => {
    return getQuizzesForCategory(categoryId).filter(q => progress.bestScores[q.id]).length;
  };

  // ─── Category Detail View ───
  if (selectedCategory) {
    const categoryQuizzes = getQuizzesForCategory(selectedCategory.id);
    return (
      <div className="container landing-container">
        <button className="back-to-categories" onClick={() => setSelectedCategory(null)}>
          <ArrowLeft size={18} />
          <span>All Categories</span>
        </button>

        <div className="category-detail-header">
          <div className="category-detail-icon" style={{ background: `${selectedCategory.color}18`, color: selectedCategory.color, border: `1px solid ${selectedCategory.color}40` }}>
            {iconMap[selectedCategory.iconType] || <Play size={32} />}
          </div>
          <h1 className="title">{selectedCategory.name}</h1>
          <p className="subtitle">{selectedCategory.description}</p>
        </div>

        <div className="levels-grid">
          {categoryQuizzes.map((quiz) => {
            const best = progress.bestScores[quiz.id];
            const isLocked = false; // Could add progressive unlock logic here
            return (
              <div key={quiz.id} className={`glass-panel level-card ${isLocked ? 'locked' : ''}`}>
                <div className="level-card-top">
                  <span className="level-difficulty" style={{ color: selectedCategory.color }}>
                    {difficultyEmoji[quiz.difficulty]} {quiz.difficulty}
                  </span>
                  {best && (
                    <span className="level-best">🏅 {best.score}%</span>
                  )}
                </div>

                <h2 className="level-title">{quiz.title}</h2>
                <p className="level-description">{quiz.description}</p>

                <div className="level-meta">
                  <span>{quiz.questions.length} questions</span>
                  <span>⏱️ 30s per question</span>
                </div>

                <button
                  className="button-primary start-button"
                  style={{ background: `linear-gradient(135deg, ${selectedCategory.color}, ${selectedCategory.color}cc)` }}
                  onClick={() => onStartQuiz(quiz)}
                  disabled={isLocked}
                >
                  {isLocked ? <><Lock size={16} /> Locked</> : best ? 'Retry Quiz' : 'Start Quiz'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Main Category View ───
  return (
    <div className="container landing-container">
      <header className="landing-header">
        <img src="/logo.png" alt="Learn AI | Devops | Cloud" className="logo" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <h1 className="title">Weekend <span className="gradient-text">Challenges</span></h1>
        <p className="subtitle">
          Pick a category, choose your level, and prove your skills.
        </p>
      </header>

      {/* Progress Stats Bar */}
      {progress.totalQuizzesTaken > 0 && (
        <div className="progress-stats-bar">
          <div className="stat-item">
            <BookOpen size={16} />
            <span><strong>{progress.totalQuizzesTaken}</strong> quizzes taken</span>
          </div>
          <div className="stat-item">
            <Trophy size={16} />
            <span><strong>{progress.quizzesCompleted.length}</strong> completed</span>
          </div>
          {bestOverall > 0 && (
            <div className="stat-item">
              <Zap size={16} />
              <span>Best: <strong>{bestOverall}%</strong></span>
            </div>
          )}
        </div>
      )}

      <div className="category-grid">
        {categories.map((cat) => {
          const completed = getCompletedCount(cat.id);
          const total = getQuizzesForCategory(cat.id).length;
          return (
            <div
              key={cat.id}
              className="glass-panel category-card"
              onClick={() => setSelectedCategory(cat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedCategory(cat)}
            >
              <div className="category-icon" style={{ background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}40` }}>
                {iconMap[cat.iconType] || <Play size={32} />}
              </div>
              <h2 className="category-name">{cat.name}</h2>
              <p className="category-desc">{cat.description}</p>

              <div className="category-levels">
                {getQuizzesForCategory(cat.id).map((q) => {
                  const done = !!progress.bestScores[q.id];
                  return (
                    <div key={q.id} className={`category-level-dot ${done ? 'done' : ''}`}>
                      {smallIconMap[cat.iconType]}
                      <span>{q.difficulty}</span>
                      {done && <span className="dot-check">✓</span>}
                    </div>
                  );
                })}
              </div>

              {completed > 0 && (
                <div className="category-progress">
                  <div className="category-progress-bar">
                    <div className="category-progress-fill" style={{ width: `${(completed / total) * 100}%`, background: cat.color }} />
                  </div>
                  <span className="category-progress-text">{completed}/{total}</span>
                </div>
              )}

              <div className="category-cta" style={{ color: cat.color }}>
                Explore <ChevronRight size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
