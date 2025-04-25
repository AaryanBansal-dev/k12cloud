import React from "react";
import Navbar from "@/components/navbar";
import { Hero1 } from "@/components/hero";
import { Feature16 } from "@/components/features";
import IntegrationSection from "@/components/intigration-capablity";
import { Pricing4 } from "@/components/pricing"; // Comment this out temporarily
import { Footer2 } from "@/components/footer";

const page = () => {
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

export default page;
