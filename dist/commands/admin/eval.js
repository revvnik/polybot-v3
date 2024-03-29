import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
const evalCommand = {
    build() {
        return new SlashCommandBuilder()
            .setName("eval")
            .setDescription("Evaluate JavaScript code")
            .addStringOption(option => option.setName('code')
            .setDescription('The input to echo back'))
            .toJSON();
    },
    opt: {
        owner: true,
        serverOwner: false,
        category: 'Admin',
        cooldown: 5,
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
    },
    async execute(interaction) {
        const toEvaluate = interaction.options.getString("code");
        const isEvaluated = eval(toEvaluate);
        const evaluateEmbed = new EmbedBuilder()
            .setColor("#36393F")
            .addFields({
            name: "<a:1830vegarightarrow:1081563370882351174> Input",
            value: `\`\`\`${toEvaluate}\`\`\``,
        }, {
            name: "<a:8826vegaleftarrow:1081563410346541167> Output",
            value: `\`\`\`${isEvaluated}\`\`\``,
        });
        await interaction.reply({ embeds: [evaluateEmbed] });
    }
};
export default evalCommand;
