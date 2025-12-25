import React, { useState, useEffect, useRef } from 'react';
import portraitImg from './assets/portrait.webp';

const AiTerminal = ({ messages, setMessages }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
        if (messages.length === 1 && !isTyping) {
        setIsTyping(true);
        setTimeout(() => {
        setIsTyping(false);
        }, 2000);
    }
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation(); 
    }
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
        // 1. Add the first message
        setMessages(prev => [...prev, { 
            role: 'ai', 
            text: 'Analyzing request...' 
        }]);

        // 2. Wait a little longer before the final response
        setTimeout(() => {
            setMessages(prev => [...prev, { 
            role: 'ai', 
            text: 'The Ai is still being built!' 
            }]);
            setIsTyping(false);
        }, 800); 

        }, 800); 
    }
  return (
    <div className={`ai-page-wrapper fade-in-section ${isLoaded ? 'is-visible' : ''}`}>
      <div className="content-width-limiter">
        <div className="section-header">
          <h2 className="nes-text is-primary section-title">AI_CORE_UPLINK</h2>
          <div className="header-line"></div>
        </div>

        <div className="ai-terminal-layout">
          <aside className="ai-sidebar">
            <h3 className="sidebar-title">CORE STATUS</h3>
            
            {/* Space for your Pixel Portrait */}
            <div className="portrait-container">
              <div className="pixel-portrait-placeholder">
                {/* When you have your image, replace this with: */}
                <img 
                src={portraitImg} 
                alt="Angad AI Portrait" 
                className="ai-portrait" 
                />
              </div>
            </div>

            <p className="portrait-name">Angad Ghatode</p>

            <div className="status-box nes-container is-dark">
              <p>SYNC: <span className="nes-text is-success">98%</span></p>
              <p>THREAT: <span className="nes-text is-error">LOW</span></p>
              <p>UPLINK: <span className="nes-text is-primary">STABLE</span></p>
            </div>

            <div className="data-visualizer">
              <div className="bar-graph">
                <div className="bar" style={{height: '40%', background: '#ff4b2b'}}></div>
                <div className="bar" style={{height: '70%', background: '#38bdf8'}}></div>
                <div className="bar" style={{height: '50%', background: '#22c55e'}}></div>
                <div className="bar" style={{height: '90%', background: '#f472b6'}}></div>
              </div>
              <p className="visualizer-label">GLOBAL NETWORK</p>
            </div>
          </aside>

          <section className="terminal-window">
            <p className="terminal-header">AI_CORE_V2.0</p>
            <div className="chat-history">
              {messages.map((msg, i) => (
                <div key={i} className={`bubble-row ${msg.role}`}>
                  <div className={`pixel-speech-bubble ${msg.role}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="bubble-row ai">
                  <div className="pixel-speech-bubble ai typing-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>

                
              )}
              <div ref={messageEndRef} />
            </div>

            <form onSubmit={handleSend} className="input-zone">
              <input 
                type="text" 
                className="nes-input is-dark" 
                placeholder="INPUT COMMAND..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" className="nes-btn is-primary" onClick={handleSend} >EXEC</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AiTerminal;