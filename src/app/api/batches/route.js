import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";

export async function GET() {
  try {
    const batchesCollection = connectToDatabase("batches");
    const batches = await batchesCollection.find({}).toArray();
    
    return NextResponse.json(batches);
  } catch (error) {
    console.error("Error fetching batches:", error);
    return NextResponse.json(
      { error: "Failed to fetch batches" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const batchData = await request.json();
    
    const batchesCollection = connectToDatabase("batches");
    
    // Add timestamp and ensure synced status
    const batchWithTimestamp = {
      ...batchData,
      synced: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await batchesCollection.insertOne(batchWithTimestamp);
    
    return NextResponse.json({
      _id: result.insertedId,
      ...batchWithTimestamp
    });
  } catch (error) {
    console.error("Error saving batch:", error);
    return NextResponse.json(
      { error: "Failed to save batch" },
      { status: 500 }
    );
  }
}