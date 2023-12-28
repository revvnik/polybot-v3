import { Schema, model } from "mongoose";
import { ICustomPermissions } from "../structures/Interfaces.js";

const CustomPermissionsSchema = new Schema<ICustomPermissions>({
    UserID: {
        type: String
    },
    GuildID: {
        type: String
    },
    UserPermissions: {
        type: [String],
        default: []
    }
});

export const CustomPermissions = model<ICustomPermissions>("CustomPermissions", CustomPermissionsSchema)