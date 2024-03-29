import { Events, inlineCode, Collection, bold } from 'discord.js';
import type { Event } from '../../structures/types/Event.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isCommand() || !interaction.inCachedGuild()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);
        
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            await interaction.reply({
                content: `⚠️ There is no command matching ${inlineCode(interaction.commandName)}!`,
                ephemeral: true,
            });
            return;
        }
        
        if(interaction.isAutocomplete() && command.autocomplete) {
            await command.autocomplete(interaction);
            return;
        }

        // Permissions checks (owner, serverOwner, userPermissions, botPermissions) remain similar

        // Cooldown handling
        const { cooldown } = interaction.client;
        if (!cooldown.has(command.name)) {
            cooldown.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldown.get(command.name);
        const cooldownAmount = (command.opt?.cooldown || 3) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                await interaction.reply({
                    content: `⚠️ Please wait ${bold(`${timeLeft.toFixed(1)} more second(s)`)} before reusing the \`${command.name}\` command.`,
                    ephemeral: true,
                });
                return;
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        
        // Command execution
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `⚠️ There was an error while executing this command: \n${error.message} \nCheck the console for more info.`, ephemeral: true });
        }
    }
} satisfies Event<Events.InteractionCreate>;