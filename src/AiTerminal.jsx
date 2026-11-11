import React, { useState, useEffect, useRef, memo } from 'react';
import portraitImg from './assets/portrait.webp';

const Typewriter = memo(({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeText = typeof text === "string" ? text : "";

  useEffect(() => {
    if (currentIndex < safeText.length) {
      let delay = 35;
      const char = safeText[currentIndex];

      // Human-like pauses
      if (char === "." || char === "!" || char === "?") delay = 600;
      if (char === ",") delay = 300;

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + char);
        setCurrentIndex((prev) => prev + 1);
      }, delay + (Math.random() * 15));

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, safeText]);

  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</span>;
});

// --- MAIN COMPONENT ---
const AiTerminal = ({ messages, setMessages }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');

  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    setIsLoaded(true);
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const currentInput = input;

    // Update local state immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Keep focus on input so user can keep typing
    inputRef.current?.focus();

    try {
      const response = await fetch('https://angad-ai-backend.vercel.app/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();
      const errorType = typeof data?.error === 'string'
        ? data.error
        : data?.error?.type ?? data?.error?.code;
      if (
        errorType === 'insufficient_quota' ||
        errorType === 'billing_not_active' ||
        (response.status === 429 &&
          errorType !== 'daily_limit' &&
          errorType !== 'hourly_limit')
      ) {
        setMessages((prev) => [...prev, {
          role: 'ai',
          text: 'AI CREDIT LIMIT REACHED. PLEASE TRY AGAIN LATER.',
        }]);
      } else if (response.status === 429 && errorType === 'daily_limit') {
        setMessages((prev) => [...prev, {
          role: 'ai',
          text: 'DAILY CHAT LIMIT REACHED. PLEASE TRY AGAIN TOMORROW.',
        }]);
      } else if (response.status === 429 && errorType === 'hourly_limit') {
        setMessages((prev) => [...prev, {
          role: 'ai',
          text: 'CHAT RATE LIMIT REACHED. PLEASE TRY AGAIN IN AN HOUR.',
        }]);
      } else if (!response.ok) {
        setMessages((prev) => [...prev, {
          role: 'ai',
          text: 'AI SERVICE ERROR: Please try again later.',
        }]);
      } else if (typeof data?.reply === 'string' && data.reply.trim()) {
        setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, {
          role: 'ai',
          text: 'AI SERVICE ERROR: Received an invalid response.',
        }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', text: "UPLINK ERROR: Connection lost." }]);
    } finally {
      setIsTyping(false);
      // Ensure focus stays even after response
      inputRef.current?.focus();
    }
  };

  return (
    <div className={`ai-page-wrapper fade-in-section ${isLoaded ? 'is-visible' : ''}`}>
      <div className="content-width-limiter">
        <div className="ai-terminal-layout">
          <aside className="ai-sidebar">
            <h3 className="sidebar-title">DIGITAL TWIN</h3>
            <div className="portrait-container">
              <img src={portraitImg} alt="Portrait" className="ai-portrait" />
            </div>
            <p className="portrait-name">Angad Ghatode</p>
            <div className="status-box nes-container is-dark">
              <p>SYNC: <span className="nes-text is-success">98%</span></p>
              <p>RESPONSE TIME: <span className="nes-text is-error">LOW</span></p>
              <p>CONNECTION: <span className="nes-text is-primary">STABLE</span></p>
            </div>

            <div className="data-visualizer">
              <div className="bar-graph">
                <div className="bar" style={{ height: '40%', background: '#ff4b2b' }}></div>
                <div className="bar" style={{ height: '70%', background: '#38bdf8' }}></div>
                <div className="bar" style={{ height: '50%', background: '#22c55e' }}></div>
                <div className="bar" style={{ height: '90%', background: '#f472b6' }}></div>
              </div>
              <p className="visualizer-label">MESSAGES</p>
            </div>
          </aside>

          <section className="terminal-window">
            <p className="terminal-header">AI DIGITAL TWIN</p>
            <div className="chat-history">
              {messages.map((msg, i) => (
                <div key={i} className={`bubble-row ${msg.role}`}>
                  <div className={`pixel-speech-bubble ${msg.role}`}>

                    {msg.role === 'ai' && i === messages.length - 1 ? (
                      <Typewriter text={msg.text} />
                    ) : (
                      <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                    )}
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
                ref={inputRef}
                type="text"
                className="nes-input is-dark"
                placeholder="TYPE MESSAGE..."
                maxLength={1000}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="nes-btn is-primary">EXEC</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AiTerminal;