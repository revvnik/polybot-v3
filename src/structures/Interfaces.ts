import type { PermissionResolvable } from "discord.js";

export interface ICustomOptionsDocument {
    name?: string;
    description?: string;
    owner?: boolean,
    serverOwner?: boolean,
    /**
     * The permissions the user needs to run the command
     */
    userPermissions?: PermissionResolvable[];
    /**
     * The permissions the bot needs to run the command
     */
    botPermissions?: PermissionResolvable[];
    /**
     * The category the command belongs to
     */
    category?: string;
    /**
     * The cooldown of the command in seconds
     */
    cooldown?: number;
}

export interface IRestartDocument {
    time: String;
}
