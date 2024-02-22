import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import mongoose from "mongoose";
import { connection, loadStructures } from '../misc/util.js';
import moment from "moment";
import type { Command } from './Command.js';
import { config } from '../config.js';
import { Restart } from '../models/Restart.js';
import { fileURLToPath } from 'node:url';
import { Event } from './Event.js';

export class ExtendedClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
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
        });
        this.commands = new Collection<string, Command>();
        this.cooldown = new Collection<string, Collection<string, number>>();
    };

    /**
     * Loads all commands and events from their respective folders.
     */
    async loadModules() {
        const commandFolderPath = fileURLToPath(new URL('../commands', import.meta.url));
        const commandFiles: Command[] = await loadStructures(commandFolderPath, ['data', 'execute']);

        for (const command of commandFiles) {
            this.commands.set(command.data.name, command);
        }

        const eventFolderPath = fileURLToPath(new URL('../events', import.meta.url));
        const eventFiles: Event[] = await loadStructures(eventFolderPath, ['name', 'execute']);

        for (const event of eventFiles) {
            this[event.once ? 'once' : 'on'](event.name, async (...args) => event.execute(...args));
        }
    }

    private async connectToDatabase() {
        mongoose.set("strictQuery", true);
        await mongoose.connect(`mongodb+srv://${config.MONGODBUSERNAME}:${config.MONGODBPASSWORD}@dripdb.ofzip.mongodb.net/PolyBase?retryWrites=true&w=majority`)
        console.log("Database is online!".green.bold);
    }

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
        connection.connect();
        connection.query("INSERT INTO restarts (time) VALUES (CURRENT_TIMESTAMP)", function (err, _result) {
            if (err) console.log(err);
            console.log("Logged restart to MySQL.");
        });
        connection.close();
    }

    /**
     * This is used to log into the Discord API with loading all commands and events.
     */
    async start() {
        await this.login(config.DISCORD_TOKEN);
        await this.loadModules();
        await this.connectToDatabase();
        await this.logRestartToDatabase();
        await this.logRestartToSQL();
    };
}

