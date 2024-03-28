import { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } from 'discord.js';
// import { CustomPermissions } from "../../models/CustomPermissions.js";

import type { Event } from '../../structures/types/Event.js';

export default {
    name: Events.GuildCreate, // As placeholder
    async execute(guild) {
        console.log(
            "New guild:".green.bold,
            guild.name.blue.bold
        );

        (await guild.fetchOwner()).user.send("Thanks so much for inviting me! Stay tuned, you will get a message regarding ongoing changes soon, this message will be sent to every server owner.");

        
    }
} satisfies Event<Events.GuildCreate>;

const discordLink = new ButtonBuilder()
    .setCustomId("welcomeDiscordLink")
    .setLabel("Discord")
    .setStyle(ButtonStyle.Link)
    .setURL("")