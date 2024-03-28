import { Events } from 'discord.js';
export default {
    name: Events.GuildCreate, // As placeholder
    async execute(guild) {
        console.log("New guild:".green.bold, guild.name.blue.bold);
        /*
        const members = await guild.members.fetch();

        for(const id of members.keys()) {
            await CustomPermissions.create({
                GuildID: guild.id,
                UserID: id,
                UserPermissions: []
            });
        }
        */
    }
};
