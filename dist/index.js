import { ExtendedClient } from './structures/PolyBot.js';
import { keepAlive } from './structures/Server.js';
const client = new ExtendedClient();
client.start();
keepAlive();
