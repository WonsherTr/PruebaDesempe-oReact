import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI no está definida en variables de entorno");
}

interface GlobalWithMongoose {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

// @ts-ignore
let cached: GlobalWithMongoose["mongoose"] = global.mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: "technova" });
  }
  // @ts-ignore
  global.mongoose = cached;
  cached.conn = await cached.promise;
  return cached.conn;
}
