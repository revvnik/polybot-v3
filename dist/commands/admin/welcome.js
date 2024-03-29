import { SlashCommandBuilder } from 'discord.js';
const welcomeCommand = {
    build() {
        return new SlashCommandBuilder()
            .setName("welcome")
            .setDescription("Change the settings of the welcome module.")
            .addSubcommand(subcommand => subcommand
            .setName('status')
            .setDescription('Enable/Disable the welcome module.')
            .addStringOption(option => option.setName('enable').setDescription('Enables the welcome module for this guild.'))
            .addStringOption(option => option.setName('disable').setDescription('Disables the welcome module for this guild.')))
            .toJSON();
    },
    opt: {
        owner: false,
        serverOwner: true,
        category: 'Admin',
        cooldown: 5,
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
    },
    async execute(interaction) {
        await interaction.reply({ content: "Test" });
    }
};
export default welcomeCommand;
