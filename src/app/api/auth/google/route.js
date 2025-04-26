import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    // Get Google token info from the request
    const { token } = await request.json();

    if (!token) {
      console.error("Google auth error: No token provided");
      return NextResponse.json(
        { error: "Google token is required" },
        { status: 400 }
      );
    }

    // Verify the Google token with better error handling
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          "Google token verification failed:",
          response.status,
          errorData
        );
        return NextResponse.json(
          { error: "Invalid Google token" },
          { status: 400 }
        );
      }

      const googleUser = await response.json();

      if (!googleUser.email) {
        console.error("Google user data missing email");
        return NextResponse.json(
          { error: "Invalid user data from Google" },
          { status: 400 }
        );
      }

      const { email, name, sub: googleId } = googleUser;

      // Check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        // Create new user if not exists
        user = await User.create({
          name,
          email,
          googleId,
          isEmailVerified: true, // Google already verified the email
        });
      } else if (!user.googleId) {
        // If user exists but hasn't used Google auth before, update their profile
        user.googleId = googleId;
        user.isEmailVerified = true;
        await user.save();
      }

      // Generate JWT token
      const token_secret = process.env.JWT_SECRET;
      if (!token_secret) {
        throw new Error("JWT_SECRET is not defined");
      }

      const expiresIn = 60 * 60 * 24 * 7; // 7 days

      const userJwt = jwt.sign(
        { userId: user._id, email: user.email },
        token_secret,
        { expiresIn }
      );

      // Set cookie
      const response_with_cookie = NextResponse.json(
        {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        },
        { status: 200 }
      );

      // Set HTTP-only cookie
      response_with_cookie.cookies.set("auth-token", userJwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // Changed from 'strict' to 'lax' for better compatibility
        path: "/",
        maxAge: expiresIn,
      });

      return response_with_cookie;
    } catch (tokenError) {
      console.error("Google token verification error:", tokenError);
      return NextResponse.json(
        { error: "Failed to verify Google token" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
