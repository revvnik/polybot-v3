import { Schema, model } from "mongoose";
const GuildSchema = new Schema({
    guildID: { type: String, required: true, unique: true },
    guildName: { type: String, required: true },
    memberCount: { type: Number, required: true },
    ownerID: { type: String, required: true },
    ownerUsername: { type: String, required: true },
    welcome: {
        enabled: { type: Boolean, default: false },
        channel: String,
        content: String,
        embed: {
            embedEnabled: { type: Boolean, default: false },
            description: String,
            color: String,
            thumbnail: String,
            footer: String,
            image: String
        }
    },
    goodbye: {
        enabled: { type: Boolean, default: false },
        channel: String,
        content: String,
        embed: {
            embedEnabled: { type: Boolean, default: false },
            description: String,
            color: String,
            thumbnail: String,
            footer: String,
            image: String
        }
    }
});
export const Guild = model('Guild', GuildSchema);
