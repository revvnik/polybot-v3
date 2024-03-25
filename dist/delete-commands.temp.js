import { REST, Routes } from 'discord.js';
import { config } from "./config.js";
const rest = new REST().setToken(config.DISCORD_TOKEN);
// for global commands
rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);
