const { Client, Events, GatewayIntentBits } = require("discord.js");

const bot = new Client({
  intents: [GatewayIntentBits.Guilds],
});

bot.once(Events.ClientReady, (readyBot) => {
  console.log(`${readyBot.user.tag} is online!`);
});

bot.login(process.env.DISCORD_TOKEN).catch(console.error);
