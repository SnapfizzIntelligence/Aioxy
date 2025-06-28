// ====== TYPING ANIMATION ======
function simulateTyping(text, element, callback) {
  let i = 0;
  element.innerHTML = '';
  const typingInterval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      element.scrollTop = element.scrollTop + 30;
    } else {
      clearInterval(typingInterval);
      if (callback) callback();
    }
  }, 20);
}

// ====== CHAT FUNCTIONS ======
function toggleChat() {
  const chat = document.getElementById('aioxy-chatbot-container');
  const btn = document.getElementById('chat-button');
  if (chat.style.display === 'none') {
    chat.style.display = 'block';
    btn.style.display = 'none';
  } else {
    chat.style.display = 'none';
    btn.style.display = 'flex';
  }
}

function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chat-messages');
  
  // Add user message
  chatBox.innerHTML += `
    <div style="margin-bottom:15px; text-align:right;">
      <div style="display:inline-block; background:var(--premium-accent); color:white; padding:12px 15px; border-radius:12px 0 12px 12px; max-width:80%; line-height:1.5;">
        ${message}
      </div>
    </div>
  `;
  
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // Bot "is typing" indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.id = 'typing-indicator';
  typingIndicator.innerHTML = `
    <div style="display:flex; gap:10px; margin-bottom:15px;">
      <div style="width:30px; height:30px; background:var(--premium-gold); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem; color:white;">AI</div>
      <div style="display:flex; gap:5px; align-items:center;">
        <div class="typing-dot" style="width:8px; height:8px; background:#ccc; border-radius:50%; animation: typing 1s infinite;"></div>
        <div class="typing-dot" style="width:8px; height:8px; background:#ccc; border-radius:50%; animation: typing 1s infinite 0.2s;"></div>
        <div class="typing-dot" style="width:8px; height:8px; background:#ccc; border-radius:50%; animation: typing 1s infinite 0.4s;"></div>
      </div>
    </div>
  `;
  chatBox.appendChild(typingIndicator);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate AI delay (1-2 seconds)
  setTimeout(() => {
    document.getElementById('typing-indicator').remove();
    addBotResponse(message);
  }, 1000 + Math.random() * 1000);
}

function addBotResponse(question) {
  const chatBox = document.getElementById('chat-messages');
  const responseDiv = document.createElement('div');
  responseDiv.className = 'bot-message';
  responseDiv.style.marginBottom = '15px';
  chatBox.appendChild(responseDiv);

  // Get answer from esgQA
  const answerData = getAnswer(question);
  const answerText = answerData.answer || "I specialize in ESG leaks. Try asking about carbon accounting or Scope 3 emissions.";
  const sources = answerData.sources || [];

  // Typing animation
  simulateTyping(answerText, responseDiv, () => {
    if (sources.length > 0) {
      const sourcesDiv = document.createElement('div');
      sourcesDiv.style.marginTop = '10px';
      sourcesDiv.style.fontSize = '0.8rem';
      sourcesDiv.style.color = '#666';
      sourcesDiv.innerHTML = `<strong>Sources:</strong> ${sources.join(', ')}`;
      responseDiv.appendChild(sourcesDiv);
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
