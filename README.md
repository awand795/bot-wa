# WhatsApp Gemini AI Bot

Bot WhatsApp otomatis yang menggunakan **Google Gemini AI** untuk membalas setiap pesan masuk dengan respons cerdas. Dibangun dengan [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) dan [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai).

## Fitur

- **Universal Response** — Membalas semua pesan teks masuk tanpa prefix command
- **Session Persistence** — Menggunakan `LocalAuth` sehingga tidak perlu scan QR code berulang kali
- **Chat Memory** — Menyimpan 10 riwayat percakapan terakhir per pengirim untuk konteks AI
- **Error Handling** — Mengirim pesan sopan jika AI gagal memproses, tanpa crash
- **Docker Ready** — Dockerfile dan docker-compose.yml siap pakai

## Struktur Proyek

```
Bot Wa/
├── .env                  # Gemini API Key
├── .gitignore
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── src/
    ├── config.js         # Konfigurasi & validasi environment
    ├── index.js          # WhatsApp client & message listener
    └── lib/
        └── gemini.js     # Integrasi Gemini AI dengan history
```

## Prasyarat

- **Node.js** v18 atau lebih baru
- **Google Gemini API Key** — dapatkan di [Google AI Studio](https://aistudio.google.com/apikey)

## Instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/awand795/bot-wa.git
   cd bot-wa
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Buat file `.env` dan isi API key:

   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Jalankan bot:

   ```bash
   npm start
   ```

5. Scan QR code yang muncul di terminal menggunakan WhatsApp.

## Menjalankan dengan Docker

```bash
docker compose up --build
```

Lihat QR code di log:

```bash
docker compose logs -f
```

Session WhatsApp disimpan di Docker volume sehingga tetap tersedia setelah restart container.

## Teknologi

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) — WhatsApp Web API client
- [Google Gemini AI](https://ai.google.dev/) — Model `gemini-1.5-flash`
- [Puppeteer](https://pptr.dev/) — Headless Chromium untuk WhatsApp Web
- [dotenv](https://www.npmjs.com/package/dotenv) — Environment variable management

## Lisensi

MIT
