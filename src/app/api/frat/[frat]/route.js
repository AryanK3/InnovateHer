import clientPromise from "../../../lib/mongodb"; 
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { frat } = await params;
    const client = await clientPromise;
    const db = client.db("frats");
    const collection = db.collection("frats");
    try {
      const fratData = await collection.findOne({ name: frat });
      if (!fratData) {
        return NextResponse.json({ message: "Frat doesn't exist" }, { status: 404 });
      }
      const { name, link, image_url, google_url, reviews } = fratData; 
      var summaryResponse;
      if (reviews) {
        const reviewArray = reviews.map(item => item.review);
        summaryResponse = await fetch(`http://localhost:3000/api/summarizer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviews : reviewArray })
        });
        const summaryData = await summaryResponse.json();        
        return NextResponse.json({ name, link, image_url, google_url, reviews, summary: summaryData.summary }, { status: 200 });
      }
      return NextResponse.json({ name, link, image_url, google_url, reviews, summary: 'No reviews yet!' }, { status: 200 });
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
  