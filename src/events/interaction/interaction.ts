import { Events } from 'discord.js';
import type { Event } from '../../structures/Event.js';

export default {
    name: Events.InteractionCreate, // As placeholder
    async execute(interaction) {
        console.log(
            "[ LOGGER ]".magenta.bold,
            "Interaction ran in:".green.bold,
            `${interaction.guild.name}`.blue.bold,
            "with name".green.bold,
            `${interaction}`.blue.bold,
            "as type".green.bold,
            `${interaction.type.toString()}`.blue.bold,
            "by user".green.bold,
            `${interaction.user.username}`.blue.bold
        )
    }
} satisfies Event<Events.InteractionCreate>;