import { Events } from 'discord.js';

import type { Event } from '../../Structures/Event.js';

export default {
    name: Events.GuildDelete,
    async execute(guild) {
        console.log(guild.name);
    }
} satisfies Event<Events.GuildDelete>;