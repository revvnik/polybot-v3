import { WebhookClient, EmbedBuilder } from "discord.js";

export async function sendWebhook(id: string, token: string, message: string, username: string) {
    const webhookClient = new WebhookClient({
        id: id,
        token: token
    });

    const webhookEmbed = new EmbedBuilder()
        .setDescription(message)
        .setColor("Random");

    webhookClient.send({
        username: username,
        avatarURL: "https://i.imgur.com/7DEsm59.png",
        embeds: [webhookEmbed]
    })
}   