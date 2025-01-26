import clientPromise from "../../lib/mongodb"; 
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const client = await clientPromise;
    const db = client.db("frats");
    const collection = db.collection("frats");
    try {
      const fratData = await collection.find({}).project({ name: 1, image_url: 1 }).toArray();
      if (!fratData) {
        return NextResponse.json({ message: "Frats don't exist" }, { status: 404 });
      }
      const frats = fratData.map(frat => ({
        name: frat.name,
        image: frat.image_url,
      }));
      return NextResponse.json(frats, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
