const express = require("express");

const commandSettings = require("../config/commandSettings");

const registerCommands = require("../bot/commands/registerCommands");

const app = express();

app.use(express.json());

app.get("/api/commands/dice", async (req, res) => {
  res.json({
    enabled: commandSettings.dice,
  });
});

app.post("/api/commands/dice", async (req, res) => {
  const enabled = req.body.enabled;

  if (typeof enabled !== "boolean") {
    return res.status(400).json({
      error: "Enabled mus be true or false.",
    });
  }

  commandSettings.dice = enabled;

  await registerCommands();

  res.json({
    enabled: commandSettings.dice,
  });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
