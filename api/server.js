const express = require("express");

const commandSettings = require("../config/commandSettings");

const { registerCommands } = require("../bot/bot");

const app = express();

app.use(express.json());
