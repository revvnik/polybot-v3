import { Events } from 'discord.js';

import type { Event } from '../../structures/Event.js';

export default {
    name: Events.ChannelCreate,
    async execute(channel) {
        console.log(channel.name);
    }
} satisfies Event<Events.ChannelCreate>;