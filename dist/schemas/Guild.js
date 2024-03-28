import { Schema, model } from "mongoose";
const GuildSchema = new Schema({
    guildID: { type: String, required: true, unique: true },
    guildName: { type: String, required: true },
    memberCount: { type: Number, required: true },
    ownerID: { type: String, required: true },
    ownerUsername: { type: String, required: true }
});
export const Guild = model('Guild', GuildSchema);
