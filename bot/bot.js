require("dotenv").config();

const {
  Client,
  Events,
  GatewayIntentBits,
  InteractionType,
} = require("discord.js");

const registerCommands = require("./commands/registerCommands");
const diceCommand = require("./commands/dice");
const renameCommand = require("./commands/rename");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

registerCommands();

bot.once(Events.ClientReady, (readyBot) => {
  console.log(`${readyBot.user.tag} is online!`);
});

bot.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hello") {
    await interaction.reply(`Hey ${interaction.user.username}`);
  } else if (interaction.commandName === "about") {
    await interaction.reply("About");
  } else if (interaction.commandName === "dice") {
    await diceCommand(interaction);
  } else if (interaction.commandName === "rename-channel") {
    await renameCommand(interaction);
  }
});

bot.login(process.env.DISCORD_TOKEN).catch(console.error);
