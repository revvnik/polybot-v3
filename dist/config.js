import dotenv from "dotenv";
import "colorts/lib/string.js";
dotenv.config();
export const config = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    GUILD_ID: process.env.GUILD_ID,
    MONGODBUSERNAME: process.env.MONGODBUSERNAME,
    MONGODBPASSWORD: process.env.MONGODBPASSWORD,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_USERNAME: process.env.MYSQL_USERNAME,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_PORT: process.env.MYSQL_PORT,
    OWNER: process.env.OWNER,
    COOLDOWN: process.env.COOLDOWN,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
};
const missingVariables = Object.keys(config).filter(key => !config[key]);
if (missingVariables.length > 0) {
    console.log("Missing environment variables!".red, missingVariables);
    process.exit(0);
}
export const BotOwner = {
    userId: '774217476073848862',
    permission: 'REVVER.ALL'
};
export const GuildOwner = {
    userId: String,
    permission: 'REVVER.SERVER_OWNER'
};
export const db_config = {
    host: config.MYSQL_HOST,
    user: config.MYSQL_USERNAME,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DB
};
