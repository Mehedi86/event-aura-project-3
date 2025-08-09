import { MongoClient, ServerApiVersion } from "mongodb";

let cachedClient = null;

export default function dbConnect(collectionName) {
    if (!cachedClient) {
        const uri = process.env.MONGO_URI;
        cachedClient = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    return cachedClient.db('eventAura').collection(collectionName);
}


