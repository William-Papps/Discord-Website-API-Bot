async function renameCommand(interaction) {
  const channel = interaction.options.getChannel("channel", true);
  const oldName = channel.name;
  const newName = interaction.options.getString("name", true);

  await channel.setName(newName);
  await interaction.reply(`Channel: ${oldName} name changed to ${newName}`);
}

module.exports = renameCommand;
