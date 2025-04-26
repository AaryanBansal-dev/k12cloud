import { MongoClient } from "mongodb";

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// More minimal connection options focused on reliability
const options = {
  // Connection timeout settings
  connectTimeoutMS: 20000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 30000,

  // Retry settings - increased for Vercel environment
  maxPoolSize: 10,
  retryWrites: true,
  retryReads: true,

  // Force Node.js to validate the server certificate
  tls: true,

  // Fix for compatibility with older TLS versions
  tlsCAFile: undefined,
};

// Global is used here to maintain a cached connection across hot reloads
// in development. This prevents connections growing exponentially
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// For development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR
if (process.env.NODE_ENV === "development") {
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
  // In production mode, it's best to not use a global variable
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
