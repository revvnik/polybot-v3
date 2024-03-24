import { Events, inlineCode, Collection, bold } from 'discord.js';

import { missingPerms } from '../../Miscellaneous/util.js';

import type { Event } from '../../Structures/Event.js';
import { BotOwner } from '../../config.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        if (!interaction.inCachedGuild()) return;
        if (!interaction.inGuild()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command?.data) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            await interaction.reply({
                content: `⚠️ There is no command matching ${inlineCode(interaction.commandName)}!`,
                ephemeral: true,
            });
            return;
        };

        if(interaction.isAutocomplete()) {
            await command.autocomplete(interaction);
        }

        if (command.owner && interaction.user.id !== BotOwner.userId) {
            await interaction.deferReply({ ephemeral: true });
            await interaction.followUp({ 
                content: "⚠️ This is an owner only command!", 
                ephemeral: true 
            });
            return;
        }
        if(command.serverOwner && interaction.user.id !== interaction.guild.ownerId) {
            await interaction.deferReply({ ephemeral: true })
            await interaction.followUp({
                content: "⚠️ Only the server owner can execute this command.",
                ephemeral: true
            });
            return;
        }
        /* 
        const hasPermissionResult = await hasPermission(interaction.guild, interaction.user, command.customPermissions);
        if (!hasPermissionResult) {
            await interaction.deferReply({ ephemeral: true });
            await interaction.followUp({
                content: `⚠️ You need the following permission${command.customPermissions.length > 1 ? "s" : ""}: **${command.customPermissions}**`,
                ephemeral: true
            });
            return;
        } */

        if (command.opt?.userPermissions) {
            const missingUserPerms = missingPerms(interaction.member.permissionsIn(interaction.channel), command.opt?.userPermissions) ?
                missingPerms(interaction.member.permissionsIn(interaction.channel), command.opt?.userPermissions) :
                missingPerms(interaction.memberPermissions, command.opt?.userPermissions);

            if (missingUserPerms?.length) {
                await interaction.reply({
                    content: `⚠️ You need the following permission${missingUserPerms.length > 1 ? "s" : ""}: ${missingUserPerms.map(x => inlineCode(x)).join(", ")}`,
                    ephemeral: true
                });
                return;
            };
        };

        if (command.opt?.botPermissions) {
            const missingBotPerms = missingPerms(interaction.guild.members.me.permissionsIn(interaction.channel), command.opt?.botPermissions) ?
                missingPerms(interaction.guild.members.me.permissionsIn(interaction.channel), command.opt?.botPermissions) :
                missingPerms(interaction.guild.members.me.permissions, command.opt?.botPermissions);

            if (missingBotPerms?.length) {
                await interaction.reply({
                    content: `⚠️ I need the following permission${missingBotPerms.length > 1 ? "s" : ""}: ${missingBotPerms.map(x => inlineCode(x)).join(", ")}`,
                    ephemeral: true
                });
                return;
            };
        };

        if (command.opt?.cooldown) {
            if (!interaction.client.cooldown.has(`${command.data.name}-${interaction.guildId}`)) {
                interaction.client.cooldown.set(`${command.data.name}-${interaction.guildId}`, new Collection());
            };

            const now = Date.now();
            const timestamps = interaction.client.cooldown.get(`${command.data.name}-${interaction.guildId}`);
            const cooldownAmount = (command.opt.cooldown ?? 3) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;

                    await interaction.reply({
                        content: `⚠️ Please wait ${bold(`${timeLeft.toFixed()} second(s)`)} before reusing this command!`,
                        ephemeral: true
                    });
                    return;
                };
            };

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: `⚠️ There was an error while executing this command: \n${error.message} \nCheck the console for more info.`, ephemeral: true });
                } else {
                    await interaction.reply({ content: `⚠️ There was an error while executing this command: \n${error.message} \nCheck the console for more info.`, ephemeral: true });
                }
            }
        } else {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: `⚠️ There was an error while executing this command: \n${error.message} \nCheck the console for more info.`, ephemeral: true });
                } else {
                    await interaction.reply({ content: `⚠️ There was an error while executing this command: \n${error.message} \nCheck the console for more info.`, ephemeral: true });
                }
            }
        };
    }
} satisfies Event<Events.InteractionCreate>;