const chatContainer = document.getElementById("chatContainer");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

function createMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msg.innerHTML = `
    <div>${text}</div>
    <div class="timestamp">${timestamp}</div>
  `;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userMsg = userInput.value.trim();
  if (!userMsg) return;

  createMessage(userMsg, "user");

  // Simulate bot response (replace this later with API call)
  setTimeout(() => {
    const reply = `You liked "${userMsg}"? Try watching "Interstellar" next! 🎬`;
    createMessage(reply, "bot");
  }, 1000);

  userInput.value = "";
});
