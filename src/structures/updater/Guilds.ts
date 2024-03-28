import { client } from "../../index.js";
import { Guild, IGuild } from "../../schemas/Guild.js";
import "colorts/lib/string.js";

export class GuildUpdater {
    async updateGuilds() {
        console.log(`Starting to update guilds... Total guilds in cache: ${client.guilds.cache.size}`); // Log the start and total guilds found
        try {
            client.guilds.cache.forEach(async (guild) => {
                console.log(`Processing guild: ${guild.id}`);
                const existingGuild = await Guild.findOne({ guildID: guild.id }).exec();
                if (!existingGuild) {
                    console.log(`Inserting a new guild: ${guild.id}`);
                    const newGuildData = await this.createGuildData(guild.id);
                    if (newGuildData) {
                        const newGuild = new Guild(newGuildData);
                        await newGuild.save().then(() => {
                            console.log(`Successfully inserted new guild: ${guild.id}`);
                        }).catch((err) => {
                            console.error(`Failed to insert new guild: ${guild.id}`, err);
                        });
                    } else {
                        console.log(`New guild data was null for guild: ${guild.id}`);
                    }
                } else {
                    console.log(`Found existing guild in DB: ${guild.id}, updating.`);
                    const updatedGuildInfo = await this.updateGuildInfo(guild.id);
                    if (updatedGuildInfo) {
                        await Guild.updateOne({ guildID: guild.id }, { $set: updatedGuildInfo }).exec().then(() => {
                            console.log(`Successfully updated guild: ${guild.id}`);
                        }).catch((err) => {
                            console.error(`Failed to update guild: ${guild.id}`, err);
                        });
                    } else {
                        console.log(`Updated guild info was null for guild: ${guild.id}`);
                    }
                }
            });
        } catch (err) {
            console.error("Error in updateGuilds method", err); // General error catch
        }
    }

    async createGuildData(guildID: string): Promise<Partial<IGuild> | null> {
        console.log(`Fetching data for guild: ${guildID}`);
        const guild = client.guilds.cache.get(guildID);
        if (!guild) {
            console.error(`Guild not found in cache: ${guildID}`);
            return null;
        }
        await guild.members.fetch(); // Load all members for the guild
        const owner = await guild.fetchOwner();
        console.log(`Successfully fetched data for guild: ${guildID}`);
        return {
            guildID: guild.id,
            memberCount: guild.memberCount,
            ownerID: owner.id,
            ownerUsername: owner.user?.username || "Unknown",
        };
    }

    async updateGuildInfo(guildID: string): Promise<Partial<IGuild> | null> {
        console.log(`Updating data for guild: ${guildID}`);
        return this.createGuildData(guildID); // Utilizes createGuildData directly
    }
}