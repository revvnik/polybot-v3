import { type ChatInputCommandInteraction, ApplicationCommandType } from 'discord.js';
import type { Command } from '../../structures/Command.js';

export default {
    name: "Permission",
    description: "Grant or revoke a permission from a user.",
    data: {
        name: 'permission',
        description: 'Grant or revoke a permission from a user.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: "grant",
                description: "Grant permissions to a user.",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Select a user to grant the permission to.",
                        type: 6, 
                        required: true
                    }
                ]
            },
            {
                name: "revoke",
                description: "Revoke permissions from a user.",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Select a user to revoke the permission from.",
                        type: 6, 
                        required: true
                    }
                ]
            },
            {
                name: "list",
                description: "List permissions of a user.",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Select a user to list the permissions of.",
                        type: 6, 
                        required: true
                    }
                ]
            }
        ]
    },
    opt: {
        userPermissions: ['Administrator'],
        botPermissions: ['SendMessages'],
        category: 'Admin',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {

        if(interaction.options.getSubcommand() === "grant") {
            const userToGrant = interaction.options.getUser("user")
            await interaction.reply({
                content: `You selected to grant permissions to ${userToGrant.username}`,
                ephemeral: true
            });
        }
        if(interaction.options.getSubcommand() === "revoke") {
            const userToRevoke = interaction.options.getUser("user")
            await interaction.reply({
                content: `You selected to revoke permissions from ${userToRevoke.username}`,
                ephemeral: true
            });
        }
        if(interaction.options.getSubcommand() === "list") {
            const userToList = interaction.options.getUser("user")
            await interaction.reply({
                content: `You selected to list the permissions of ${userToList.username}`,
                ephemeral: true
            });
        }
        
    }
} satisfies Command;