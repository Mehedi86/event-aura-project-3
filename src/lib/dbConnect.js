import { MongoClient, ServerApiVersion } from "mongodb";

export default function dbConnect(collectionName) {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db('eventAura').collection(collectionName);
}

