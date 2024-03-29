import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import type { Command } from '../../structures/types/Command.js';
import moment from "moment";

const userinfoCommand: Command = {
    build() {
        return new SlashCommandBuilder()
            .setName('userinfo')
            .setDescription('Shows information about a user.')
            .addUserOption(option => 
                option.setName('user')
                    .setDescription('Select a user to show the information of.'))
            .toJSON();
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'Information',
        cooldown: 5,
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        const selectedMember = interaction.options.getMember("user") || interaction.member;
        const selectedUser = selectedMember.user;

        const userInfoEmbed = new EmbedBuilder()
            .setAuthor({ name: `Userinfo of ${selectedUser.username}`, iconURL: selectedUser.displayAvatarURL()})
            .setTitle("Avatar URL")
            .setColor("Random")
            .setURL(selectedUser.displayAvatarURL())
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
            );

        await interaction.reply({
            embeds: [userInfoEmbed]
        });
    }
};

export default userinfoCommand;