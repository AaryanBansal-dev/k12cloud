import { Timer, Zap, ZoomIn } from "lucide-react";

const Feature16 = () => {
  return (
    <section className="py-32 bg-blue-50">
      <div className="container sm:pl-3.5 md:pl-6 lg:pl-8 xl:pl-10 px-4 mx-auto">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          OUR VALUES
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">Why Choose Us?</h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-5 cursor-pointer hover:shadow-md transition-shadow">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background cursor-pointer">
              <Timer className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium cursor-pointer">Speed</h3>
            <p className="leading-7 text-muted-foreground">
              We deliver real-time notifications with lightning-fast efficiency,
              ensuring you stay informed without delay. Our advanced
              notification system processes and distributes alerts within
              milliseconds, providing instantaneous updates on student progress,
              administrative changes, and important announcements across all
              devices. Experience the difference that speed makes in your
              educational workflow.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5 cursor-pointer hover:shadow-md transition-shadow">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background cursor-pointer">
              <ZoomIn className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium cursor-pointer">Quality</h3>
            <p className="leading-7 text-muted-foreground">
              Our platform delivers education management with uncompromising
              quality and reliability. Every feature undergoes rigorous testing
              to ensure a seamless experience. From data security protocols that
              exceed industry standards to intuitive interfaces designed with
              educator feedback, we prioritize excellence in every aspect of our
              service to support your institution's educational mission.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5 cursor-pointer hover:shadow-md transition-shadow">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background cursor-pointer">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium cursor-pointer">
              Smart Assessment Tools
            </h3>
            <p className="leading-7 text-muted-foreground">
              Revolutionize evaluation with our AI-powered assessment platform.
              Automatically grade objective questions, detect patterns in
              student performance, and generate personalized learning
              recommendations. Teachers can create diverse question types,
              implement adaptive testing that adjusts to student abilities, and
              use detailed analytics to identify learning gaps and intervention
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature16 };
