const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid"); // ← UUID generator

const app = express();
app.use(cors());
app.use(bodyParser.json());

let latestAnswer = ""; // stores bot response

// 🚀 1. Receive message from frontend → Send to n8n
app.post("/send", async (req, res) => {
  const { message } = req.body;

  // 🧠 Build payload
  const payload = {
    id: uuidv4(),
    user_id: 1,
    message: message,
    user_type: "user",
    datetime: new Date().toISOString(), // includes microseconds
  };

  try {
    // 🔗 Replace with your actual n8n webhook URL
    await axios.post("https://dden4.app.n8n.cloud/webhook/b83a898a-208d-4a30-a134-3b513beb6244", payload);

    res.json({ status: "Message sent to Doremon", data: payload });
  } catch (err) {
    console.error("Failed to send to n8n:", err.message);
    res.status(500).json({ error: "Failed to send to n8n" });
  }
});

// 💾 2. n8n will call this to send its reply
app.post("/store-response", (req, res) => {
  latestAnswer = req.body.reply || "";
  res.json({ status: "Reply stored" });
});

// 📤 3. Frontend will call this to fetch reply
app.get("/response", (req, res) => {
  res.json({ reply: latestAnswer });
  latestAnswer = ""; // optional: clear once read
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Doremon API is live on http://localhost:${PORT}`);
});
