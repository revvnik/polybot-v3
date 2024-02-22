import { type ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import type { Command } from '../../structures/Command.js';
import moment from "moment";

export default {
    name: "Userinfo",
    description: "Shows information about a user.",
    data: {
        name: 'userinfo',
        description: 'Shows information about a user.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: "user",
                description: "Select a user to show the information of.",
                type: ApplicationCommandOptionType.User
            }
        ]
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: '',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        
        const selectedMember = interaction.options.getMember("user") || interaction.member
        const selectedUser = selectedMember.user;

        const userInfoEmbed = new EmbedBuilder()
            .setAuthor({ name: `Userinfo of ${selectedUser.username}`, iconURL: selectedUser.displayAvatarURL()})
            .setTitle("Avatar URL")
            .setColor("Random")
            .setURL(selectedUser.avatarURL())
            .addFields(
                {
                    name: "ID",
                    value: `${selectedUser.id}`,
                    inline: true
                },
                {
                    name: "Joined Discord at:",
                    value: `${moment(selectedUser.createdAt).format("DD-MM-YYYY HH:mm:ss")}`,
                    inline: true
                }
            )


        await interaction.reply({
            embeds: [userInfoEmbed]
        });
    }
} satisfies Command;