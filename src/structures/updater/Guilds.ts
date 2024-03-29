import { client } from "../../index.js";
import { Guild, IGuild } from "../../schemas/Guild.js";
import "colorts/lib/string.js";

export class GuildUpdater {
    async updateGuilds() {
        console.log(`Processing`.green.bold, `${client.guilds.cache.size}`.blue.bold, `guilds.`.green.bold); // Log the start and total guilds found
        try {
            for (const guild of client.guilds.cache.values()) {
                const existingGuild = await Guild.findOne({ guildID: guild.id }).exec();
                if (!existingGuild) {
                    const newGuildData = await this.createGuildData(guild.id);
                    if (newGuildData) {
                        const newGuild = new Guild(newGuildData);
                        await newGuild.save().then(() => {
                        }).catch((err) => {
                            console.error(`Failed to insert new guild: ${guild.id}`.red.bold, err);
                        });
                    } else {
                        console.log(`New guild data was null for guild: ${guild.id}`.red.bold);
                    }
                } else {
                    const updatedGuildInfo = await this.updateGuildInfo(guild.id);
                    if (updatedGuildInfo) {
                        await Guild.updateOne({ guildID: guild.id }, { $set: updatedGuildInfo }).exec().catch((err) => {
                            console.error(`Failed to update guild: ${guild.id}`.red.bold, err);
                        });
                    } else {
                        console.log(`Updated guild info was null for guild: ${guild.id}`.red.bold);
                    }
                }
            };
            console.log(`Successfully updated`.green.bold, `${client.guilds.cache.size}`.blue.bold, `guilds.`.green.bold);
        } catch (err) {
            console.error("Error in updateGuilds method".red.bold, err); // General error catch
        }
    }

    async createGuildData(guildID: string): Promise<Partial<IGuild> | null> {
        const guild = client.guilds.cache.get(guildID);
        if (!guild) {
            console.error(`Guild not found in cache: ${guildID}`.red.bold);
            return null;
        }
        await guild.members.fetch(); // Load all members for the guild
        const owner = await guild.fetchOwner();
        return {
            guildID: guild.id,
            guildName: guild.name,
            memberCount: guild.memberCount,
            ownerID: owner.id,
            ownerUsername: owner.user?.username || "Unknown",
            // Assuming default settings for welcome and goodbye:
            welcome: {
                enabled: false, // Defaulted to false as defined in your schema
                // channel, content, and embed can be set based on your requirements or left undefined
            },
            goodbye: {
                enabled: false, // Defaulted to false as defined in your schema
                // channel, content, and embed can be set based on your requirements or left undefined
            },
        };
    }

    async updateGuildInfo(guildID: string): Promise<Partial<IGuild> | null> {
        return this.createGuildData(guildID); // Utilizes createGuildData directly
    }

    async insertNewGuild(guildId: string) {
        const existingGuild = await Guild.findOne({ guildID: guildId }).exec();
        if (!existingGuild) {
            const newGuildData = await this.createGuildData(guildId);
            if (newGuildData) {
                const newGuild = new Guild(newGuildData);
                await newGuild.save().catch((err) => {
                    console.error(`Failed to insert new guild: ${guildId}`.red.bold, err);
                });
                console.log(`New guild inserted: ${guildId}`.green.bold);
            } else {
                console.error(`Guild data was null for guild: ${guildId}`.red.bold);
            }
        } else {
            console.log(`Guild already exists in database: ${guildId}`.yellow.bold);
        }
    }
}