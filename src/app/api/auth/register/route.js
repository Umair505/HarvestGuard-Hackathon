// /app/api/auth/register/route.js
import { NextResponse } from "next/server";
import connectToDatabase, { collectionNamesObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, language } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const userCollection = connectToDatabase(collectionNamesObj.userCollection);
    const existing = await userCollection.findOne({ email });

    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      name: name || "",
      email,
      password: hashedPassword,
      phone: phone || null,
      language: language || "bn",
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(payload);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId.toString(),
    });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
