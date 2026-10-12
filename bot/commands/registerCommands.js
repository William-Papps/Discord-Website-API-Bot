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

const coinflipCommand = new SlashCommandBuilder()
  .setName("coinflip")
  .setDescription("Flip a coin and get either heads or tails");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function getCommands() {
  const [rows] = await db.execute(
    `SELECT c.command_name
     FROM guild_commands AS gc
     JOIN commands AS c ON c.command_id = gc.command_id
     WHERE gc.guild_id = ? AND gc.enabled = 1`,
    [process.env.GUILD_ID],
  );

  const enabledNames = new Set(rows.map((row) => row.command_name));

  const allCommands = [
    helloCommand,
    aboutCommand,
    diceCommand,
    renameCommand,
    coinflipCommand,
  ];

  return allCommands
    .map((command) => command.toJSON())
    .filter((command) => enabledNames.has(command.name));
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
