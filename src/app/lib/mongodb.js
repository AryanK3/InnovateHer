import {MongoClient} from "mongodb";
const uri = process.env.MONG;
const client=new MongoClient(uri)
const clientPromise=client.connect()
export default clientPromise