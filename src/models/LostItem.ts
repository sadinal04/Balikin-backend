import { Schema, model, Document } from "mongoose";

export interface ILostItem extends Document {
  name: string;
  description: string;
  location: string;
  timestamp: Date;
  image: string;  // Menyimpan gambar dalam format base64
  status: string;  // Status: "unclaimed" atau "claimed"
}

const lostItemSchema = new Schema<ILostItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  image: { type: String, required: true }, // Menyimpan gambar dalam format base64
  status: { type: String, default: "unclaimed" },  // Status default adalah "unclaimed"
});

export const LostItem = model<ILostItem>("LostItem", lostItemSchema);
