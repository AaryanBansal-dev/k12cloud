// app/api/auth/sign-in/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password, remember } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist or password is wrong
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Validate password - using the User model's comparePassword method
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Set token expiration based on remember me choice
    const expiresIn = remember ? "30d" : "24h";

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    // Calculate expiry date for cookie
    const expiryDate = new Date();
    if (remember) {
      // 30 days if "Remember Me" is checked
      expiryDate.setDate(expiryDate.getDate() + 30);
    } else {
      // 24 hours if not checked
      expiryDate.setHours(expiryDate.getHours() + 24);
    }

    // Set token in HTTP-only cookie with appropriate expiry date
    const cookieStore = cookies();
    await cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours in seconds
      expires: expiryDate,
      sameSite: "strict",
    });

    // Return user info (without password)
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
