import { type ChatInputCommandInteraction } from 'discord.js';

import type { Command } from '../../structures/Command.js';
import { connection } from '../../misc/util.js';

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

        connection.query("CREATE TABLE users (username VARCHAR(255), userId VARCHAR(255))", function (err, result) {
            if (err) throw err;
            console.log("Table created " + result);
        });
        interaction.reply({
            content: "The test worked!"
        })
    }
} satisfies Command;