import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/src/lib/db";
import ProductModel from "@/src/models/Product";

export async function GET() {
  await dbConnect();
  const products = await ProductModel.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await dbConnect();
    // Validación de SKU único
    const exists = await ProductModel.findOne({ sku: body.sku });
    if (exists) return NextResponse.json({ error: "SKU duplicado" }, { status: 400 });
    const created = await ProductModel.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Error" }, { status: 500 });
  }
}
