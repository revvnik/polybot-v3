import {
    REST,
    Routes,
    type RESTPutAPIApplicationCommandsJSONBody,
    type RESTPutAPIApplicationGuildCommandsJSONBody,
} from 'discord.js';
import { fileURLToPath, URL } from 'node:url';
import { loadStructures } from '../../miscellaneous/util.js';
import "colorts/lib/string.js";

export class Deployer {
    async deployCommands() {
        return new Promise(async (resolve, reject) => {
            const commands = [];

            const commandFolderPath = fileURLToPath(new URL('../../commands', import.meta.url));
            const commandFiles = await loadStructures(commandFolderPath, ['data', 'execute']);

            for (const command of commandFiles) {
                commands.push(command.data);
            }

            const rest = new REST().setToken(process.env.DISCORD_TOKEN);

            try {
                console.log(
                    `Started refreshing`.green.bold,
                    `${commands.length}`.blue.bold,
                    `application (/) commands.`.green.bold
                );

                let data = [];

                if (process.env.GUILD_ID) {
                    data = await rest.put(
                        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                        { body: commands }
                    ) as RESTPutAPIApplicationGuildCommandsJSONBody[];
                } else {
                    data = await rest.put(
                        Routes.applicationCommands(process.env.CLIENT_ID),
                        { body: commands }
                    ) as RESTPutAPIApplicationCommandsJSONBody[];
                }

                console.log(
                    `Successfully reloaded`.green.bold,
                    `${data.length}`.blue.bold,
                    `application (/) commands`.green.bold,
                    `${process.env.GUILD_ID ? `in guild ${process.env.GUILD_ID.blue.bold}`.green.bold : ''}.`
                );

                resolve(data); // Resolve the promise once deployment is complete
            } catch (error) {
                console.error(error);
                reject(error); // Reject the promise if there's an error during deployment
            }
        });
    }
}