require("dotenv").config();

const {
  SlashCommandBuilder,
  REST,
  Routes,
  CommandInteractionOptionResolver,
} = require("discord.js");

const db = require("../../database/db");

const helloCommand = new SlashCommandBuilder()
  .setName("hello")
  .setDescription("Replies with a greeting");

const aboutCommand = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Replies with about information");

const diceCommand = new SlashCommandBuilder()
  .setName("dice")
  .setDescription("Rolls a random number")
  .addIntegerOption((option) =>
    option
      .setName("sides")
      .setDescription("Number of sides to roll on dice")
      .setMinValue(2)
      .setRequired(true),
  );

const renameCommand = new SlashCommandBuilder()
  .setName("rename-channel")
  .setDescription(
    "Reads the selected channel and new name, then calls your rename function.",
  )
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Select the channel to rename")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("New Name for Channel")
      .setRequired(true),
  );

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function getCommands() {
  const commands = [helloCommand.toJSON(), aboutCommand.toJSON()];

  const [rows] = await db.execute(
    "SELECT enabled FROM command_settings WHERE guild_id = ? AND command_name = ?",
    [process.env.GUILD_ID, "dice"],
  );

  if (rows.length > 0 && rows[0].enabled === 1) {
    commands.push(diceCommand.toJSON());
  }

  const [renameRows] = await db.execute(
    "SELECT enabled FROM command_settings WHERE guild_id = ? AND command_name = ?",
    [process.env.GUILD_ID, "rename-channel"],
  );

  if (renameRows.length > 0 && renameRows[0].enabled === 1) {
    commands.push(renameCommand.toJSON());
  }

  return commands;
}

async function registerCommands() {
  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID,
    ),
    {
      body: await getCommands(),
    },
  );

  console.log("Slash commands registered.");
}

module.exports = registerCommands;
