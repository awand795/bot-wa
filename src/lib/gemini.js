const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config");

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: config.geminiModel });

// In-memory chat history: Map<senderId, Array<{role, parts}>>
const chatHistories = new Map();

function getHistory(senderId) {
  if (!chatHistories.has(senderId)) {
    chatHistories.set(senderId, []);
  }
  return chatHistories.get(senderId);
}

function trimHistory(history) {
  // Keep only the last N pairs (user + model = 2 entries each)
  const maxEntries = config.maxHistoryLength * 2;
  if (history.length > maxEntries) {
    history.splice(0, history.length - maxEntries);
  }
}

async function getGeminiResponse(senderId, userMessage) {
  const history = getHistory(senderId);

  const chat = model.startChat({ history });

  const result = await chat.sendMessage(userMessage);
  const response = result.response;
  const text = response.text();

  // Save to history
  history.push({ role: "user", parts: [{ text: userMessage }] });
  history.push({ role: "model", parts: [{ text }] });
  trimHistory(history);

  return text;
}

module.exports = { getGeminiResponse };
