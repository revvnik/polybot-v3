import { type ChatInputCommandInteraction, ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } from 'discord.js';
import type { Command } from '../../Structures/Command.js';
import {connection} from '../../Miscellaneous/util.js';

export default {
    name: "Sql",
    description: "Execute SQL queries.",
    owner: true,
    data: {
        name: 'sql',
        description: 'Execute SQL queries.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: "query",
                description: "The query to execute.",
                type: ApplicationCommandOptionType.String,
                required: true // String type by default
            }
        ]
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'Admin',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        
        const query = interaction.options.getString("query");
        const output = connection.query(query, function (err, result) {
            if (err) console.log(err);
            console.log("Query executed " + result);
        });

        const evaluateEmbed = new EmbedBuilder()
        .setColor("#36393F")
        .addFields(
          {
            name: "<a:1830vegarightarrow:1081563370882351174> Input",
            value: `\`\`\`${query}\`\`\``,
          },
          {
            name: "<a:8826vegaleftarrow:1081563410346541167> Output",
            value: `\`\`\`${output}\`\`\``,
          }
        );
        await interaction.reply({ embeds: [evaluateEmbed] });
    }
} satisfies Command;