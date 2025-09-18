import mongoose, { Document, Model, Schema } from 'mongoose';
import type { User } from '../types';


export interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);
