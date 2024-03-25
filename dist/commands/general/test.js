export default {
    name: "Test",
    description: "A command for testing purposes.",
    data: {
        name: 'test',
        description: 'See if the command is working!',
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5
    },
    async execute(interaction) {
        const Guilds = interaction.client.guilds.cache.map(guild => guild.id && guild.name);
        Guilds.forEach((element) => console.log(element));
        interaction.reply({
            content: "The test worked! Logged all guild IDs."
        });
    }
};
