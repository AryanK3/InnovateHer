import clientPromise from "../../../lib/mongodb"; 
import { NextResponse } from 'next/server';

// /api/frat/[frat]/route.js
export async function GET(request, { params }) {
    const { frat } = params;  // Use 'frat' here instead of 'fratName'
    const client = await clientPromise;
    const db = client.db("frats");
    const collection = db.collection("frats");
    try {
      console.log('Fetching frat data for:', frat);  // Make sure frat is being passed
      const fratData = await collection.findOne({ name: frat });
      if (!fratData) {
        return NextResponse.json({ message: "Frat doesn't exist" }, { status: 404 });
      }
      const { name, desc, contact } = fratData;  // Extract these values directly from the response
      return NextResponse.json({ name, desc, contact }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
  