export function setupCommandToggle(commandName, label, buttonId, statusId) {
  const toggle = document.getElementById(buttonId);
  const status = document.getElementById(statusId);

  const url = `http://localhost:3000/api/commands/${commandName}`;

  let enabled;

  function updateDisplay() {
    status.textContent = `${label} command is ${enabled ? "ON" : "OFF"}`;
    toggle.textContent = `Turn ${label} ${enabled ? "Off" : "On"}`;
  }

  async function loadStatus() {
    toggle.disabled = true;
    status.textContent = "Loading...";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Could not load command setting.");
      }

      const data = await response.json();
      enabled = data.enabled;

      updateDisplay();
      toggle.disabled = false;
    } catch (error) {
      status.textContent = error.message;
    }
  }

  toggle.addEventListener("click", async () => {
    toggle.disabled = true;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enabled: !enabled,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not save command setting.");
      }

      const data = await response.json();
      enabled = data.enabled;

      updateDisplay();
    } catch (error) {
      status.textContent = error.message;
    } finally {
      toggle.disabled = false;
    }
  });

  loadStatus();
}
