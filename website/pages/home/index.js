import { loadChannels, setupChannelRename } from "./features/channels.js";

import { setupCommandToggle } from "./features/commandToggles.js";

setupCommandToggle("dice", "Dice", "diceToggle", "diceStatus");

setupCommandToggle("coinflip", "Coinflip", "coinflipToggle", "coinflipStatus");

setupChannelRename();
loadChannels();
