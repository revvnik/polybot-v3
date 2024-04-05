import { ActionRowBuilder } from "discord.js";
import { InviteDiscordButton, InviteWebsiteButton } from "./Button.js";
export const InviteActionRow = new ActionRowBuilder()
    .addComponents([InviteDiscordButton, InviteWebsiteButton]);
