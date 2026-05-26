import "nes.css/css/nes.min.css";
import "./App.css";
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AiTerminal from './AiTerminal';

function ScrollToTopAndReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden-reveal');
    hiddenElements.forEach((el) => observer.observe(el));
    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, [pathname]);
  return null;
}

/* ─── Animated typing for the AI demo preview ─── */
function TypingDemo() {
  const demoLines = [
    { role: 'user', text: '> What tech stack does Angad use?' },
    { role: 'ai', text: 'He builds full-stack systems with React, Node.js, Python, and PixiJS — shipping retro interfaces backed by real engineering.' },
  ];
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < demoLines.length) {
      const timer = setTimeout(() => setVisibleLines(v => v + 1), visibleLines === 0 ? 800 : 2200);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, demoLines.length]);

  return (
    <div className="ai-demo-chat">
      {demoLines.slice(0, visibleLines).map((line, i) => (
        <p key={i} className={`ai-demo-line ${line.role}`}>
          {line.role === 'ai' && <span className="ai-demo-cursor">{'>'} </span>}
          {line.text}
        </p>
      ))}
      {visibleLines < demoLines.length && (
        <p className="ai-demo-line ai typing-cursor-blink">
          <span className="ai-demo-cursor">{'>'} </span>█
        </p>
      )}
    </div>
  );
}

function App() {
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'ai',
      text: "hello!! my name is Angad Ghatode! you can ask me anything and i'll make sure to answer the best that i can :) "
    },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [operator, setOperator] = useState('');
  const [email, setEmail] = useState('');
  const [dataPacket, setDataPacket] = useState('');
  const [submitStatus, setSubmitStatus] = useState('IDLE');
  const [statusMessage, setStatusMessage] = useState('READY FOR TRANSMISSION.');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!operator.trim() || !email.trim() || !dataPacket.trim()) {
      setSubmitStatus('ERROR');
      setStatusMessage('ERROR: NAME, RETURN ADDRESS & DATA PACKET ARE REQUIRED.');
      return;
    }

    setSubmitStatus('SENDING');
    setStatusMessage('TRANSMITTING DATA PACKET TO UPLINK SERVER...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: operator,
          email: email,
          message: dataPacket,
          subject: `New Portfolio Message from ${operator}`
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitStatus('SUCCESS');
        setStatusMessage('TRANSMISSION SUCCESSFUL! PACKET RECEIVED.');
        setOperator('');
        setEmail('');
        setDataPacket('');
      } else {
        throw new Error(data.message || 'Transmission failed.');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('ERROR');
      setStatusMessage(`TRANSMISSION FAILED: ${err.message.toUpperCase()}`);
    }
  };

  /* ─── Tech categories for the expanded arsenal ─── */
  const techCategories = [
    {
      label: 'LANGUAGES',
      color: 'var(--accent-blue)',
      items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'HTML5', 'CSS3', 'SQL', 'Bash']
    },
    {
      label: 'FRONTEND',
      color: 'var(--accent-pink)',
      items: ['React.js', 'Next.js', 'Vue.js', 'Vite', 'PixiJS', 'Three.js', 'NES.css', 'Tailwind CSS', 'SASS']
    },
    {
      label: 'BACKEND',
      color: 'var(--accent-purple)',
      items: ['Node.js', 'Express.js', 'Flask', 'Django', 'Spring Boot', 'REST APIs', 'GraphQL']
    },
    {
      label: 'DATA & AI',
      color: 'var(--accent-cyan)',
      items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'OpenAI API', 'TensorFlow', 'Pandas', 'NumPy']
    },
    {
      label: 'DEVOPS & TOOLS',
      color: 'var(--status-success)',
      items: ['Docker', 'Git', 'GitHub Actions', 'Vercel', 'AWS', 'Linux', 'Figma', 'Jira']
    },
  ];

  return (
    <Router>
      <ScrollToTopAndReveal />
      <div className="app-holder">
        {/* 1. PERSISTENT NAV */}
        <nav className="nes-container sticky-nav">
          <Link to="/" className="nav-brand" onClick={() => setIsMenuOpen(false)}>ANGAD_v2.0</Link>
          <button type="button" className="nes-btn is-primary menu-toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "X" : "≡"}
          </button>
          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
            <Link to="/ai" className="nav-ai-link" onClick={() => setIsMenuOpen(false)}>
              <span className="ai-pulse-dot"></span>AI_CORE
            </Link>
            <Link to="/" onClick={() => {
              setIsMenuOpen(false);
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}>CONTACT</Link>
          </div>
        </nav>

        {/* 2. PERSISTENT BANNER */}
        <header className="parallax-banner">
          <div className="layer sky-bg" style={{ transform: `translateY(${scrollY * 0.8}px)` }}></div>
          <div className="layer mountain-bg" style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
          <div className="layer hills-bg" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
          <div className="layer grass-bg"></div>
          <div className="layer car-bg"></div>
          <div className="banner-viewport">
            <div className="banner-content">
              <div className="profile-card" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
                <p className="system-tag">SYSTEM_v2.0</p>
                <h1 className="profile-card">ANGAD GHATODE</h1>
                <p>Junior Software Engineer</p>
              </div>
            </div>
          </div>
        </header>

        {/* 3. DYNAMIC CONTENT */}
        <Routes>
          <Route path="/" element={
            <main className="content-area">
              <div className="content-width-limiter">

                {/* ═══════ AI SHOWCASE — The hero feature ═══════ */}
                <section id="ai-showcase" className="ai-showcase-section hidden-reveal">
                  <div className="ai-showcase-glow"></div>
                  <div className="ai-showcase-content">
                    <div className="ai-showcase-text">
                      <p className="ai-showcase-tag">
                        <span className="ai-live-dot"></span> LIVE AI SYSTEM
                      </p>
                      <h2 className="ai-showcase-title">Talk to my Digital Persona</h2>
                      <p className="ai-showcase-desc">
                        I trained an AI on my skills, projects, and experience. Ask it anything — about my work, my tech stack, or what I can build for you. It responds in real-time, just like a conversation.
                      </p>
                      <Link to="/ai" className="nes-btn is-primary ai-showcase-cta">
                        ▶ LAUNCH AI_CORE
                      </Link>
                    </div>
                    <div className="ai-showcase-preview">
                      <div className="ai-preview-window">
                        <div className="ai-preview-header">
                          <span className="ai-preview-dots">
                            <span></span><span></span><span></span>
                          </span>
                          <span className="ai-preview-title">AI_CORE_PROFILER</span>
                        </div>
                        <TypingDemo />
                      </div>
                    </div>
                  </div>
                </section>

                {/* ═══════ PROJECT QUEST ═══════ */}
                <section id="quests" className="portfolio-section hidden-reveal">
                  <div className="section-header">
                    <h2 className="nes-text is-primary section-title">ACTIVE QUESTS</h2>
                    <div className="header-line"></div>
                  </div>
                  <div className="mission-grid">
                    <div className="mission-card hidden-reveal">
                      <div className="mission-header">
                        <h3 className="mission-title">MYPARALLEL</h3>
                        <span className="mission-id">ID: #001</span>
                      </div>
                      <div className="mission-body">
                        <p style={{ marginBottom: '15px' }}><span className="status-indicator"></span>Status: ONLINE</p>
                        <p style={{ marginBottom: '20px' }}>A gamified, autonomous 8-bit virtual workspace designed to combat isolation and boost focus. Recreates presence digitally with a 2.5D isometric room simulation, synchronized scheduling, and PixiJS rendering math.</p>
                        <div className="mission-tech-tags">
                          <span>PixiJS</span><span>Vanilla JS</span><span>HTML5 Canvas</span><span>Vite</span>
                        </div>
                        <a href="https://myparallel.com.au" target="_blank" rel="noopener noreferrer" className="nes-btn is-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>LAUNCH CO-OP</a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ═══════ EXPANDED TECH ARSENAL ═══════ */}
                <section id="skills" className="portfolio-section hidden-reveal">
                  <div className="section-header">
                    <h2 className="nes-text is-warning section-title">TECH ARSENAL</h2>
                    <div className="header-line" style={{ background: 'linear-gradient(90deg, #f7d51d, transparent)' }}></div>
                  </div>

                  <div className="tech-arsenal-grid">
                    {techCategories.map((cat, ci) => (
                      <div key={ci} className="tech-category-card hidden-reveal" style={{ '--cat-color': cat.color }}>
                        <div className="tech-category-header">
                          <span className="tech-category-dot" style={{ backgroundColor: cat.color }}></span>
                          <h3 className="tech-category-label">{cat.label}</h3>
                        </div>
                        <div className="tech-category-items">
                          {cat.items.map((item, ii) => (
                            <span key={ii} className="tech-tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ═══════ CONTACT UPLINK — Full-width redesign ═══════ */}
                <section id="contact" className="uplink-section hidden-reveal">
                  <div className="section-header">
                    <h2 className="nes-text is-error section-title">UPLINK</h2>
                    <div className="header-line" style={{ background: 'linear-gradient(90deg, var(--status-error), transparent)' }}></div>
                  </div>

                  <div className="uplink-grid">
                    {/* Left — Info + Socials */}
                    <div className="uplink-info-panel">
                      <div className="uplink-info-block">
                        <h3 className="uplink-info-label">DIRECT CHANNELS</h3>
                        <a href="mailto:angad.ghatode@gmail.com" className="uplink-channel-link">
                          <span className="channel-icon">✉</span>
                          <span>angad.ghatode@gmail.com</span>
                        </a>
                        <a href="tel:+61410951481" className="uplink-channel-link">
                          <span className="channel-icon">☎</span>
                          <span>+61 410 951 481</span>
                        </a>
                        <a href="https://github.com/angadghatode" target="_blank" rel="noopener noreferrer" className="uplink-channel-link">
                          <span className="channel-icon">◆</span>
                          <span>github.com/angadghatode</span>
                        </a>
                        <a href="https://linkedin.com/in/angadghatode" target="_blank" rel="noopener noreferrer" className="uplink-channel-link">
                          <span className="channel-icon">■</span>
                          <span>linkedin.com/in/angadghatode</span>
                        </a>
                      </div>

                      <div className="uplink-info-block">
                        <h3 className="uplink-info-label">SIGNAL STATUS</h3>
                        <div className="signal-row"><span>UPLINK</span><span className="nes-text is-success">STABLE</span></div>
                        <div className="signal-row"><span>RESPONSE TIME</span><span className="nes-text is-primary">{'<'} 24H</span></div>
                        <div className="signal-row"><span>AVAILABILITY</span><span className="nes-text is-warning">OPEN</span></div>
                      </div>

                      <div className="uplink-scanlines"></div>
                    </div>

                    {/* Right — Form */}
                    <div className="uplink-form-panel">
                      <div className="uplink-form-header">
                        <span className="rec-light">● REC</span>
                        <span className="uplink-form-title">TRANSMISSION CONSOLE</span>
                      </div>
                      <p className={`uplink-status-msg ${submitStatus === 'ERROR' ? 'status-error' :
                        submitStatus === 'SUCCESS' ? 'status-success' :
                          submitStatus === 'SENDING' ? 'status-sending' : 'status-idle'
                        }`}>{statusMessage}</p>
                      <form onSubmit={handleUpload} className="uplink-form">
                        <div className="uplink-field-row">
                          <div className="uplink-field">
                            <label>OPERATOR</label>
                            <input
                              type="text"
                              className="nes-input is-dark"
                              placeholder="Your name"
                              value={operator}
                              onChange={(e) => setOperator(e.target.value)}
                              disabled={submitStatus === 'SENDING'}
                              required
                            />
                          </div>
                          <div className="uplink-field">
                            <label>RETURN ADDRESS</label>
                            <input
                              type="email"
                              className="nes-input is-dark"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={submitStatus === 'SENDING'}
                              required
                            />
                          </div>
                        </div>
                        <div className="uplink-field">
                          <label>DATA PACKET</label>
                          <textarea
                            className="nes-textarea is-dark"
                            placeholder="Type your message..."
                            value={dataPacket}
                            onChange={(e) => setDataPacket(e.target.value)}
                            disabled={submitStatus === 'SENDING'}
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className={`nes-btn ${submitStatus === 'SENDING' ? 'is-disabled' : 'is-error'} uplink-submit-btn`}
                          disabled={submitStatus === 'SENDING'}
                        >
                          {submitStatus === 'SENDING' ? 'TRANSMITTING...' : 'INITIATE UPLOAD'}
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          } />
          <Route path="/ai" element={<AiTerminal messages={chatHistory}
            setMessages={setChatHistory} />} />
        </Routes>

        {/* 4. PERSISTENT FOOTER */}
        <footer className="footer-bar">
          <p>SYSTEM SHUTDOWN // © 2025 ANGAD GHATODE</p>
          <p>Made and Designed by Angad Ghatode</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;