import { SlashCommandBuilder, ChannelType } from 'discord.js';
const repeatCommand = {
    build() {
        return new SlashCommandBuilder()
            .setName('repeat')
            .setDescription('Repeats a message as the bot.')
            .addStringOption(option => option.setName('message')
            .setDescription('The message to repeat')
            .setRequired(true))
            .addChannelOption(option => option.setName('channel')
            .setDescription('The channel to send the message in')
            .addChannelTypes(ChannelType.GuildText)) // Ensure only text channels can be selected
            .toJSON();
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5,
    },
    async execute(interaction) {
        const toRepeat = interaction.options.getString("message", true); // The "true" here asserts that this is required
        const channelToSend = interaction.options.getChannel("channel", false) || interaction.channel;
        channelToSend.send({
            content: toRepeat
        }).then(() => {
            interaction.reply({
                content: "Message sent!",
                ephemeral: true
            });
        }).catch(error => {
            console.error("Error sending message to channel:", error);
            interaction.reply({
                content: "Failed to send the message.",
                ephemeral: true
            });
        });
    }
};
export default repeatCommand;
