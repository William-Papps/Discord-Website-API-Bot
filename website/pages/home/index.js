const diceToggle = document.getElementById("diceToggle");
const diceStatus = document.getElementById("diceStatus");

let diceEnabled = true;

diceToggle.addEventListener("click", async () => {
  diceToggle.disabled = true;

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

  if (data.enabled) {
    diceStatus.textContent = "Dice command is ON";
    diceToggle.textContent = "Turn Dice Off";
  } else {
    diceStatus.textContent = "Dice command is OFF";
    diceToggle.textContent = "Turn Dice On";
  }

  diceToggle.disabled = false;
});
