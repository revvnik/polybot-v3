import { Schema, model, Document } from "mongoose";

const GuildSchema: Schema = new Schema({
    guildID: { type: String, required: true, unique: true },
    guildName: { type: String, required: true },
    memberCount: { type: Number, required: true },
    ownerID: { type: String, required: true },
    ownerUsername: { type: String, required: true },
    welcome: {
        enabled: {type: Boolean, default: false},
        channel: String,
        content: String,
        embed: {
            description: String,
            color: String,
            thumbnail: Boolean,
            footer: String,
            image: String
        }
    },
    goodbye: {
        enabled: {type: Boolean, default: false},
        channel: String,
        content: String,
        embed: {
            description: String,
            color: String,
            thumbnail: Boolean,
            footer: String,
            image: String
        }
    }
});

export interface IGuild extends Document {
    guildID: string;
    guildName: string;
    memberCount: number;
    ownerID: string;
    ownerUsername: string;
    welcome: {
        enabled: boolean;
        channel?: string;
        content?: string;
        embed?: {
            description?: string;
            color?: string;
            thumbnail?: boolean;
            footer?: string;
            image?: string;
        };
    };
    goodbye: {
        enabled: boolean;
        channel?: string;
        content?: string;
        embed?: {
            description?: string;
            color?: string;
            thumbnail?: boolean;
            footer?: string;
            image?: string;
        };
    };
}

export const Guild = model<IGuild>('Guild', GuildSchema);