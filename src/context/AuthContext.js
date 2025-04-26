// src/context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    async function loadUserFromSession() {
      try {
        const res = await fetch("/api/auth/me", {
          // Add cache: 'no-store' to prevent caching issues
          cache: "no-store",
          credentials: "include", // Ensure cookies are sent with the request
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // If there's an error, don't set the user but don't throw
          console.log("User not authenticated or session expired");
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to load user session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUserFromSession();
  }, []);

  // Login function
  async function login(email, password, remember = false) {
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Sign in failed");
      }

      const userData = await res.json();
      setUser(userData);
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Google Sign In function
  async function googleSignIn(token) {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Google sign in failed");
      }

      const userData = await res.json();
      setUser(userData);
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Register function
  async function register(name, email, password) {
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Sign up failed");
      }

      // Get the user data from the response
      const userData = await res.json();

      // Set the user in the context state
      setUser(userData);

      // Redirect to dashboard
      router.push("/dashboard");

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Logout function
  async function logout() {
    try {
      await fetch("/api/auth/sign-out");
      setUser(null);
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, googleSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
