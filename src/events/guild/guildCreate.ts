import { Events } from 'discord.js';
// import { CustomPermissions } from "../../models/CustomPermissions.js";

import type { Event } from '../../structures/types/Event.js';

export default {
    name: Events.GuildCreate, // As placeholder
    async execute(guild) {
        console.log(
            "New guild:".green.bold,
            guild.name.blue.bold
        );

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
} satisfies Event<Events.GuildCreate>;