//import { ActivityType } from 'discord.js';
import { ExtendedClient } from './structures/Revver.js';
import { Server } from "./structures/Server.js";
import { Deployer } from './structures/Deployer.js';
// import { uploadDistToRemote } from './miscellaneous/util.js';
/*
if(process.cwd() == "G:\\Revver") {
    await uploadDistToRemote();
}
*/
export const deployer = new Deployer();
export const client = new ExtendedClient();
export const server = new Server();
deployer.deployCommands()
    .then(async () => {
    await client.start();
    await server.startServer();
})
    .catch(error => {
    console.log(error);
});
/*
client.on("ready", () => {
    console.log(`${client.user.username} is online!`.green.bold);
    client.user.setActivity({
        name: 'HEAVY DEVELOPMENT ONGOING',
        type: ActivityType.Watching
    });
});
 */ 
