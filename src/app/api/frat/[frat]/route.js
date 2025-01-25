import clientPromise from "../../../lib/mongodb"; 
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { frat } = await params;
    const client = await clientPromise;
    const db = client.db("frats");
    const collection = db.collection("frats");
    try {
      console.log('Fetching frat data for:', frat);  
      const fratData = await collection.findOne({ name: frat });
      if (!fratData) {
        return NextResponse.json({ message: "Frat doesn't exist" }, { status: 404 });
      }
      const { name, desc, contact, reviews } = fratData;  
      return NextResponse.json({ name, desc, contact, reviews }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
  
  export async function POST(request, { params }) {
    const { frat } = params;
    const { review, username } = await request.json();
  
    const client = await clientPromise;
    const db = client.db("frats");
    const collection = db.collection("frats");
  
    try {
      const result = await collection.updateOne(
        { name: frat },
        { $push: { reviews: { review, username } } }
      );
      
      if (!result.modifiedCount) {
        return NextResponse.json({ message: "Failed to add review" }, { status: 500 });
      }
      
      return NextResponse.json({ message: "Review added successfully" }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
  