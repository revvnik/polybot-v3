import { type ChatInputCommandInteraction, ApplicationCommandType } from 'discord.js';
import type { Command } from '../../structures/Command.js';
import * as webhooks from "../../misc/webhooks.json" assert { type: "json" };
import { sendWebhook } from '../../misc/webhooks.js';

export default {
    name: "SendWebhook",
    description: "Sends a webhook message.",
    data: {
        name: 'webhook',
        description: 'Send, edit or delete a webhook message.',
        type: ApplicationCommandType.ChatInput
    },
    opt: {
        userPermissions: ['Administrator'],
        botPermissions: ['SendMessages'],
        category: 'Admin',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {


        sendWebhook(webhooks.default['terms-of-service'].id, webhooks.default['terms-of-service'].token, "Test", "username")

        
        await interaction.reply({
            content: ''
        });
    }
} satisfies Command;