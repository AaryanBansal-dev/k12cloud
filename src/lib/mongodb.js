import { MongoClient } from "mongodb";

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// Updated connection options with proper TLS settings
const options = {
  // Maximum connection time
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 60000,
  // Keep connections alive
  maxIdleTimeMS: 120000,
  // Connection pool settings
  minPoolSize: 5,
  maxPoolSize: 10,
  // Network preferences
  family: 4, // Force IPv4
  // Removed all TLS specific options to use MongoDB defaults
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
