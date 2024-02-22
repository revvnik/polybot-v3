import { ActivityType } from 'discord.js';
import { ExtendedClient } from './structures/PolyBot.js';
import { startServer } from './misc/util.js';

export const client = new ExtendedClient();
await client.start();

client.on("ready", () => {
    console.log(`${client.user.username} is online!`.green.bold);
    client.user.setActivity({
        name: 'the development process',
        type: ActivityType.Watching
    });
});

startServer();
