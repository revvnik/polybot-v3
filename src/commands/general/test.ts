import { type ChatInputCommandInteraction } from 'discord.js';

import type { Command } from '../../structures/types/Command.js';

export default {
    name: "Test",
    description: "A command for testing purposes.",
    data: {
        name: 'test',
        description: 'See if the command is working!',
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        interaction.reply({
            content: "The test worked!"
        })
    }
} satisfies Command;