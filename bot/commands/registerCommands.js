require("dotenv").config();

const { SlashCommandBuilder, REST, Routes } = require("discord.js");

const commandSettings = require("../../config/commandSettings");

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

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

function getCommands() {
  const commands = [helloCommand.toJSON(), aboutCommand.toJSON()];

  if (commandSettings.dice) {
    commands.push(diceCommand.toJSON());
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
      body: getCommands(),
    },
  );

  console.log("Slash commands registered.");
}

module.exports = registerCommands;
