import {MongoClient} from "mongodb";
const uri = process.env.MONGO;
const client=new MongoClient(uri)
const clientPromise=client.connect()
export default clientPromise