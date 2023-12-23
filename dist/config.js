import dotenv from "dotenv";
import "colorts/lib/string.js";
dotenv.config();
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
if (!DISCORD_TOKEN || !CLIENT_ID || GUILD_ID) {
    console.log("Missing environment variables!".red);
    process.exit(0);
}
export const config = {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUILD_ID,
    OWNER: ["774217476073848862"],
    COOLDOWN: 4000
};
