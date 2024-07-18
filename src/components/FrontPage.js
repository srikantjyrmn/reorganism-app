import React from 'react';
import { Link } from 'react-router-dom';

function FrontPage() {
  return (
    <>
      <div id="content">
        <h1 id="logo">reorganism.in</h1>

        <nav>
          <a href="/about.html">About</a>
          <a href="/about.html">Blog</a>
          <Link to="/coming-soon">Coming Soon</Link>
        </nav>
      </div>

      <div id="chat-messages"></div>
      <div id="chat-input-area">
        <input type="text" id="chat-window-input" placeholder="Talk to our Agents." />
        <button id="chat-window-send">Send</button>
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