import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import { InviteDiscordButton, InviteWebsiteButton } from "./Button.js";

export const InviteActionRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents([InviteDiscordButton, InviteWebsiteButton])