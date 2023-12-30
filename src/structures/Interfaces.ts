import type { PermissionResolvable } from "discord.js";
import { Document } from "mongoose";

export interface ICustomOptionsDocument {
    name?: string;
    description?: string;
    owner?: boolean,
    serverOwner?: boolean,
    customPermissions?: [String],
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
};

export interface ICustomPermissionsDocument extends Document {
    UserID: String;
    GuildID: String;
    UserPermissions?: Array<string>;
}

export interface IRestartDocument {
    time: String;
}

export interface IGuildDocument {
    
}