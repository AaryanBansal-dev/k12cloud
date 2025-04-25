"use client";
import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  heading = "Signup",
  subheading = "Create a new account",
  logo = {
    url: "https://k12cloud.vercel.app",
    src: "https://k12cloud.vercel.app/favicon.ico",
    alt: "logo",
    title: "k12cloud",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "#",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-12"
                />
              </a>
            </div>
            <h1 className="text-3xl font-semibold">{heading}</h1>
            {subheading && (
              <p className="text-sm text-muted-foreground">{subheading}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="bg-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
              </div>
              <div className="flex flex-col gap-4">
                <Button type="submit" className="mt-2 w-full cursor-pointer">
                  {signupText}
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{loginText}</p>
            <a
              href={loginUrl}
              className="font-medium text-primary hover:underline"
            >
              Login
            </a>
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
