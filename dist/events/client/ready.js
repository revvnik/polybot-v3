import { Events, ActivityType } from 'discord.js';
import "colorts/lib/string.js";
export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`${client.user.username} is online`.green.bold);
        client.user.setActivity({
            name: 'the development process',
            type: ActivityType.Watching
        });
    }
};
