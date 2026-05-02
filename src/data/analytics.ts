/**
 * Google Analytics 4 - Custom Event Tracking
 * 
 * Events tracked:
 * - quiz_started:     user clicks "Start Quiz"
 * - quiz_completed:   user finishes a quiz (with score, time, quiz name)
 * - certificate_downloaded: user downloads the certificate
 * - certificate_shared:     user shares via WhatsApp or LinkedIn
 * - channel_join_clicked:   user clicks "Join Channel Now"
 */

// Safely call gtag (no-op if GA is not loaded or blocked by ad-blocker)
function gtag(...args: unknown[]) {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag(...args);
    }
  } catch {
    // silently ignore - analytics should never break the app
  }
}

export function trackQuizStarted(quizTitle: string, category: string, difficulty: string) {
  gtag('event', 'quiz_started', {
    quiz_title: quizTitle,
    category,
    difficulty,
  });
}

export function trackQuizCompleted(quizTitle: string, category: string, score: number, timeTaken: number) {
  gtag('event', 'quiz_completed', {
    quiz_title: quizTitle,
    category,
    score,
    time_taken: timeTaken,
  });
}

export function trackCertificateDownloaded(quizTitle: string, userName: string) {
  gtag('event', 'certificate_downloaded', {
    quiz_title: quizTitle,
    user_name: userName,
  });
}

export function trackCertificateShared(platform: 'whatsapp' | 'linkedin', quizTitle: string) {
  gtag('event', 'certificate_shared', {
    platform,
    quiz_title: quizTitle,
  });
}

export function trackChannelJoinClicked() {
  gtag('event', 'channel_join_clicked');
}
