import { ActivityType } from 'discord.js';
import { ExtendedClient } from './Structures/Classes/PolyBot.js';
import { Server } from "./Structures/Classes/Server.js";

export const client = new ExtendedClient();
await client.start();

export const server = new Server();
server.startServer();

client.on("ready", () => {
    console.log(`${client.user.username} is online!`.green.bold);
    client.user.setActivity({
        name: 'HEAVY DEVELOPMENT ONGOING',
        type: ActivityType.Watching
    });
});
