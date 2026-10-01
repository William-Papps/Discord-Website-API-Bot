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

loadDiceStatus();
