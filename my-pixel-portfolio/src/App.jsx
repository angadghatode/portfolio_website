import "nes.css/css/nes.min.css";
import "./App.css";
import { useState, useEffect } from 'react';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden-reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="app-holder">
      <nav className="nes-container sticky-nav">
        <div className="nav-brand">ANGAD_v2.0</div>
        <div className="nav-links">
          <a href="#quests">QUESTS</a>
          <a href="#skills">SKILLS</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

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
              <h1>ANGAD GHATODE</h1>
              <p>Junior Software Engineer</p>
            </div>
          </div>
        </div>
      </header>

      <main className="content-area">
        <div className="content-width-limiter">
          
          {/* Added 'hidden-reveal' to the sections and cards */}
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
                  <div className="card-footer">
                     {/* Added 'hidden-reveal' to the sections and cards <button type="button" className="nes-btn is-primary">ACCESS CODE</button> */}
                  </div>
                </div>
              </div>

              <div className="mission-card hidden-reveal">
                <div className="mission-header">
                  <h3 className="mission-title">AI ARCHITECT</h3>
                  <span className="mission-id">ID: #002</span>
                </div>
                <div className="mission-body">
                  <p><span className="status-indicator"></span>Status: IN PROGRESS</p>
                  <p>Integrating an Ai Persona into this website!</p>
                  <div className="card-footer">
                    {/* Added 'hidden-reveal' to the sections and cards <button type="button" className="nes-btn is-primary">ACCESS CODE</button> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="portfolio-section hidden-reveal">
            <div className="section-header">
              <h2 className="nes-text is-warning section-title">TECH ARSENAL</h2>
              <div className="header-line" style={{ background: 'linear-gradient(90deg, var(--status-warning), transparent)', boxShadow: '0 0 10px var(--status-warning)' }}></div>
            </div>

            <div className="arsenal-layout">
              <div className="arsenal-sidebar">
                <h3 style={{ color: 'var(--accent-purple)', marginBottom: '20px' }}>OPERATOR STATS</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Loadout optimized for full-stack deployment.</p>
                <br />
                <p>LEVEL: <span className="nes-text is-success">JUNIOR</span></p>
                <p>CLASS: <span className="nes-text is-primary">ENGINEER</span></p>
              </div>

              <div className="arsenal-grid">
                <div className="tech-chip"><i className="nes-icon is-small heart"></i> React.js</div>
                <div className="tech-chip"><i className="nes-icon is-small coin"></i> Node.js</div>
                <div className="tech-chip"><i className="nes-icon is-small star"></i> Python</div>
                <div className="tech-chip">TypeScript</div>
                <div className="tech-chip">PostgreSQL</div>
                <div className="tech-chip">Docker</div>
              </div>
            </div>
          </section>

          <section id="contact" className="portfolio-section hidden-reveal">
            <div className="section-header">
              <h2 className="nes-text is-error section-title">UPLINK</h2>
              <div className="header-line" style={{ background: 'linear-gradient(90deg, var(--status-error), transparent)', boxShadow: '0 0 10px var(--status-error)' }}></div>
            </div>

            <div className="comms-terminal">
              <span className="rec-light">● REC</span>
              <p style={{ color: 'var(--status-success)', marginBottom: '20px' }}> READY FOR TRANSMISSION.</p>
              <form>
                <div className="nes-field is-inline" style={{ marginBottom: '20px' }}>
                  <label htmlFor="name_field" style={{ color: 'var(--accent-blue)', width: '150px' }}>OPERATOR:</label>
                  <input type="text" id="name_field" className="nes-input is-dark" placeholder="Enter Name" />
                </div>
                <div className="nes-field" style={{ marginBottom: '20px' }}>
                  <label htmlFor="textarea_field" style={{ color: 'var(--accent-blue)' }}>DATA PACKET:</label>
                  <textarea id="textarea_field" className="nes-textarea is-dark" placeholder="Type message..."></textarea>
                </div>
                <button type="button" className="nes-btn is-success" style={{ width: '100%' }}>INITIATE UPLOAD</button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer-bar">
        <p>SYSTEM SHUTDOWN // © 2025 ANGAD GHATODE</p>
      </footer>
    </div>
  );
}

export default App;