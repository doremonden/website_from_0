const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function createMessage(text, sender, time) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const timestamp = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  msg.innerHTML = `
    <div class="bubble ${sender}">${text}</div>
    <div class="timestamp">${timestamp}</div>
  `;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 🟢 Submit message
chatForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  chatInput.value = "";
  await fetch("https://website-from-0-backend.onrender.com/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg }),
  });
});

// 🔄 Poll messages every 1 sec
async function pollMessages() {
  try {
    const res = await fetch("https://website-from-0-backend.onrender.com/all-messages");
    const data = await res.json();

    if (data.messages) {
      chatWindow.innerHTML = ""; // Clear old
      data.messages.forEach((msg) => {
        createMessage(msg.message, msg.user_type, msg.datetime);
      });
    }
  } catch (err) {
    console.error("Polling failed", err);
  }
}
setInterval(pollMessages, 1000);
