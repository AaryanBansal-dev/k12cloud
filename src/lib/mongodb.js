import { MongoClient } from "mongodb";

// Get the MongoDB URI from environment variables
let uri = process.env.MONGODB_URI;

// Add explicit TLS version if not already present
if (uri && !uri.includes("tlsVersion=")) {
  uri += uri.includes("?") ? "&tlsVersion=TLS1_2" : "?tlsVersion=TLS1_2";
}

// Updated connection options with explicit TLS settings
const options = {
  // Remove deprecated options that show warnings
  // useUnifiedTopology and useNewUrlParser are no longer needed in MongoDB driver v4+
  connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
  serverSelectionTimeoutMS: 60000, // Increase server selection timeout to 60 seconds
  maxIdleTimeMS: 120000, // Keep idle connections open for longer
  family: 4, // Force IPv4
  ssl: true,
  tls: true,
  tlsAllowInvalidHostnames: false,
  minPoolSize: 5, // Maintain at least 5 connections
  maxPoolSize: 10, // Limit max connections to 10
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
