import React from 'react';

const Contact = () => {
  return (
    <section className="nes-container is-dark">
      <h2 style={{ textAlign: 'center', color: '#ff0044' }}>JOIN PARTY</h2>
      <div className="contact-links" style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>
        <a href="https://github.com/angadghatode" target="_blank" rel="noreferrer">
          <i className="nes-icon github is-medium"></i>
        </a>
        <a href="https://linkedin.com/in/angadghatode" target="_blank" rel="noreferrer">
          <i className="nes-icon linkedin is-medium"></i>
        </a>
        <a href="mailto:angad.ghatode@gmail.com">
          <i className="nes-icon gmail is-medium"></i>
        </a>
      </div>
    </section>
  );
};

export default Contact;