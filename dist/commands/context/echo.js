import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle } from 'discord.js';
import { formatMessageToEmbed } from '../../misc/util.js';
export default {
    name: "Echo",
    description: "Right click a message and select 'echo' to repeat what the user said.",
    data: {
        name: 'echo',
        type: ApplicationCommandType.Message,
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'Context',
        cooldown: 5
    },
    async execute(interaction) {
        const message = await interaction.targetMessage.fetch();
        await interaction.deferReply();
        await interaction.editReply({
            embeds: [formatMessageToEmbed(message)],
            components: [
                new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                    .setLabel('Original Message')
                    .setStyle(ButtonStyle.Link)
                    .setURL(message.url))
            ]
        });
    }
};
