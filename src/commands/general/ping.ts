import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Emoji } from '../../structures/types/Enums.js';
import type { Command } from '../../structures/types/Command.js';
import wait from 'node:timers/promises';

const pingCommand: Command = {
    build() {
        return new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Shows the response time of the bot.')
            .toJSON(); // Convert the command data to JSON
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5,
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        const currentTime = 1000 * 75 - interaction.client.uptime;
        const botReadyTimestamp = Math.round((Date.now() + currentTime) / 1000);

        // Prevent command use during bot startup period
        if (interaction.client.uptime < 1000 * 75) {
            await interaction.reply({
                content: `The bot is still starting up. Run this command again in ${botReadyTimestamp}ms to see statistical information.`,
                ephemeral: true,
            });
            return;
        }

        const msg = await interaction.reply({
            content: `${Emoji.StatusIdle} Pinging...`,
            fetchReply: true,
        });

        try {
            await wait.setTimeout(3000); // Artificial delay to simulate processing time

            const ping = msg.createdTimestamp - interaction.createdTimestamp;

            await interaction.editReply({
                content: `${Emoji.StatusOnline} Roundtrip Latency is ${ping}ms. Websocket Heartbeat is ${interaction.client.ws.ping}ms.`,
            });
        } catch (error) {
            console.error(`Failed to edit interaction: ${error.message}`);
        }
    },
};

export default pingCommand;