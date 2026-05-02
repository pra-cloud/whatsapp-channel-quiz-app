import { QRCodeSVG } from 'qrcode.react';
import type { Quiz } from '../data/quizzes';
import './Certificate.css';

interface CertificateProps {
  userName: string;
  quiz: Quiz;
  score: number;
  timeTaken: number;
}

export default function Certificate({ userName, quiz, score, timeTaken }: CertificateProps) {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Use smaller QR on mobile
  const qrSize = window.innerWidth <= 480 ? 44 : 56;

  return (
    <div className="certificate-container" id="certificate-node">
      <div className="certificate-border">
        <div className="certificate-inner">
          <div className="cert-header">
            <img src="/logo.png" alt="Learn AI | Devops | Cloud" className="cert-logo" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <h3 className="cert-channel">Learn AI | DevOps | Cloud</h3>
          </div>
          
          <div className="cert-body">
            <p className="cert-presented">This certifies that</p>
            <h1 className="cert-name">{userName}</h1>
            <p className="cert-description">
              has successfully completed the Weekend Challenge:
            </p>
            <h2 className="cert-quiz-title">{quiz.title}</h2>
            <div className="cert-score-section">
              <span className="cert-score-label">Score Achieved:</span>
              <span className={`cert-score-value ${score >= 70 ? 'pass' : 'fail'}`}>
                {score}%
              </span>
            </div>
            
            {score === 100 && timeTaken < (quiz.questions.length * 10) && (
              <div className="speedster-badge">
                <span className="star">⭐</span> ELITE SPEEDSTER <span className="star">⭐</span>
              </div>
            )}
          </div>

          {/* Seal badge - standalone centered */}
          <div className="cert-seal">
            <div className={`seal-inner ${quiz.topic.toLowerCase()}`}>
              <span className="seal-text">{quiz.topic}</span>
              <span className="seal-sub">Master</span>
            </div>
          </div>
          
          <div className="cert-footer">
            <div className="cert-date">
              <span className="cert-date-value">{date}</span>
              <span className="cert-date-label">Date Completed</span>
            </div>
            
            <div className="cert-qr">
              <div className="qr-wrapper">
                <QRCodeSVG 
                  value="https://www.whatsapp.com/channel/0029Vb6GcAx42DccXkOfoW1h" 
                  size={qrSize} 
                  bgColor="#ffffff" 
                  fgColor="#0f172a" 
                  level="L" 
                />
              </div>
              <span className="qr-label">Scan to Join!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
