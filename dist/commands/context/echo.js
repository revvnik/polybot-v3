import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ContextMenuCommandBuilder } from 'discord.js';
import { formatMessageToEmbed } from '../../miscellaneous/util.js';
const echoCommand = {
    build() {
        return new ContextMenuCommandBuilder()
            .setName("echo")
            .setType(ApplicationCommandType.Message);
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
export default echoCommand;
