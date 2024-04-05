import { type ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ChannelType } from 'discord.js';
import type { Command } from '../../structures/types/Command.js';
import { guildUpdater } from '../../events/client/ready.js';
import { Guild } from '../../schemas/Guild.js';

let content = '';
let embedDescription = '';
let welcomeEmbed = new EmbedBuilder();

const welcomeCommand: Command = {
    build() {
        return new SlashCommandBuilder()
            .setName("welcome")
            .setDescription("Change the settings of the welcome module.")
            .addSubcommand(subcommand =>
                subcommand
                    .setName("enable")
                    .setDescription("Enable the welcome module."))
            .addSubcommand(subcommand =>
                subcommand
                    .setName("settings")
                    .setDescription("Enable the welcome module.")
                    .addChannelOption(option => option.setName("channel").setDescription("Set the channel for the welcome module.").addChannelTypes(ChannelType.GuildText).setRequired(true))
                    .addStringOption(option => option.setName("content").setDescription("Set the content for the welcome module. Use {user} as a placeholder to mention the user.").setRequired(true))
                    .addBooleanOption(option => option.setName("embed").setDescription("Set whether the message should be embedded or not.").setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand
                    .setName("disable")
                    .setDescription("Disable the welcome module."))
            .addSubcommand(subcommand =>
                subcommand
                    .setName("embed")
                    .setDescription("Customize the embed for the welcome module.")
                    .addStringOption(option => option.setName("description").setDescription("Set the embed content. Use {user} as a placeholder to mention the user."))
                    .addStringOption(option => option.setName("color").setDescription("Set the embed color. Default is #e0a113."))
                    .addStringOption(option => option.setName("thumbnail").setDescription("Set the embed thumbnail URL."))
                    .addStringOption(option => option.setName("footer").setDescription("Set the embed footer."))
                    .addStringOption(option => option.setName("image").setDescription("Set the embed image URL.")))
            .toJSON();
        },
    opt: {
        owner: false,
        serverOwner: true,
        category: 'Admin',
        cooldown: 5,
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        if(interaction.options.getSubcommand() == "enable") {
            const existingData = await Guild.findOne({ guildID: interaction.guild.id }).exec();

            const newData = {
                welcome: {
                    ...existingData?.welcome,
                    enabled: true,
                    embed: {
                        ...(existingData?.welcome?.embed || {}),
					}
                }
            }
            guildUpdater.updateGuildData(interaction.guild.id, newData);
            interaction.reply({
                content: `Successfully enabled the welcome module!`
            });
		}
    	if(interaction.options.getSubcommand() == "settings") {
            
            const channelId = interaction.options.getChannel("channel").id;
            content = interaction.options.getString("content");
            const embedEnabled = interaction.options.getBoolean("embed");
            
            const existingData = await Guild.findOne({ guildID: interaction.guild.id }).exec();
            
            const newData = {
                welcome: {
                    ...existingData?.welcome, // Preserve existing welcome data
                    channel: channelId,
                    content: content,
                    embed: {
                        ...(existingData?.welcome?.embed || {}), // Preserve existing embed data
                        embedEnabled: embedEnabled
                    }
                }
            };
            
            guildUpdater.updateGuildData(interaction.guild.id, newData);
            interaction.reply({
                content: `Successfully modified the welcome module! Channel set to **<#${channelId}>** and embed set to ${embedEnabled}.`
            });
		}
		if(interaction.options.getSubcommand() == "embed") {
			embedDescription = interaction.options.getString("description");
			const embedColor = interaction.options.getString("color") || 0xe0a113;
			const embedThumbnail = interaction.options.getString("thumbnail") || null;
			const embedFooter = interaction.options.getString("footer") || null;
			const embedImage = interaction.options.getString("image") || null;
				
			const existingData = await Guild.findOne({ guildID: interaction.guild.id }).exec();
			
			const newData = {
				welcome: {
					...existingData?.welcome, // Preserve existing welcome data
					embed: {
						...(existingData?.welcome?.embed || {}), // Preserve existing embed data
						description: embedDescription,
						color: embedColor,
						thumbnail: embedThumbnail,
						footer: embedFooter,
						image: embedImage
					}
				}
			};
				
			guildUpdater.updateGuildData(interaction.guild.id, newData);
			interaction.reply({
				content: "Successfully updated the embed: New embed:",
				embeds: [welcomeEmbed = new EmbedBuilder()
					.setDescription(embedDescription)
					.setColor(+embedColor)
					.setThumbnail(embedThumbnail)
					.setFooter({text:embedFooter})
					.setImage(embedImage)]
			});
    	}      
	}
}
export default welcomeCommand;
export { content, embedDescription, welcomeEmbed };