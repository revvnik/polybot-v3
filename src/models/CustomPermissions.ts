import { Schema, model } from "mongoose";
import { ICustomPermissionsDocument } from "../structures/Interfaces.js";

const CustomPermissionsSchema = new Schema<ICustomPermissionsDocument>({
    UserID: {
        type: String
    },
    GuildID: {
        type: String
    },
    UserPermissions: { 
        type: [Array], 
        default: [] 
    }
});

export const CustomPermissions = model<ICustomPermissionsDocument>("CustomPermissions", CustomPermissionsSchema)