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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="grid items-center gap-6 sm:gap-8 md:gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-3 sm:my-4 md:my-5 text-3xl sm:text-4xl md:text-5xl font-bold text-pretty lg:text-5xl xl:text-6xl">
              {heading}
            </h1>
            <p className="mb-5 sm:mb-6 md:mb-8 max-w-md sm:max-w-lg mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row justify-center gap-3 lg:justify-start">
              {buttons.primary && (
                <Button
                  asChild
                  className="bg-primary text-sm md:text-base"
                  size="lg"
                >
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button
                  asChild
                  variant="outline"
                  className="text-sm md:text-base"
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
