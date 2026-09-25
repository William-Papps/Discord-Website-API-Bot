require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.once(Events.ClientReady, (readyBot) => {
  console.log(`${readyBot.user.tag} is online!`);
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
