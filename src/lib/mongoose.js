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
      // Connection timeout settings
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000,

      // Keep connections alive longer
      maxIdleTimeMS: 60000,

      // Better connection management
      minPoolSize: 5,
      maxPoolSize: 10,

      // Retry options - important for production environments
      retryWrites: true,
      retryReads: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        // Log redacted connection string for debugging (hiding password)
        console.error(
          "Connection URI (redacted):",
          MONGODB_URI?.replace(/:([^:@]+)@/, ":****@")
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
