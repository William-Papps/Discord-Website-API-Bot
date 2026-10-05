const express = require("express");

const cors = require("cors");

const commandSettings = require("../config/commandSettings");

const registerCommands = require("../bot/commands/registerCommands");

const db = require("../database/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/commands/:commandName", async (req, res) => {
  const commandName = req.params.commandName;

  const [rows] = await db.execute(
    "SELECT enabled FROM command_settings WHERE guild_id = ? AND command_name =?",
    [process.env.GUILD_ID, commandName],
  );

  if (rows.legenth === 0) {
    return res.status(404).json({
      error: "Command setting not found.",
    });
  }

  res.json({
    enabled: rows[0].enabled === 1,
  });
});

app.post("/api/commands/:commandName", async (req, res) => {
  const commandName = req.params.commandName;
  const enabled = req.body.enabled;

  if (typeof enabled !== "boolean") {
    return res.status(400).json({
      error: "Enabled mus be true or false.",
    });
  }

  const [rows] = await db.execute(
    "SELECT enabled FROM command_settings WHERE guild_id = ? AND command_name =?",
    [process.env.GUILD_ID, commandName],
  );

  if (rows.length === 0) {
    return res.status(404).json({
      error: "Command setting not foumd.",
    });
  }

  await db.execute(
    "UPDATE command_settings SET enabled = ? WHERE guild_id = ? and command_name = ?",
    [enabled, process.env.GUILD_ID, commandName],
  );

  await registerCommands();

  res.json({
    enabled: enabled,
  });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
