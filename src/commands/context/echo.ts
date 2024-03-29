import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ContextMenuCommandBuilder, type MessageContextMenuCommandInteraction } from 'discord.js';

import { formatMessageToEmbed } from '../../miscellaneous/util.js';

import type { Command } from '../../structures/types/Command.js';

const echoCommand: Command = {
    build() {
        return new ContextMenuCommandBuilder()
            .setName("echo")
            .setType(ApplicationCommandType.Message)
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'Context',
        cooldown: 5
    },
    async execute(interaction: MessageContextMenuCommandInteraction<'cached'>) {
        const message = await interaction.targetMessage.fetch();

        await interaction.deferReply();

        await interaction.editReply({
            embeds: [formatMessageToEmbed(message)],
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Original Message')
                            .setStyle(ButtonStyle.Link)
                            .setURL(message.url)
                    )
            ]
        });
    }
}
export default echoCommand;