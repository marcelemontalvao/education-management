const cors = require("cors");
const { env } = require("./env");

const allowedOrigin = env.UI_URL?.replace(/\/+$/, "");
const alternateOrigin = allowedOrigin
  ?.replace(/-5173(?=\.|$)/, "-5174")
  .replace(/:5173$/, ":5174");

const corsPolicy = cors({
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigin || origin === alternateOrigin) {
      return callback(null, true);
    }

    return callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept", "Origin", "X-CSRF-TOKEN"],
  credentials: true,
});

module.exports = { corsPolicy };
