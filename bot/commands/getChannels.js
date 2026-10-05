async function getChannels(bot) {
  const guild = await bot.guilds.fetch(process.env.GUILD_ID);

  const channels = await guild.channels.fetch();

  return channels
    .filter((channel) => channel !== null)
    .map((channel) => ({
      id: channel.id,
      name: channel.name,
      type: channel.type,
    }));
}

module.exports = getChannels;
