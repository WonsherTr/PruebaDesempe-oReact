import axios from "axios";
import { Product } from "@/src/models/Product";
import { z } from "zod";


export type ProductInput = Omit<Product, "_id" | "createdAt">;

const ProductSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1),
  quantity: z.number().min(0),
  price: z.number().min(0),
  isActive: z.boolean(),
  category: z.string().min(1),
  imageUrl: z.string().optional()
});

export async function getProducts(): Promise<Product[]> {
  const { data } = await axios.get("/api/products");
  return data;
}

export async function postProduct(p: Omit<Product, "_id" | "createdAt">): Promise<Product> {
  const parsed = ProductSchema.safeParse(p);
  if (!parsed.success) throw new Error("Datos inválidos");
  const { data } = await axios.post("/api/products", parsed.data);
  return data;
}

export async function updateProduct(id: string, p: Partial<Product>): Promise<Product> {
  if (p.quantity !== undefined && p.quantity < 0) throw new Error("Cantidad no puede ser negativa");
  if (p.price !== undefined && p.price < 0) throw new Error("Precio no puede ser negativo");
  const { data } = await axios.put(`/api/products/${id}`, p);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await axios.delete(`/api/products/${id}`);
}
