import mongoose, { Document, Model, Schema } from 'mongoose';
import type { Sweet } from '../types';

export interface SweetDocument extends Sweet, Document {}

const SweetSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

export const SweetModel: Model<SweetDocument> = mongoose.model<SweetDocument>('Sweet', SweetSchema);
