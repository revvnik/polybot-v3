import { Events, ActionRowBuilder } from 'discord.js';
import { welcomeDiscordLink, welcomeWebsiteLink } from '../../structures/components/Buttons.js';
import { guildUpdater } from '../client/ready.js';
export default {
    name: Events.GuildCreate,
    async execute(guild) {
        console.log("New guild:".green.bold, guild.name.blue.bold);
        guildUpdater.insertNewGuild(guild.id);
        (await guild.fetchOwner()).user.send({
            content: "Thanks so much for inviting me! Stay tuned, you will get a message regarding ongoing changes soon, this message will be sent to every server owner.",
            components: [
                new ActionRowBuilder()
                    .addComponents(welcomeDiscordLink, welcomeWebsiteLink)
            ]
        });
    }
};
