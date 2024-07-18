import React from 'react';
import { Link } from 'react-router-dom';

function FrontPage() {
  return (
    <>
      <div id="content">
        <h1 id="logo">reorganism.in</h1>

        <nav>
          <Link to="/about">About</Link> <a href="https://reorganism.in">Blog</a> <Link to="/coming-soon">Coming Soon</Link>
        </nav>

        <div id="chat-box">
          Send Message
        </div>
      </div>

      <div id="chat-window">
        <div id="chat-messages">
        </div>

        <div id="chat-input-area">
          Send
        </div>
      </div>
    </>
  );
}

export default FrontPage;