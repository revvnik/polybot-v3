import { Events } from 'discord.js';
import { guildUpdater } from '../client/ready.js';
export default {
    name: Events.GuildDelete,
    async execute(guild) {
        console.log("Bot was removed from guild:".red.bold, guild.name.blue.bold);
        guildUpdater.deleteGuild(guild.id);
    }
};
