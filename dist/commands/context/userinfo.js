import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from 'discord.js';
import moment from 'moment';
const userinfoCommand = {
    build() {
        return new ContextMenuCommandBuilder()
            .setName("userinfo")
            .setType(ApplicationCommandType.User);
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'Context',
        cooldown: 5
    },
    async execute(interaction) {
        const selectedUser = await interaction.user.fetch();
        const userInfoEmbed = new EmbedBuilder()
            .setAuthor({ name: `Userinfo of ${selectedUser.username}`, iconURL: selectedUser.displayAvatarURL() })
            .setTitle("Avatar URL")
            .setColor("Random")
            .setURL(selectedUser.displayAvatarURL())
            .addFields({
            name: "ID",
            value: `${selectedUser.id}`,
            inline: true
        }, {
            name: "Joined Discord at:",
            value: `${moment(selectedUser.createdAt).format("DD-MM-YYYY HH:mm:ss")}`,
            inline: true
        });
        await interaction.reply({
            embeds: [userInfoEmbed]
        });
    }
};
export default userinfoCommand;
