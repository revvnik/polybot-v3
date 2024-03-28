import { AuditLogEvent, Events } from 'discord.js';

import type { Event } from '../../structures/types/Event.js';

export default {
    name: Events.ChannelCreate,
    async execute(channel) {
        const fetchAuditLogs = channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelCreate })
        const Entry = (await fetchAuditLogs).entries.first();

        console.log(
            "[ LOGGER ]".magenta.bold,
            "Channel created in:".green.bold,
            `${channel.guild.name}`.blue.bold,
            "with name".green.bold,
            `${channel.name}`.blue.bold,
            "as type".green.bold,
            `${channel.type}`.blue.bold,
            "by".green.bold,
            `${Entry.executor.username}`.blue.bold
        )
    }
} as Event<Events.ChannelCreate>;