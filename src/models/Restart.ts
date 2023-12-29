import { Schema, model } from "mongoose";
import { IRestart } from "../structures/Interfaces.js";

const RestartSchema = new Schema<IRestart>({
    time: {
        type: String,
        default: Date
    }
})

export const Restart = model<IRestart>("Restart", RestartSchema)