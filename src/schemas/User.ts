import { Schema, model, Document } from "mongoose";

const UserSchema: Schema = new Schema({
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    ownerID: { type: String, required: true },
    ownerUsername: { type: String, required: true }
});

export interface IUser extends Document {
    guildID: string;
    guildName: string;
    memberCount: number;
    ownerID: string;
    ownerUsername: string;
}

export const User = model<IUser>('User', UserSchema);