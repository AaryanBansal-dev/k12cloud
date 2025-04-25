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
    if (!loading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    }
  }, [user, loading, router]);

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // This will render briefly while the redirect is happening
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
