import { REST, Routes, } from 'discord.js';
import { fileURLToPath, URL } from 'node:url';
import { loadStructures } from './miscellaneous/util.js';
import "colorts/lib/string.js";
const commands = [];
const commandFolderPath = fileURLToPath(new URL('commands', import.meta.url));
const commandFiles = await loadStructures(commandFolderPath, ['data', 'execute']);
// Grab the output of each command for deployment
for (const command of commandFiles) {
    commands.push(command.data);
}
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);
// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing`.green.bold, `${commands.length}`.blue.bold, `application (/) commands.`.green.bold);
        let data = [];
        if (process.env.GUILD_ID) {
            // The put method is used to fully refresh all commands in a guild with the current set
            data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        }
        else {
            // The put method is used to fully refresh all commands in all guilds with the current set
            data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        }
        ;
        console.log(`Successfully reloaded`.green.bold, `${data.length}`.blue.bold, `application (/) commands`.green.bold, `${process.env.GUILD_ID ? `in guild ${process.env.GUILD_ID.blue.bold}`.green.bold : ''}.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
    ;
})();
