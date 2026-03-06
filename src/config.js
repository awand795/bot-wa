const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const config = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  maxHistoryLength: 10,
  geminiModel: "gemini-1.5-flash",
};

if (!config.geminiApiKey || config.geminiApiKey === "your_gemini_api_key_here") {
  console.error("[ERROR] GEMINI_API_KEY is not set in .env file.");
  process.exit(1);
}

module.exports = config;
