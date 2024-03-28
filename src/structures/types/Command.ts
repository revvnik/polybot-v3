import type { AutocompleteInteraction, CommandInteraction, RESTPostAPIApplicationCommandsJSONBody, RESTPostAPIApplicationGuildCommandsJSONBody, PermissionResolvable } from 'discord.js';
/**
 * Defines the structure of a command.
 */
export type Command = {
    name: CustomOptions["name"];
    description: CustomOptions["description"];
    owner?: CustomOptions["owner"];
    serverOwner?: CustomOptions["serverOwner"];
    /**
     * The data for the command
     */
    data: RESTPostAPIApplicationCommandsJSONBody | RESTPostAPIApplicationGuildCommandsJSONBody;
    /**
     * The custom options for the command
     */
    opt?: CustomOptions;
    /**
     * The function to execute when the command is called
     *
     * @param interaction - The interaction of the command
     */
    execute?(interaction: CommandInteraction): Promise<void> | void;
    autocomplete?(interaction: AutocompleteInteraction): Promise<void> | void;
};

interface CustomOptions {
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