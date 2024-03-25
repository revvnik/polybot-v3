import { Events } from 'discord.js';
import GuildSettings from "../../schemas/Guild.js";
export default {
    name: Events.GuildCreate, // As placeholder
    async execute(guild) {
        console.log("New guild:".green.bold, guild.name.blue.bold);
        // Create guild document in mongoose
        await GuildSettings.create({
            GuildID: guild.id
        });
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
