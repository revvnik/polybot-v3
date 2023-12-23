export default {
    name: "Test",
    description: "A command for testing purposes.",
    data: {
        name: 'test',
        description: 'See if the command is working!',
        options: [{
                "name": "testinput",
                "description": "This is a test input",
                "type": 3
            }]
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5
    },
    async execute(interaction) {
        const givenInput = interaction.options.getString("testinput");
        interaction.reply({
            content: "The test worked!" + givenInput
        });
    }
};
