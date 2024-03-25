import { ActivityType } from 'discord.js';
import { ExtendedClient } from './structures/Revver.js';
import { Server } from "./structures/Server.js";
// import { uploadDistToRemote } from './miscellaneous/util.js';
/*
if(process.cwd() == "G:\\Revver") {
    await uploadDistToRemote();
}
*/
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
