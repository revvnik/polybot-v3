import { type ChatInputCommandInteraction, ApplicationCommandType } from 'discord.js';
import type { Command } from '../../structures/Command.js';
import { CustomPermissions } from '../../models/CustomPermissions.js';
import * as JSONPermissions from "../../json/Permissions.json" assert { type: "json" };

export default {
    name: "Permission",
    description: "Grant or revoke a permission from a user.",
    serverOwner: true,
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
                    },
                    {
                        name: "permission",
                        description: "Select the permission to grant.",
                        type: 3,
                        required: true,
                        choices: [
                            {
                                name: JSONPermissions.default['POLYBOT.MANAGE_USERS'][0]["name"],
                                value: Object.keys(JSONPermissions.default['POLYBOT.MANAGE_USERS'][0]).toString()
                            },
                            {
                                name: JSONPermissions.default['POLYBOT.MANAGE_SERVER'][0]["name"],
                                value: Object.keys(JSONPermissions.default['POLYBOT.MANAGE_SERVER'][0]).toString()
                            },
                            {
                                name: JSONPermissions.default['POLYBOT.MANAGE_PERMISSIONS'][0]["name"],
                                value: Object.keys(JSONPermissions.default['POLYBOT.MANAGE_PERMISSIONS'][0]).toString()
                            }
                        ]
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
                    },
                    {
                        name: "permission",
                        description: "Select the permission to revoke.",
                        type: 3,
                        required: true,
                        choices: [
                            {
                                name: "Manage users",
                                value: "POLYBOT.MANAGE_USERS"
                            },
                            {
                                name: "Manage server",
                                value: "POLYBOT.MANAGE_SERVER"
                            },
                            {
                                name: "Manage permissions",
                                value: "POLYBOT.MANAGE_PERMISSIONS"
                            }
                        ]
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
            const permissionToGrant = interaction.options.getString("permission")

            try {

                const existingPermissions = await CustomPermissions.findOne({
                    GuildID: interaction.guild.id,
                    UserID: userToGrant.id,
                    UserPermissions: [permissionToGrant]
                }).exec();

                if(existingPermissions) {
                    existingPermissions.UserPermissions.addToSet(permissionToGrant);
                    await existingPermissions.save();
                } else {
                    const newPermissions = new CustomPermissions({
                        GuildID: interaction.guild.id,
                        UserID: userToGrant.id,
                        UserPermissions: [permissionToGrant], // add default empty array for permissions
                    });
                    await newPermissions.save();
                }

                await interaction.reply({
                    content: `Granted **${permissionToGrant}** to **${userToGrant.username}**.`,
                    ephemeral: true
                });
            } catch(error) {
                console.log(error);
                await interaction.reply({
                    content: `There was an error while granting **${permissionToGrant}** to **${userToGrant.username}**`
                })
            }
        }




        if(interaction.options.getSubcommand() === "revoke") {
            const userToRevoke = interaction.options.getUser("user")
            const permissionToRevoke = interaction.options.getString("permission")

            try {



                await interaction.reply({
                    content: `Revoked **${permissionToRevoke}** from **${userToRevoke.username}**.`,
                    ephemeral: true
                });
            } catch(error) {
                console.log(error);
                await interaction.reply({
                    content: `There was an error while revoking **${permissionToRevoke}** from **${userToRevoke.username}**`
                })
            }
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