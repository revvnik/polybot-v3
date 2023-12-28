import { type ChatInputCommandInteraction, ApplicationCommandType, TextChannel, ChannelType } from 'discord.js';
import type { Command } from '../../structures/Command.js';

export default {
    name: "Repeat",
    description: "Repeats a message as the bot.",
    customPermissions: ["POLYBOT.ALL"],
    data: {
        name: 'repeat',
        description: 'Repeat a message!',
        type: ApplicationCommandType.ChatInput, // Normal slash command by default
        options: [
            {
                name: "message",
                description: "The message to repeat",
                type: 3,
                required: true // String type by default
            },
            {
                name: "channel",
                description: "The channel to send the message in",
                type: 7,
                channel_types: [ChannelType.GuildText]
            }
        ]
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        const toRepeat = interaction.options.getString("message");
        const channelToSend = interaction.options.getChannel("channel") || interaction.channel;

        (channelToSend as TextChannel).send({
            content: toRepeat
        })
    
        interaction.reply({
            content: "Message sent!",
            ephemeral: true
        })
    }
} satisfies Command;