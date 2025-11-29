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


export async function GET(request) {
  try {
    // 1. Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    // 2. Validate that we have something to search with
    if (!id && !email) {
      return NextResponse.json(
        { error: "User ID or Email is required" }, 
        { status: 400 }
      );
    }

    // 3. Connect to the database
    const userCollection = connectToDatabase(collectionNamesObj.userCollection);
    let query = {};

    // 4. Build the query object
    if (id) {
      // Validate ObjectId format
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
      }
      query = { _id: new ObjectId(id) };
    } else if (email) {
      query = { email: email };
    }

    // 5. Find the user
    const user = await userCollection.findOne(query);

    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: "User not found" 
      }, { status: 404 });
    }

    // 6. Remove sensitive data (Password) before returning
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword
    }, { status: 200 });

  } catch (err) {
    console.error("Fetch user error:", err);
    return NextResponse.json({ 
      success: false,
      error: "Internal server error" 
    }, { status: 500 });
  }
}