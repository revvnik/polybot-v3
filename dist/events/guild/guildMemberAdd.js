import { Events } from 'discord.js';
import { content, embedDescription, welcomeEmbed } from '../../commands/admin/welcome.js';
import { Guild } from '../../schemas/Guild.js';
export default {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const finalContent = content.replace(/\{User\}/gi, `<@${member.user.id}>`);
        const finalEmbedDescription = embedDescription.replace(/\{User\}/gi, `<@${member.user.id}>`);
        const existingData = await Guild.findOne({ guildID: member.guild.id }).exec();
        if (existingData?.welcome.enabled == true) {
            if (existingData?.welcome.embed.embedEnabled == false) {
                const welcomeChannel = member.guild.channels.cache.get(existingData?.welcome.channel);
                welcomeChannel.send({ content: finalContent.toString() });
            }
            if (existingData?.welcome.embed.embedEnabled == true) {
                const welcomeChannel = member.guild.channels.cache.get(existingData?.welcome.channel);
                welcomeChannel.send({ embeds: [welcomeEmbed.setDescription(finalEmbedDescription.toString())] });
            }
        }
        else {
            return;
        }
    }
};
