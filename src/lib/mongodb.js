import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
  serverSelectionTimeoutMS: 60000, // Increase server selection timeout to 60 seconds
  maxIdleTimeMS: 120000, // Keep idle connections open for longer
  // DNS retry options
  family: 4, // Force IPv4
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so the value
  // is preserved across module reloads caused by HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((error) => {
      console.error("MongoDB Connection Error:", error);
      console.error(
        "Connection URI (redacted):",
        uri?.replace(/:([^:@]+)@/, ":****@")
      );
      throw error;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((error) => {
    console.error("MongoDB Connection Error:", error);
    console.error(
      "Connection URI (redacted):",
      uri?.replace(/:([^:@]+)@/, ":****@")
    );
    throw error;
  });
}

export default clientPromise;
