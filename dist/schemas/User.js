import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    ownerID: { type: String, required: true },
    ownerUsername: { type: String, required: true }
});
export const User = model('User', UserSchema);
