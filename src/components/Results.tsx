import { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { Download, Share2, RefreshCcw, Globe, CheckCircle, Loader2, X, Copy, ExternalLink, Image, ClipboardList } from 'lucide-react';
import type { Quiz } from '../data/quizzes';
import Certificate from './Certificate';
import Leaderboard from './Leaderboard';
import './Results.css';

interface ResultsProps {
  quiz: Quiz;
  score: number;
  timeTaken: number;
  userName: string;
  setUserName: (name: string) => void;
  onRestart: () => void;
  onReviewAnswers: () => void;
  rank: number;
}

type ShareModal = {
  platform: 'whatsapp' | 'linkedin';
  steps: { done: boolean; label: string }[];
  platformUrl: string;
} | null;

export default function Results({ quiz, score, timeTaken, userName, setUserName, onRestart, onReviewAnswers, rank }: ResultsProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const isPass = score >= 70;
  const [toast, setToast] = useState<string | null>(null);
  const [sharing, setSharing] = useState<string | null>(null);
  const [shareModal, setShareModal] = useState<ShareModal>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (isPass) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3b82f6', '#8b5cf6', '#10b981']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3b82f6', '#8b5cf6', '#10b981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isPass]);

  // Generate certificate as a File object for native sharing
  const getCertificateFile = async (): Promise<File | null> => {
    if (!certificateRef.current) return null;
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#0f172a',
        useCORS: true
      });
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const fileName = `${userName.replace(/\s+/g, '_')}_${quiz.topic}_Badge.png`;
            resolve(new File([blob], fileName, { type: 'image/png' }));
          } else {
            resolve(null);
          }
        }, 'image/png');
      });
    } catch (err) {
      console.error('Failed to generate image', err);
      return null;
    }
  };

  // Download certificate as PNG
  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#0f172a',
        useCORS: true
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${userName.replace(/\s+/g, '_')}_${quiz.topic}_Badge.png`;
      link.click();
    } catch (err) {
      console.error('Failed to generate certificate image', err);
      showToast('Failed to generate certificate. Please try again.');
    }
  };

  // Copy text to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  };

  const channelUrl = 'https://www.whatsapp.com/channel/0029Vb6GcAx42DccXkOfoW1h';
  const appUrl = window.location.origin;
  const shareText = `I just scored ${score}% on the ${quiz.title} quiz by Learn AI | Devops | Cloud! 🚀 Test your skills too!\n\nTake the quiz: ${appUrl}\n\nJoin the channel: ${channelUrl}`;

  // Only use native Web Share API on actual mobile devices (Android/iOS)
  // On Windows/Mac desktop, native share opens useless OS share sheet (Nearby Sharing, OneNote, etc.)
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);

  // ─── WhatsApp Status Share ───
  const handleWhatsAppShare = async () => {
    setSharing('whatsapp');
    try {
      // Mobile ONLY: use native share with certificate image
      if (isMobile) {
        const file = await getCertificateFile();
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `${quiz.title} Quiz Results`,
              text: shareText,
            });
            return;
          } catch (err: unknown) {
            if (err instanceof Error && err.name === 'AbortError') return;
            console.log('Native share cancelled/failed', err);
          }
        }
      }

      // Desktop (Windows/Mac): download certificate, copy text, open WhatsApp with pre-filled text
      await handleDownload();
      await copyToClipboard(shareText);
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      setShareModal({
        platform: 'whatsapp',
        steps: [
          { done: true, label: 'Certificate image downloaded ✅' },
          { done: true, label: 'Share text with channel link copied ✅' },
          { done: false, label: 'Click the button below to open WhatsApp → Pick a contact or group → Attach the downloaded certificate image' },
        ],
        platformUrl: waUrl,
      });
    } finally {
      setSharing(null);
    }
  };

  // ─── LinkedIn Share ───
  const handleLinkedInShare = async () => {
    setSharing('linkedin');
    try {
      // Mobile ONLY: use native share with certificate image
      if (isMobile) {
        const file = await getCertificateFile();
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `${quiz.title} Quiz Results`,
              text: shareText,
            });
            return;
          } catch (err: unknown) {
            if (err instanceof Error && err.name === 'AbortError') return;
            console.log('Native share cancelled/failed', err);
          }
        }
      }

      // Desktop (Windows/Mac): download certificate, copy text, open LinkedIn share
      await handleDownload();
      await copyToClipboard(shareText);
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;
      setShareModal({
        platform: 'linkedin',
        steps: [
          { done: true, label: 'Certificate image downloaded ✅' },
          { done: true, label: 'Share text with channel link copied ✅' },
          { done: false, label: 'Click the button below → A LinkedIn post window will open → Paste your text (Ctrl+V) and attach the downloaded certificate image' },
        ],
        platformUrl: linkedinUrl,
      });
    } finally {
      setSharing(null);
    }
  };

  // Re-copy text from modal
  const handleRecopy = async () => {
    await copyToClipboard(shareText);
    showToast('✅ Text copied to clipboard again!');
  };

  if (!userName) {
    return (
      <div className="container name-prompt-container">
        <div className="glass-panel name-prompt-panel">
          <h2>You scored {score}%!</h2>
          <p>Enter your name to generate your certificate.</p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              setUserName(fd.get('name') as string);
            }}
            className="name-form"
          >
            <input 
              name="name" 
              type="text" 
              placeholder="Your Full Name" 
              required 
              className="name-input"
              maxLength={40}
            />
            <button type="submit" className="button-primary">Generate Certificate</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container results-container">
      {/* Toast notification */}
      {toast && (
        <div className="share-toast">
          <CheckCircle size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Desktop Share Modal */}
      {shareModal && (
        <div className="share-modal-overlay" onClick={() => setShareModal(null)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <button className="share-modal-close" onClick={() => setShareModal(null)}>
              <X size={20} />
            </button>

            <div className="share-modal-header">
              <div className={`share-modal-icon ${shareModal.platform}`}>
                {shareModal.platform === 'whatsapp' ? <Share2 size={28} /> : <Globe size={28} />}
              </div>
              <h3>Share on {shareModal.platform === 'whatsapp' ? 'WhatsApp Status' : 'LinkedIn'}</h3>
              <p className="share-modal-subtitle">Almost there! Follow these steps:</p>
            </div>

            <div className="share-modal-steps">
              {shareModal.steps.map((step, i) => (
                <div key={i} className={`share-step ${step.done ? 'done' : 'pending'}`}>
                  <div className="share-step-number">
                    {step.done ? <CheckCircle size={20} /> : <span>{i + 1}</span>}
                  </div>
                  <span className="share-step-label">{step.label}</span>
                </div>
              ))}
            </div>

            <div className="share-modal-actions">
              <button className="share-modal-secondary" onClick={handleRecopy}>
                <Copy size={16} />
                Re-copy Text
              </button>
              <button className="share-modal-secondary" onClick={handleDownload}>
                <Image size={16} />
                Re-download Certificate
              </button>
            </div>

            <a
              href={shareModal.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`share-modal-cta ${shareModal.platform}`}
              onClick={() => setShareModal(null)}
            >
              <ExternalLink size={20} />
              Open {shareModal.platform === 'whatsapp' ? 'WhatsApp Web' : 'LinkedIn'}
            </a>

            <p className="share-modal-hint">
              {shareModal.platform === 'whatsapp'
                ? '💡 Tip: The button will open WhatsApp with the text pre-filled. Just pick a contact/group and attach the downloaded certificate image! You can also share it to your WhatsApp Status.'
                : '💡 Tip: After clicking the button, LinkedIn will open a share dialog. Add some personal thoughts, attach the downloaded certificate image, and post!'}
            </p>
          </div>
        </div>
      )}

      <div className="results-header">
        <h1 className="title">Quiz Completed!</h1>
        <div className="score-display">
          You scored <span className={isPass ? 'score-pass' : 'score-fail'}>{score}%</span>
        </div>
      </div>

      <div className="certificate-wrapper" ref={certificateRef}>
        <Certificate userName={userName} quiz={quiz} score={score} timeTaken={timeTaken} />
      </div>

      <div className="cta-banner" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem', border: '1px solid rgba(37, 211, 102, 0.5)' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: '#f8fafc' }}>Don't miss the next challenge! 🔥</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>Join our WhatsApp channel to get notified instantly.</p>
        <button 
          className="button-primary" 
          style={{ background: '#25D366', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem', fontSize: '1.125rem', border: 'none', boxShadow: '0 4px 14px 0 rgba(37, 211, 102, 0.39)' }}
          onClick={() => window.open('https://www.whatsapp.com/channel/0029Vb6GcAx42DccXkOfoW1h', '_blank')}
        >
          <Share2 size={20} />
          Join Channel Now
        </button>
      </div>

      {/* Rank callout */}
      {rank > 0 && rank <= 3 && (
        <div className="rank-callout">
          🏆 You ranked <strong>#{rank}</strong> on this quiz!
        </div>
      )}

      {/* Leaderboard */}
      <Leaderboard quizId={quiz.id} quizTitle={quiz.title} highlightName={userName} />

      <div className="actions-grid">
        <button className="button-primary action-btn" onClick={handleDownload}>
          <Download size={20} />
          <span>Download Badge</span>
        </button>

        <button className="button-secondary action-btn review-btn" onClick={onReviewAnswers}>
          <ClipboardList size={20} />
          <span>Review Answers</span>
        </button>
        
        <button className="button-secondary action-btn whatsapp-btn" onClick={handleWhatsAppShare} disabled={sharing !== null}>
          {sharing === 'whatsapp' ? <Loader2 size={20} className="spin-icon" /> : <Share2 size={20} />}
          <span>{sharing === 'whatsapp' ? 'Preparing...' : 'WhatsApp Status'}</span>
        </button>

        <button className="button-secondary action-btn linkedin-btn" onClick={handleLinkedInShare} disabled={sharing !== null}>
          {sharing === 'linkedin' ? <Loader2 size={20} className="spin-icon" /> : <Globe size={20} />}
          <span>{sharing === 'linkedin' ? 'Preparing...' : 'Share on LinkedIn'}</span>
        </button>

        <button className="button-secondary action-btn restart-btn" onClick={onRestart}>
          <RefreshCcw size={20} />
          <span>Try Another Quiz</span>
        </button>
      </div>
    </div>
  );
}
