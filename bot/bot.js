require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js");

const registerCommands = require("./commands/registerCommands");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

function rollDice(sides) {
  if (!Number.isInteger(sides) || sides < 2) {
    return null;
  }

  return Math.floor(Math.random() * sides) + 1;
}

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
    const sides = interaction.options.getInteger("sides");
    const number = rollDice(sides);

    await interaction.reply(`You rolled a ${number}`);
  }
});

bot.login(process.env.DISCORD_TOKEN).catch(console.error);
