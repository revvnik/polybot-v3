import { Events } from 'discord.js';
export default {
    name: Events.GuildDelete,
    async execute(guild) {
        console.log(guild.name);
    }
};
