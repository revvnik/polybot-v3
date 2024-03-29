import { REST, Routes, type RESTPutAPIApplicationCommandsJSONBody, type RESTPutAPIApplicationGuildCommandsJSONBody } from 'discord.js';
import { fileURLToPath, URL } from 'node:url';
import { loadStructures } from '../../miscellaneous/util.js';
import "colorts/lib/string.js";

export class Deployer {
    async deployCommands() {
        return new Promise(async (resolve, reject) => {
            const commands = [];

            const commandFolderPath = fileURLToPath(new URL('../../commands', import.meta.url));
            // Assuming loadStructures now correctly loads your command files as expected
            const commandFiles = await loadStructures(commandFolderPath, ['build', 'execute']);

            // Convert each command structure into the data format required by Discord API
            for (const command of commandFiles) {
                if (typeof command.build === 'function') {
                    commands.push(command.build());
                } else {
                    console.warn('Command structure is incorrect, missing build() method.');
                }
            }

            const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

            try {
                console.log(
                    `Started refreshing`.green.bold,
                    `${commands.length}`.blue.bold,
                    `application (/) commands.`.green.bold
                );

                let data = [];

                if (process.env.GUILD_ID) {
                    // Update commands for a specific guild
                    data = await rest.put(
                        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                        { body: commands }
                    ) as RESTPutAPIApplicationGuildCommandsJSONBody[];
                } else {
                    // Update global commands
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

                resolve(data);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
}