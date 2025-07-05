document.addEventListener('DOMContentLoaded', function () {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatWindow = document.getElementById('chatWindow');

  function appendMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = `bubble ${sender}`;
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;
    appendMessage(userMsg, 'user');
    chatInput.value = '';

    // Simple bot reply
    setTimeout(() => {
      appendMessage("Thanks for your message! (This is a demo bot.)", 'bot');
    }, 600);
  });
});

document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  document.getElementById('formMessage').textContent = "Thanks! We'll get in touch soon.";
  this.reset(); // Clear form
});
