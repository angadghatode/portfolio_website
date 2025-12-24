import "nes.css/css/nes.min.css";
import "./App.css";

function App() {
  return (
    <div className="app-holder">
      {/* Sticky Navigation Bar */}
      <nav className="nes-container is-dark sticky-nav">
        <div className="nav-brand">ANGAD_v2.0</div>
        <div className="nav-links">
          <a href="#quests">QUESTS</a>
          <a href="#skills">SKILLS</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

      <header className="parallax-banner">
        <div className="layer sky-bg"></div>
        <div className="layer mountain-bg"></div>
        <div className="layer hills-bg"></div>
        <div className="layer grass-bg"></div>

        <div className="banner-viewport">
          <img 
            src="https://www.codedex.io/images/homepage/LandingPage_Mascot.webp" 
            className="mascot-img" 
            alt="mascot" 
          />
          <div className="banner-content">
            <div className="nes-container is-dark with-title profile-card">
              <p className="title">SYSTEM_v2.0</p>
              <h1>ANGAD GHATODE</h1>
              <p>Full-Stack Developer & AI Architect</p>
            </div>
          </div>
        </div>
      </header>

      <main className="content-area">
        <div className="content-width-limiter">
          
          {/* Active Quests Section - Manual Entry for Unique Info */}
          <section id="quests" className="portfolio-section">
            <h2 className="nes-text is-success section-title">ACTIVE QUESTS</h2>
            <div className="pixel-grid">
              
              {/* Project 1 */}
              <div className="nes-container is-dark with-title project-card">
                <p className="title">Portfolio v2.0</p>
                <p>Building a retro-inspired pixel art interface using React and NES.css.</p>
                <div className="card-footer">
                  <button type="button" className="nes-btn is-primary">VIEW CODE</button>
                </div>
              </div>

              {/* Project 2 */}
              <div className="nes-container is-dark with-title project-card">
                <p className="title">AI Architect</p>
                <p>Integrating large language models into web viewports for intelligent UI.</p>
                <div className="card-footer">
                  <button type="button" className="nes-btn is-primary">VIEW CODE</button>
                </div>
              </div>

            </div>
          </section>

          {/* Tech Arsenal Section */}
          <section id="skills" className="portfolio-section">
            <h2 className="nes-text is-warning section-title">TECH ARSENAL</h2>
            <div className="nes-container is-dark with-title inventory-box">
              <p className="title">Inventory</p>
              <div className="skills-list">
                <span className="nes-badge"><span className="is-success">React</span></span>
                <span className="nes-badge"><span className="is-warning">Node.js</span></span>
                <span className="nes-badge"><span className="is-error">Python</span></span>
                <span className="nes-badge"><span className="is-primary">SQL</span></span>
                <span className="nes-badge"><span className="is-dark">Docker</span></span>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="portfolio-section">
            <h2 className="nes-text is-error section-title">SEND A TRANSMISSION</h2>
            <div className="nes-container is-dark contact-box">
              <form>
                <div className="nes-field">
                  <label htmlFor="name_field">Your Name</label>
                  <input type="text" id="name_field" className="nes-input is-dark" placeholder="Player 1" />
                </div>
                <div className="nes-field">
                  <label htmlFor="textarea_field">Message</label>
                  <textarea id="textarea_field" className="nes-textarea is-dark" placeholder="Enter transmission..."></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="nes-btn is-success">SEND MESSAGE</button>
                </div>
              </form>
            </div>
          </section>

        </div>
      </main>

      <footer className="footer-bar">
        <p>© 2025 ANGAD GHATODE</p>
      </footer>
    </div>
  );
}

export default App;