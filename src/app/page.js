"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Hero1 } from "@/components/hero";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Feature16 } from "@/components/features";
import IntegrationSection from "@/components/intigration-capablity";
import { Pricing4 } from "@/components/pricing";
import { Footer2 } from "@/components/footer";

const Page = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-xl text-gray-800 dark:text-gray-200">Loading...</p>
        </div>
      </div>
    );
  }

  // This will render the landing page for unauthenticated users
  return (
    <div>
      <Navbar />
      <Hero1 />
      <Feature16 />
      <IntegrationSection />
      <Pricing4 />
      <Footer2 />
    </div>
  );
};

export default Page;
