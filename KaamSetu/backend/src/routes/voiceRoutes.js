import express from "express";

const router = express.Router();

// =========================
// TEST ROUTE FOR BROWSER
// =========================
router.get("/voice", (req, res) => {
  res.set("Content-Type", "text/xml");

  res.send(`
<Response>
  <Say voice="alice">
    Welcome to KaamSetu AI.
    Press 1 for plumber jobs.
    Press 2 for electrician jobs.
    Press 3 for painter jobs.
  </Say>

  <Gather
    numDigits="1"
    action="/api/voice/handle-key"
    method="POST"
  />
</Response>
  `);
});

// =========================
// TWILIO VOICE WEBHOOK
// =========================
router.post("/voice", (req, res) => {
  res.set("Content-Type", "text/xml");

  res.send(`
<Response>
  <Say voice="alice">
    Welcome to KaamSetu AI.
    Press 1 for plumber jobs.
    Press 2 for electrician jobs.
    Press 3 for painter jobs.
  </Say>

  <Gather
    numDigits="1"
    action="/api/voice/handle-key"
    method="POST"
  />
</Response>
  `);
});

// =========================
// HANDLE KEYPAD INPUT
// =========================
router.post("/handle-key", (req, res) => {
  const digit = req.body.Digits;

  let message = "No jobs available.";

  if (digit === "1") {
    message =
      "Nearest plumber job assigned successfully.";
  }

  if (digit === "2") {
    message =
      "Nearest electrician job assigned successfully.";
  }

  if (digit === "3") {
    message =
      "Nearest painter job assigned successfully.";
  }

  res.set("Content-Type", "text/xml");

  res.send(`
<Response>
  <Say voice="alice">
    ${message}
  </Say>
</Response>
  `);
});

export default router;