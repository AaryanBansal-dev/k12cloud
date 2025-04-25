"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";

export default function IntegrationSection() {
  const integrationCategories = [
    {
      id: "sis",
      name: "Student Information Systems",
      description: "Automatically sync student data and records",
      integrations: [
        {
          name: "PowerSchool",
          logo: "/api/placeholder/48/48",
          key: "powerschool",
        },
        {
          name: "Infinite Campus",
          logo: "/api/placeholder/48/48",
          key: "infinite",
        },
        { name: "Skyward", logo: "/api/placeholder/48/48", key: "skyward" },
      ],
      features: [
        "Automatic roster synchronization",
        "Real-time grade and attendance information",
        "Secure student data transfer",
      ],
    },
    {
      id: "lms",
      name: "Learning Management Systems",
      description: "Connect with your existing classroom platforms",
      integrations: [
        {
          name: "Google Classroom",
          logo: "/api/placeholder/48/48",
          key: "gclassroom",
        },
        { name: "Canvas", logo: "/api/placeholder/48/48", key: "canvas" },
        { name: "Schoology", logo: "/api/placeholder/48/48", key: "schoology" },
      ],
      features: [
        "Assignment notifications and due dates",
        "Course materials accessible in one place",
        "Single sign-on capability",
      ],
    },
    {
      id: "calendar",
      name: "Calendar & Scheduling",
      description: "Keep everyone on the same page with calendar syncing",
      integrations: [
        {
          name: "Google Calendar",
          logo: "/api/placeholder/48/48",
          key: "gcal",
        },
        {
          name: "Microsoft Outlook",
          logo: "/api/placeholder/48/48",
          key: "outlook",
        },
        {
          name: "Apple Calendar",
          logo: "/api/placeholder/48/48",
          key: "apple",
        },
      ],
      features: [
        "Automatic event synchronization",
        "Custom notifications for important dates",
        "School-wide and class-specific calendars",
      ],
    },
    {
      id: "comms",
      name: "Communication Tools",
      description: "Extend your reach across multiple channels",
      integrations: [
        { name: "Email Systems", logo: "/api/placeholder/48/48", key: "email" },
        { name: "SMS Gateway", logo: "/api/placeholder/48/48", key: "sms" },
        {
          name: "Microsoft Teams",
          logo: "/api/placeholder/48/48",
          key: "teams",
        },
      ],
      features: [
        "Backup notifications for critical messages",
        "Communication analytics and reporting",
        "Multi-channel delivery options",
      ],
    },
  ];

  return (
    <section id="integrations" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Seamlessly Connects With Your Existing School Systems
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            No more juggling between platforms. Our app integrates with the
            tools your school already uses.
          </p>
        </div>

        <Tabs defaultValue="sis" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            {integrationCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="cursor-pointer"
              >
                {category.id === "calendar"
                  ? "Calendar & Scheduling"
                  : category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {integrationCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="cursor-pointer">
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {category.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-between items-center">
                    <Badge
                      variant="outline"
                      className="text-blue-600 bg-blue-50 cursor-pointer"
                    >
                      Easy Setup
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Check Compatibility With Your Systems
          </Button>
          <p className="text-sm text-slate-500 mt-4">
            Not seeing your system? Contact us for custom integration options.
          </p>
        </div>
      </div>
    </section>
  );
}
