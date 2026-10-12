function coinflip() {
  const random = Math.floor(Math.random() * 2);

  if (random === 1) {
    return "Heads";
  } else {
    return "Tails";
  }
}

async function coinflipCommand(interaction) {
  const result = coinflip();
  await interaction.reply(`${result}`);
}

module.exports = coinflipCommand;
