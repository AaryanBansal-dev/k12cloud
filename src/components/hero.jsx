import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero1 = ({
  heading = "School & Students are now connected",
  description = "The best platform for educational resources. Discover a wide range of materials, tools, and support to enhance your learning experience.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "/sign-up",
    },
    secondary: {
      text: "Learn More",
      url: "/about",
    },
  },
}) => {
  return (
    <section className="relative bg-white dark:bg-gray-950 pt-20 pb-10 lg:pt-32 lg:pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 dark:text-gray-50">
              {heading}
            </h1>
            <p className="text-xl text-slate-600 mb-8 dark:text-gray-50">
              {description}
            </p>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row justify-center gap-3 lg:justify-start">
              {buttons.primary && (
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-sm md:text-base dark:text-gray-50"
                  size="lg"
                >
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button
                  asChild
                  variant="outline"
                  className="text-sm md:text-base dark:text-gray-50 border-gray-300 dark:border-gray-700"
                  size="lg"
                >
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end mt-8 md:mt-0">
            <div className="relative w-full max-w-[500px]">
              <Image
                src="/student-asking-teacher-concept-illustration_114360-31142.png"
                alt="Kids Reading Book Class"
                width={600}
                height={600}
                className="w-full h-auto max-h-[250px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] rounded-md object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
