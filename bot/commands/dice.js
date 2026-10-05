function rollDice(sides) {
  if (!Number.isInteger(sides) || sides < 2) {
    return null;
  }

  return Math.floor(Math.random() * sides) + 1;
}

async function diceCommand(interaction) {
  const sides = interaction.options.getInteger("sides");
  const number = rollDice(sides);

  await interaction.reply(`You rolled a ${number}`);
}

module.exports = diceCommand;
