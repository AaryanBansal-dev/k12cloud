import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const Navbar = () => {
  return (
    <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="K12Cloud Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </Link>
        </div>

        {/* Auth buttons on the right */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* The navbar uses standard ShadCN Button components */}
          <Link href="/sign-in">
            <Button variant="outline" className="font-medium cursor-pointer">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="font-medium cursor-pointer bg-blue-600 hover:bg-blue-700 dark:text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
