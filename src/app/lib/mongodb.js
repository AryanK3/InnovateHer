import {MongoClient} from "mongodb";
const uri = "mongodb+srv://aryankiran316:%232819Thor@cluster0.kbsir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client=new MongoClient(uri)
const clientPromise=client.connect()
export default clientPromise