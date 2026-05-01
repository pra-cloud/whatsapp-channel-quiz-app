// localStorage-based leaderboard & progress utilities

export interface LeaderboardEntry {
  name: string;
  score: number;
  timeTaken: number;
  date: string;
  quizId: string;
}

export interface ProgressData {
  totalQuizzesTaken: number;
  quizzesCompleted: string[]; // unique quiz IDs
  bestScores: Record<string, { score: number; time: number }>;
}

const LEADERBOARD_KEY = 'quiz_leaderboard';
const PROGRESS_KEY = 'quiz_progress';
const MAX_ENTRIES_PER_QUIZ = 10;

// ─── Leaderboard ───

export function getLeaderboard(quizId?: string): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const all: LeaderboardEntry[] = JSON.parse(raw);
    const filtered = quizId ? all.filter(e => e.quizId === quizId) : all;
    return filtered.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
  } catch {
    return [];
  }
}

export function addLeaderboardEntry(entry: LeaderboardEntry): number {
  const all = getLeaderboard();
  all.push(entry);
  
  // Keep only top N per quiz
  const grouped: Record<string, LeaderboardEntry[]> = {};
  for (const e of all) {
    if (!grouped[e.quizId]) grouped[e.quizId] = [];
    grouped[e.quizId].push(e);
  }
  
  const trimmed: LeaderboardEntry[] = [];
  for (const quizId of Object.keys(grouped)) {
    const sorted = grouped[quizId].sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
    trimmed.push(...sorted.slice(0, MAX_ENTRIES_PER_QUIZ));
  }
  
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  
  // Return the rank (1-indexed) of the new entry in its quiz
  const quizEntries = trimmed
    .filter(e => e.quizId === entry.quizId)
    .sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
  
  return quizEntries.findIndex(
    e => e.name === entry.name && e.score === entry.score && e.timeTaken === entry.timeTaken && e.date === entry.date
  ) + 1;
}

// ─── Progress ───

export function getProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { totalQuizzesTaken: 0, quizzesCompleted: [], bestScores: {} };
    return JSON.parse(raw);
  } catch {
    return { totalQuizzesTaken: 0, quizzesCompleted: [], bestScores: {} };
  }
}

export function updateProgress(quizId: string, score: number, time: number): void {
  const progress = getProgress();
  
  progress.totalQuizzesTaken += 1;
  
  if (!progress.quizzesCompleted.includes(quizId)) {
    progress.quizzesCompleted.push(quizId);
  }
  
  const existing = progress.bestScores[quizId];
  if (!existing || score > existing.score || (score === existing.score && time < existing.time)) {
    progress.bestScores[quizId] = { score, time };
  }
  
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
