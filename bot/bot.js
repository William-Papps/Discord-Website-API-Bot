require("dotenv").config();
const {
  Client,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
} = require("discord.js");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const helloCommand = new SlashCommandBuilder()
  .setName("hello")
  .setDescription("Replies with a greeting");

const aboutCommand = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Replies with about information");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function registerCommands() {
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: [helloCommand.toJSON(), aboutCommand.toJSON()],
  });

  console.log("Slash commands registered.");
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
    await interaction.reply(`About`);
  }
});

bot.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === `!hello`) {
    message.reply("Hey William!").catch(console.error);
  } else if (message.content.toLowerCase() === `!about`) {
    message.reply("Hey this is my about command!").catch(console.error);
  } else if (message.content.toLowerCase() === `!help`) {
    message.reply("Hey this is my help command!").catch(console.error);
  }
});

bot.login(process.env.DISCORD_TOKEN).catch(console.error);
