const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { getGeminiResponse } = require("./lib/gemini");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: "/data/data/com.termux/files/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("[QR] Scan this QR code to log in:");
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("[AUTH] Authenticated successfully.");
});

client.on("auth_failure", (msg) => {
  console.error("[AUTH] Authentication failed:", msg);
});

client.on("ready", () => {
  console.log("[READY] WhatsApp bot is online!");
});

client.on("message", async (message) => {
  // Ignore non-text messages (images, stickers, etc.)
  if (message.body.length === 0) return;

  const senderId = message.from;
  const userText = message.body;

  console.log(`[MSG] From ${senderId}: ${userText}`);

  try {
    const reply = await getGeminiResponse(senderId, userText);
    await message.reply(reply);
    console.log(`[REPLY] To ${senderId}: ${reply.substring(0, 80)}...`);
  } catch (error) {
    console.error(`[ERROR] Failed to process message from ${senderId}:`, error.message);
    await message.reply("Maaf, saya tidak bisa memproses pesan itu saat ini. Silakan coba lagi nanti.");
  }
});

client.on("disconnected", (reason) => {
  console.log("[DISCONNECTED]", reason);
});

client.initialize();
