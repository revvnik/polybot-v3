import { Schema, model } from "mongoose";

const RestartSchema = new Schema ({
    time: {
        type: String,
        default: Date
    }
})

export default model("Restart", RestartSchema)