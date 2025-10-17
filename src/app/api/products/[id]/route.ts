import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/src/lib/db";
import ProductModel from "@/src/models/Product";

type Params = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();
    await dbConnect();
    const updated = await ProductModel.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const deleted = await ProductModel.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Error" }, { status: 500 });
  }
}
