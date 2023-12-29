import dotenv from "dotenv";
import "colorts/lib/string.js";

dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID, MONGODBUSERNAME, MONGODBPASSWORD } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID || !MONGODBUSERNAME || !MONGODBPASSWORD ) {
    console.log("Missing environment variables!".red)
    process.exit(0)
}

export const config = {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUILD_ID,
    MONGODBUSERNAME,
    MONGODBPASSWORD,
    OWNER: "774217476073848862",
    COOLDOWN: 4000
};

export const BotOwner = {
    userId: '774217476073848862',
    permission: 'POLYBOT.ALL'
}

export const GuildOwner = {
    userId: String,
    permission: 'POLYBOT.SERVER_OWNER'
}