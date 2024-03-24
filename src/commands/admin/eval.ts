import { type ChatInputCommandInteraction, ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } from 'discord.js';
import type { Command } from '../../structures/Command.js';

export default {
    name: "Eval",
    description: "Evaluate JavaScript code.",
    owner: true,
    data: {
        name: 'eval',
        description: 'Evaluate JavaScript code.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: "code",
                description: "The code to evaluate.",
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
        
        const toEvaluate = interaction.options.getString("code");
        const isEvaluated = eval(toEvaluate);

        const evaluateEmbed = new EmbedBuilder()
        .setColor("#36393F")
        .addFields(
          {
            name: "<a:1830vegarightarrow:1081563370882351174> Input",
            value: `\`\`\`${toEvaluate}\`\`\``,
          },
          {
            name: "<a:8826vegaleftarrow:1081563410346541167> Output",
            value: `\`\`\`${isEvaluated}\`\`\``,
          }
        );
        await interaction.reply({ embeds: [evaluateEmbed] });
    }
} satisfies Command;