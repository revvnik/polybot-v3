import { AuditLogEvent } from "discord.js";
export class Logger {
    constructor() {
    }
    async fetchAuditLog(eventType, guild) {
        const fetchAuditLogs = guild.fetchAuditLogs({ limit: 1, type: eventType });
        return (await fetchAuditLogs).entries.first();
    }
    log(message) {
        console.log("[ LOGGER ]".magenta.bold, message);
    }
    async logChannelCreate(channel, guild) {
        const entry = await this.fetchAuditLog(AuditLogEvent.ChannelCreate, guild);
        this.log(`Channel created in: ${guild.name} with name ${channel.name} as type ${channel.type} by ${entry.executor.username}`);
    }
    async logChannelDelete(channel, guild) {
        const entry = await this.fetchAuditLog(AuditLogEvent.ChannelDelete, guild);
        this.log(`Channel deleted in: ${guild.name} with name ${channel.name} as type ${channel.type} by ${entry.executor.username}`);
    }
}
