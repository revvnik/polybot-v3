import { ButtonBuilder, ButtonStyle } from "discord.js";

export const InviteDiscordButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Discord")
    .setURL("https://discord.gg/Gc2ddSbkU2")
    .setEmoji("💬")

export const InviteWebsiteButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Website")
    .setURL("https://revvnik.is-a.dev")
    .setEmoji("🌍")