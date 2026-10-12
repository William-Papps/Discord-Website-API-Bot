const diceToggle = document.getElementById("diceToggle");
const diceStatus = document.getElementById("diceStatus");

let diceEnabled;

function updateDiceDisplay() {
  if (diceEnabled) {
    diceStatus.textContent = "Dice command is ON";
    diceToggle.textContent = "Turn Dice Off";
  } else {
    diceStatus.textContent = "Dice command is OFF";
    diceToggle.textContent = "Turn Dice On";
  }
}

async function loadDiceStatus() {
  const response = await fetch("http://localhost:3000/api/commands/dice");

  const data = await response.json();

  diceEnabled = data.enabled;

  updateDiceDisplay();
}

diceToggle.addEventListener("click", async () => {
  diceToggle.disabled = true;

  try {
    diceEnabled = !diceEnabled;

    const response = await fetch("http://localhost:3000/api/commands/dice", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        enabled: diceEnabled,
      }),
    });

    const data = await response.json();

    diceEnabled = data.enabled;

    updateDiceDisplay();
  } finally {
    diceToggle.disabled = false;
  }
});

// Coinflip
const coinflipStatus = document.getElementById("coinflipStatus");
const coinflipToggle = document.getElementById("coinflipToggle");

let coinflipEnabled;

function updateCoinflipDisplay() {
  if (coinflipEnabled) {
    coinflipStatus.textContent = "Coinflip command is ON";
    coinflipToggle.textContent = "Turn Coinflip Off";
  } else {
    coinflipStatus.textContent = "Coinflip command is OFF";
    coinflipToggle.textContent = "Turn Coinflip On";
  }
}

async function loadCoinflipStatus() {
  const response = await fetch("http://localhost:3000/api/commands/coinflip");

  const data = await response.json();

  coinflipEnabled = data.enabled;

  updateCoinflipDisplay();
}

coinflipToggle.addEventListener("click", async () => {
  coinflipToggle.disabled = true;

  try {
    coinflipEnabled = !coinflipEnabled;

    const response = await fetch(
      "http://localhost:3000/api/commands/coinflip",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          enabled: coinflipEnabled,
        }),
      },
    );

    const data = await response.json();

    coinflipEnabled = data.enabled;

    updateCoinflipDisplay();
  } finally {
    coinflipToggle.disabled = false;
  }
});

async function loadChannels() {
  try {
    const response = await fetch("http://localhost:3000/api/channels");

    if (!response.ok) {
      throw new Error("Could not load channels");
    }

    const channels = await response.json();

    const dropdown = document.getElementById("channelSelect");

    for (const channel of channels) {
      const option = document.createElement("option");

      option.value = channel.id;
      option.textContent = channel.name;

      dropdown.appendChild(option);
    }
  } catch (error) {
    console.error(error);
  }
}

loadChannels();
loadDiceStatus();
loadCoinflipStatus();
