import type { AutocompleteInteraction, CommandInteraction, RESTPostAPIApplicationCommandsJSONBody, RESTPostAPIApplicationGuildCommandsJSONBody } from 'discord.js';
import { ICustomOptionsDocument as CustomOptions } from '../Interfaces.js';
/**
 * Defines the structure of a command.
 */
export type Command = {
    name: CustomOptions["name"];
    description: CustomOptions["description"];
    owner?: CustomOptions["owner"];
    serverOwner?: CustomOptions["serverOwner"];
    customPermissions?: CustomOptions["customPermissions"];
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