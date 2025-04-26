"use client";
import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";
import { useState, useEffect } from "react"; // Added useEffect
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Added Google components

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";

/**
 * @typedef {Object} Signup1Props
 * @property {string} [heading]
 * @property {string} [subheading]
 * @property {Object} logo
 * @property {string} logo.url
 * @property {string} logo.src
 * @property {string} logo.alt
 * @property {string} [logo.title]
 * @property {string} [signupText]
 * @property {string} [googleText]
 * @property {string} [loginText]
 * @property {string} [loginUrl]
 */

const Signup1 = ({
  heading = "Create Account",
  subheading = "Register to get started",
  logo = {
    url: "https://k12cloud.vercel.app",
    src: "https://k12cloud.vercel.app/favicon.ico",
    alt: "logo",
    title: "k12cloud",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "/sign-in",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [clientId, setClientId] = useState("");
  const { register, googleSignIn } = useAuth(); // Use auth context for registration and Google sign-in
  const router = useRouter();

  // Get Google client ID from environment variable
  useEffect(() => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    // For debugging - remove in production
    console.log("Google Client ID:", googleClientId ? "Found" : "Not found");

    if (googleClientId) {
      setClientId(googleClientId);
    } else {
      console.error("Google Client ID is not properly configured");
    }
  }, []);

  // Handle Google sign-in success
  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }

      const result = await googleSignIn(credentialResponse.credential);
      if (!result.success) {
        throw new Error(result.error || "Failed to sign in with Google");
      }

      setSuccess("Account created successfully with Google! Redirecting...");
      // The googleSignIn function will handle redirection to dashboard
    } catch (err) {
      console.error("Google login error:", err);
      setError(
        err.message || "Failed to sign up with Google. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google sign-in error
  const handleGoogleError = (error) => {
    console.error("Google Sign-In Error:", error);
    setError(
      "Google sign-up failed. Please try again or use email registration."
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsSubmitting(true);

      // Use the register function from AuthContext instead of direct fetch
      const result = await register(
        formData.name,
        formData.email,
        formData.password
      );

      if (!result.success) {
        throw new Error(result.error || "Registration failed");
      }

      setSuccess("Account created successfully! Redirecting to dashboard...");
      // The router.push will be handled by the register function in AuthContext
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative top accent */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          <div className="flex justify-end p-4">
            <ThemeToggle />
          </div>

          <div className="px-8 pt-8 pb-10">
            {/* Card Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4 p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
                <a href={logo.url}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-14 w-14"
                  />
                </a>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {heading}
              </h1>
              {subheading && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {subheading}
                </p>
              )}
            </div>

            {/* Alerts */}
            {error && (
              <div className="w-full mb-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm border border-red-200 dark:border-red-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div className="w-full mb-6 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm border border-green-200 dark:border-green-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="w-full rounded-lg pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash className="size-4" />
                    ) : (
                      <FaEye className="size-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium cursor-pointer text-sm mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  signupText
                )}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    or continue with
                  </span>
                </div>
              </div>

              {clientId ? (
                <GoogleOAuthProvider clientId={clientId}>
                  <div className="flex justify-center">
                    <div className="w-full">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-3 py-2.5 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-800 dark:text-gray-200 font-medium transition-colors cursor-pointer"
                        onClick={() => {
                          // Find and click the Google login button when our custom button is clicked
                          const googleButtons = document.querySelectorAll(
                            '[aria-labelledby="button-label"]'
                          );
                          if (googleButtons && googleButtons.length > 0) {
                            googleButtons[0].click();
                          }
                        }}
                        disabled={isSubmitting}
                      >
                        <FcGoogle className="size-5" />
                        <span>{googleText}</span>
                      </Button>
                      <div
                        style={{
                          position: "absolute",
                          opacity: 0,
                          pointerEvents: "none",
                          zIndex: -1,
                        }}
                      >
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                          useOneTap={false}
                        />
                      </div>
                    </div>
                  </div>
                </GoogleOAuthProvider>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium"
                  disabled={true}
                >
                  <FcGoogle className="size-5" />
                  <span>{googleText} (Not configured)</span>
                </Button>
              )}
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <span>{loginText} </span>
              <Link
                href={loginUrl}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Define PropTypes for the component
Signup1.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  logo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string,
  }),
  signupText: PropTypes.string,
  googleText: PropTypes.string,
  loginText: PropTypes.string,
  loginUrl: PropTypes.string,
};

export { Signup1 };
