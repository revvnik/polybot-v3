import { AutocompleteInteraction, CommandInteraction, PermissionResolvable } from 'discord.js';

export type Command = {
    build(): any; // Using SlashCommandBuilder as an example
    execute(interaction: CommandInteraction): Promise<void> | void;
    autocomplete?(interaction: AutocompleteInteraction): Promise<void> | void;
    
    // Add back any additional properties you need
    opt?: CustomOptions;
};

interface CustomOptions {
    owner?: boolean;
    serverOwner?: boolean;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
    category?: string;
    cooldown?: number;
}