import { Events } from 'discord.js';
import type { Event } from '../../structures/types/Event.js';
import { guildUpdater } from '../client/ready.js';
import { InviteEmbed } from '../../structures/builders/Embed.js';
import { InviteActionRow } from '../../structures/builders/ActionRow.js';

export default {
    name: Events.GuildCreate,
    async execute(guild) {
        console.log(
            "Bot was added to guild:".green.bold,
            guild.name.blue.bold
        );
        guildUpdater.insertNewGuild(guild.id);

        (await guild.fetchOwner()).user.send({
            embeds: [InviteEmbed],
            components: [InviteActionRow]
        });

        
    }
} satisfies Event<Events.GuildCreate>;