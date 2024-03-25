import { ActivityType, Events } from 'discord.js';
export default {
    name: Events.ClientReady,
    async execute(client) {
        console.log(`${client.user.username} is online!`.green.bold);
        client.user.setActivity({
            name: 'HEAVY DEVELOPMENT ONGOING',
            type: ActivityType.Watching
        });
    }
};
