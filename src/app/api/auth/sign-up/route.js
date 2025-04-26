// app/api/auth/sign-up/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request) {
  try {
    // Connect to the database using Mongoose
    await dbConnect();

    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by pre-save hook in the User model
    });

    // Create JWT token after successful registration
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Calculate expiry date for persistent cookie (7 days from now)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    // Set token in HTTP-only cookie with explicit expiry date
    // Fix: Await the cookies() API
    const cookieStore = cookies();
    await cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      expires: expiryDate, // Explicit expiry date for persistent cookie
      sameSite: "strict",
    });

    // Return user without password
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);

    // Enhanced error logging for debugging
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Error stack:", error.stack);

    return NextResponse.json(
      {
        error: "Registration failed",
        details: error.message,
        name: error.name,
      },
      { status: 500 }
    );
  }
}
