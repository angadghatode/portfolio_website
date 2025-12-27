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

function App() {
  const [chatHistory, setChatHistory] = useState([
  { 
    role: 'ai', 
    text: "Uplink Successful. Connection to Core_v2.0 established." 
  },
  { 
    role: 'ai', 
    text: "I am the AI Persona of Angad Ghatode." 
  },
  { 
    role: 'ai', 
    text: "I've been programmed with his technical expertise and project data. You may ask me anything about his work, skills, or experience." 
  }
]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <Link to="/ai" className="nes-text is-primary" onClick={() => setIsMenuOpen(false)}>AI_CORE</Link>
            <Link to="/" onClick={() => {
              setIsMenuOpen(false);
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}></Link>
          </div>
        </nav>

        {/* 2. PERSISTENT BANNER (Moved outside Routes) */}
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
                <section id="quests" className="portfolio-section hidden-reveal">
                  <div className="section-header">
                    <h2 className="nes-text is-primary section-title">ACTIVE QUESTS</h2>
                    <div className="header-line"></div>
                  </div>
                  <div className="mission-grid">
                    <div className="mission-card hidden-reveal">
                      <div className="mission-header">
                        <h3 className="mission-title">PORTFOLIO_v2.0</h3>
                        <span className="mission-id">ID: #001</span>
                      </div>
                      <div className="mission-body">
                        <p><span className="status-indicator"></span>Status: ONLINE</p>
                        <p>Building a high-performance retro interface using React, NES.css, and parallax architecture.</p>
                      </div>
                    </div>
                    <div className="mission-card hidden-reveal">
                      <div className="mission-header">
                        <h3 className="mission-title">AI ARCHITECT</h3>
                        <span className="mission-id">ID: #002</span>
                      </div>
                      <div className="mission-body">
                        <p><span className="status-indicator" style={{backgroundColor: 'var(--accent-purple)'}}></span>Status: IN PROGRESS</p>
                        <p>Integrating an Ai Persona into this website!</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="skills" className="portfolio-section hidden-reveal">
                  <div className="section-header">
                    <h2 className="nes-text is-warning section-title">TECH ARSENAL</h2>
                    <div className="header-line" style={{ background: 'linear-gradient(90deg, #f7d51d, transparent)' }}></div>
                  </div>
                  <div className="arsenal-layout">
                    <div className="arsenal-sidebar">
                      <h3 style={{ color: 'var(--accent-purple)', marginBottom: '10px' }}>OPERATOR STATS</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '40px' }}>Loadout optimized for full-stack deployment.</p>
                      <p>LEVEL: <span className="nes-text is-success">JUNIOR</span></p>
                      <p>CLASS: <span className="nes-text is-primary">ENGINEER</span></p>
                    </div>
                    <div className="arsenal-grid">
                      <div className="tech-chip"><i className="nes-icon is-small coin"></i> Python</div>
                      <div className="tech-chip"><i className="nes-icon is-small heart "></i> Java</div>
                      <div className="tech-chip"><i className="nes-icon is-small coin"></i> React.js</div>
                      <div className="tech-chip"><i className="nes-icon is-small trophy"></i> Node.js</div>
                      <div className="tech-chip"><i className="nes-icon is-small star "></i> PostgreSQL</div>
                      <div className="tech-chip"><i className="nes-icon is-small coin "></i> Docker</div>
                      <div className="tech-chip"><i className="nes-icon is-small star "></i> TypeScript</div>
                      <div className="tech-chip"><i className="nes-icon is-small trophy "></i> JavaScript</div>
                    </div>
                  </div>
                </section>

                <section id="contact" className="portfolio-section hidden-reveal">
                  <div className="section-header">
                    <h2 className="nes-text is-error section-title">UPLINK</h2>
                    <div className="header-line"></div>
                  </div>
                  <div className="comms-terminal">
                    <span className="rec-light">● REC</span>
                    <p style={{ color: 'var(--status-success)', marginBottom: '20px' }}> READY FOR TRANSMISSION.</p>
                    <form>
                      <div className="nes-field is-inline" style={{ marginBottom: '20px' }}>
                        <label style={{ color: 'var(--accent-blue)', width: '150px' }}>OPERATOR:</label>
                        <input type="text" className="nes-input is-dark" placeholder="Enter Name" />
                      </div>
                      <div className="nes-field" style={{ marginBottom: '20px' }}>
                        <label style={{ color: 'var(--accent-blue)' }}>DATA PACKET:</label>
                        <textarea className="nes-textarea is-dark" placeholder="Type message..."></textarea>
                      </div>
                      <button type="button" className="nes-btn is-success" style={{ width: '100%' }}>INITIATE UPLOAD</button>
                    </form>
                  </div>
                </section>
              </div>
            </main>
          } />
          <Route path="/ai" element={<AiTerminal messages={chatHistory} 
              setMessages={setChatHistory}/>} />
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