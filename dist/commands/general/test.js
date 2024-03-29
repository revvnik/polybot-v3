import { SlashCommandBuilder } from 'discord.js';
const testCommand = {
    build() {
        return new SlashCommandBuilder()
            .setName('test')
            .setDescription('See if the command is working!')
            .toJSON();
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5,
    },
    async execute(interaction) {
        await interaction.reply({
            content: "The test worked!"
        });
    }
};
export default testCommand;
