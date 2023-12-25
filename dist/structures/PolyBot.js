import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { fileURLToPath, URL } from 'node:url';
import mongoose from "mongoose";
import { loadStructures } from '../misc/util.js';
import moment from "moment";
import { config } from '../config.js';
import { Restart } from '../models/Restart.js';
export class ExtendedClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
            ],
            failIfNotExists: false,
            rest: {
                retries: 3,
                timeout: 15_000
            },
        });
        this.commands = new Collection();
        this.cooldown = new Collection();
    }
    ;
    /**
     * Loads all commands and events from their respective folders.
     */
    async loadModules() {
        // Command handling
        const commandFolderPath = fileURLToPath(new URL('../commands', import.meta.url));
        const commandFiles = await loadStructures(commandFolderPath, ['data', 'execute']);
        for (const command of commandFiles) {
            this.commands.set(command.data.name, command);
        }
        // Event handling
        const eventFolderPath = fileURLToPath(new URL('../events', import.meta.url));
        const eventFiles = await loadStructures(eventFolderPath, ['name', 'execute']);
        for (const event of eventFiles) {
            this[event.once ? 'once' : 'on'](event.name, async (...args) => event.execute(...args));
        }
    }
    async connectToDatabase() {
        mongoose.set("strictQuery", true);
        mongoose.connect(`mongodb+srv://${config.MONGODBUSERNAME}:${config.MONGODBPASSWORD}@dripdb.ofzip.mongodb.net/PolyBase?retryWrites=true&w=majority`);
        console.log("Database is online!".green.bold);
    }
    async logRestartToDatabase() {
        try {
            const RestartTime = new Restart({
                time: moment().format("DD-MM-YYYY HH:mm:ss")
            });
            RestartTime.save();
            console.log("Last restart at:".green.bold, `${moment().format("DD-MM-YYYY HH:mm:ss")}.`.blue.bold);
        }
        catch (error) {
            console.log(error);
        }
    }
    /**
     * This is used to log into the Discord API with loading all commands and events.
     */
    start() {
        this.login();
        this.loadModules();
        this.connectToDatabase();
        this.logRestartToDatabase();
    }
    ;
}
;
