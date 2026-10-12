export async function loadChannels() {
  const channelSelect = document.querySelector("#channelSelect");
  const response = await fetch("http://localhost:3000/api/channels");
  const channels = await response.json();

  channelSelect.innerHTML = '<option value="">Select a channel...</option>';

  for (const channel of channels) {
    const option = document.createElement("option");

    option.value = channel.id;
    option.textContent = channel.name;

    channelSelect.appendChild(option);
  }
}

const channelSelect = document.querySelector("#channelSelect");
const channelName = document.querySelector("#channelName");
const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click", async () => {
  const selectedChannelId = channelSelect.value;
  const newChannelName = channelName.value.trim();

  const response = await fetch("http://localhost:3000/api/channels/rename", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channelId: selectedChannelId,
      newName: newChannelName,
    }),
  });

  const data = await response.json();
  console.log(data.message);

  await loadChannels();
});

export function setupChannelRename() {
  const channelSelect = document.querySelector("#channelSelect");
  const channelName = document.querySelector("#channelName");
  const submitButton = document.querySelector("#submitButton");

  submitButton.addEventListener("click", async () => {
    const selectedChannelId = channelSelect.value;
    const newChannelName = channelName.value.trim();

    const response = await fetch("http://localhost:3000/api/channels/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelId: selectedChannelId,
        newName: newChannelName,
      }),
    });

    const data = await response.json();
    console.log(data.message);

    await loadChannels();
  });
}
