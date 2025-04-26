import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
      serverSelectionTimeoutMS: 60000, // Increase server selection timeout
      maxIdleTimeMS: 120000, // Keep idle connections open for longer
      family: 4, // Force IPv4
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsInsecure: false,
      tlsAllowInvalidHostnames: false,
      minPoolSize: 5, // Maintain at least 5 connections
      maxPoolSize: 10, // Limit max connections to 10
    };

    // Construct connection string with explicit TLS parameters if not already included
    let connectionUri = MONGODB_URI;
    if (!connectionUri.includes("tlsVersion=")) {
      connectionUri += connectionUri.includes("?")
        ? "&tlsVersion=TLS1_2"
        : "?tlsVersion=TLS1_2";
    }

    cached.promise = mongoose
      .connect(connectionUri, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        // Log redacted connection string for debugging (hiding password)
        console.error(
          "Connection URI (redacted):",
          connectionUri?.replace(/:([^:@]+)@/, ":****@")
        );

        // Check for specific DNS errors
        if (err.message && err.message.includes("ENOTFOUND")) {
          console.error(
            "DNS resolution failed. Please check your internet connection and MongoDB Atlas status."
          );
        }

        // Reset the promise so we can retry
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
