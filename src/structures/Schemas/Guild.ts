import { Schema, model } from "mongoose";

const GuildSchema = new Schema({
    GuildID: {
        type: String
    },
    LogChannelID: {
        type: String,
        required: false
    },
    NewsChannelID: {
        type: String,
        required: false
    }, 
    MemberCount: {
        type: Number
    },
    LogsEnabled: {
        type: Boolean,
        required: true
    },
    NewsEnabled: {
        type: Boolean,
        required: false
    },
    customPermissions: {
        type: Object,
        required: false,
        default: {},
    },
});

export default model("GuildSettings", GuildSchema)