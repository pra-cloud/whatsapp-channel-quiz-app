import { Trophy, Clock, Medal } from 'lucide-react';
import { getLeaderboard, type LeaderboardEntry } from '../data/storage';
import './Leaderboard.css';

interface LeaderboardProps {
  quizId: string;
  quizTitle: string;
  highlightName?: string; // highlight current user's entry
}

export default function Leaderboard({ quizId, quizTitle, highlightName }: LeaderboardProps) {
  const entries = getLeaderboard(quizId).slice(0, 5);

  if (entries.length === 0) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 0) return <Trophy size={16} className="medal gold" />;
    if (rank === 1) return <Medal size={16} className="medal silver" />;
    if (rank === 2) return <Medal size={16} className="medal bronze" />;
    return <span className="rank-number">{rank + 1}</span>;
  };

  return (
    <div className="leaderboard-panel">
      <div className="leaderboard-title">
        <Trophy size={18} />
        <span>Top Scores — {quizTitle}</span>
      </div>
      <div className="leaderboard-list">
        {entries.map((entry: LeaderboardEntry, index: number) => {
          const isHighlighted = highlightName && entry.name === highlightName;
          return (
            <div
              key={`${entry.name}-${entry.date}-${index}`}
              className={`leaderboard-row ${isHighlighted ? 'highlighted' : ''}`}
            >
              <div className="leaderboard-rank">{getMedalIcon(index)}</div>
              <div className="leaderboard-name">{entry.name}</div>
              <div className="leaderboard-score">{entry.score}%</div>
              <div className="leaderboard-time">
                <Clock size={12} />
                {formatTime(entry.timeTaken)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
