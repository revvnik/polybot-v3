import { type ChatInputCommandInteraction, ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } from 'discord.js';
import type { Command } from '../../Structures/Types/Command.js';

import { dynamicImport, readAllFiles, capitalizeFirstLetter } from '../../Miscellaneous/util.js';
// import { pathToFileURL } from "node:url";
import path from "node:path";

export default {
    name: 'Help',
    description: 'Shows detailed information about the bot or specific commands.',
    data: {
        name: 'help',
        description: 'Shows detailed information about the bot or specific commands.',
        type: ApplicationCommandType.ChatInput, // Normal slash command by default
        options: [{
            "name": "page",
            "description": "Select a specific category. Select all to see all commands and descriptions.",
            "type": ApplicationCommandOptionType.String,
            "required": true,
            "choices": [
                {
                    name: "All",
                    value: "all"
                }
            ]
        }]
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'Information',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        const selectedOption = interaction.options.getString("page");
        
        const helpEmbed = new EmbedBuilder()
            .setDescription(`Revver Help | ${capitalizeFirstLetter(selectedOption)} \n`)
            .setColor("Random");

        // let str = "";
        for (const file of readAllFiles(path.join("./dist/commands"))) {
            let command = await dynamicImport(`./${file}`);
            helpEmbed.addFields({name: command.name, value: command.description});
        }

        interaction.reply({
            embeds: [helpEmbed],
            ephemeral: false,
        });
    }
} satisfies Command;