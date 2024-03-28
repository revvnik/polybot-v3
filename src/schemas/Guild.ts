import { Schema, model, Document } from "mongoose";

const GuildSchema: Schema = new Schema({
    guildID: { type: String, required: true, unique: true },
    guildName: { type: String, required: true },
    memberCount: { type: Number, required: true },
    ownerID: { type: String, required: true },
    ownerUsername: { type: String, required: true }
});

export interface IGuild extends Document {
    guildID: string;
    guildName: string;
    memberCount: number;
    ownerID: string;
    ownerUsername: string;
}

export const Guild = model<IGuild>('Guild', GuildSchema);