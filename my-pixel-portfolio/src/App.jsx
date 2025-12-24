import "nes.css/css/nes.min.css";
import "./App.css";

function App() {
  return (
    <div className="app-holder">
      <header className="parallax-banner">
        {/* All background layers now span 100% width */}
        <div className="layer sky-bg"></div>
        <div className="layer mountain-bg"></div>
        <div className="layer hills-bg"></div>
        <div className="layer grass-bg"></div>

        {/* The viewport now only handles the fixed positioning of the mascot and text */}
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
          <section className="quest-section">
            <h2 className="nes-text is-success">CURRENT QUESTS</h2>
            <div className="pixel-grid">
              <div className="nes-container is-dark with-title">
                <p className="title">Quest 01</p>
                <p>Building a modern pixel portfolio.</p>
              </div>
              <div className="nes-container is-dark with-title">
                <p className="title">Quest 02</p>
                <p>Integrating an AI Persona card.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;