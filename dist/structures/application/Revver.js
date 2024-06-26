import { Client, Collection, GatewayIntentBits, Options, Partials } from 'discord.js';
import mongoose from "mongoose";
import { config } from '../../config.js';
// import { Restart } from '../schemas/Restart.js';
import { fileURLToPath } from 'node:url';
import { loadStructures } from '../../miscellaneous/util.js';
export class ExtendedClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers
            ],
            partials: [
                Partials.GuildMember,
                Partials.Channel
            ],
            failIfNotExists: false,
            rest: {
                retries: 3,
                timeout: 15_000
            },
            sweepers: {
                ...Options.DefaultSweeperSettings,
                messages: {
                    lifetime: 43_200,
                    interval: 86_400
                },
                users: {
                    interval: 86_400,
                    filter: () => user => user.bot && user.id !== user.client.user.id,
                }
            }
        });
        this.commands = new Collection();
        this.cooldown = new Collection();
    }
    ;
    /**
     * Loads all commands and events from their respective folders.
     */
    async loadModules() {
        const commandFolderPath = fileURLToPath(new URL('../../commands', import.meta.url));
        const commandFiles = await loadStructures(commandFolderPath, ['build', 'execute']);
        for (const command of commandFiles) {
            this.commands.set(command.build().name, command);
        }
        const eventFolderPath = fileURLToPath(new URL('../../events', import.meta.url));
        const eventFiles = await loadStructures(eventFolderPath, ['name', 'execute']);
        for (const event of eventFiles) {
            this[event.once ? 'once' : 'on'](event.name, async (...args) => event.execute(...args));
        }
    }
    async connectToDatabase() {
        mongoose.set("strictQuery", true);
        await mongoose.connect(`mongodb+srv://${config.MONGODBUSERNAME}:${config.MONGODBPASSWORD}@dripdb.ofzip.mongodb.net/PolyBase?retryWrites=true&w=majority`);
        console.log("Database is online!".green.bold);
    }
    /*
    private async logRestartToDatabase() {
        try {
            const RestartTime = new Restart({
                time: moment().format("DD-MM-YYYY HH:mm:ss")
            })
            await RestartTime.save();
            console.log(
                "Last restart at:".green.bold,
                `${moment().format("DD-MM-YYYY HH:mm:ss")}.`.blue.bold
                )
        } catch(error) {
            console.log(error)
        }
    }

    
    private async logRestartToSQL() {
        connection.query("INSERT INTO restarts (time) VALUES (CURRENT_TIMESTAMP)", function (err, _result) {
            if (err) console.log(err);
            console.log("Logged restart to MySQL.");
        });

    }
    */
    /*
     * This is used to log into the Discord API with loading all commands and events.
     */
    async start() {
        this.login(config.DISCORD_TOKEN);
        this.loadModules();
        this.connectToDatabase();
    }
    ;
}
