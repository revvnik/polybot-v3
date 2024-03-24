import { Schema, model } from "mongoose";
import { IRestartDocument } from "../structures/Interfaces.js";

const RestartSchema = new Schema<IRestartDocument>({
    time: {
        type: String,
        default: Date
    }
})

export const Restart = model<IRestartDocument>("Restart", RestartSchema)