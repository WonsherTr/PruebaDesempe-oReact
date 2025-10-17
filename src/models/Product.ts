import mongoose, { Schema, models, model } from "mongoose";

export interface Product {
  _id?: string;
  sku: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  isActive: boolean;
  category: string;
  imageUrl?: string;
  createdAt?: Date;
}

const ProductSchema = new Schema<Product>({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, default: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default models.Product || model<Product>("Product", ProductSchema);
