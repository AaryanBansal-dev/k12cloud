import { Timer, Zap, ZoomIn } from "lucide-react";

const Feature16 = () => {
  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2 dark:text-gray-50">
            Powerful Features for Modern Education
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto dark:text-gray-50">
            Our platform offers all the tools schools need to streamline
            operations and focus on what matters most: education.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <div className="rounded-lg bg-accent dark:bg-accent/80 p-5 cursor-pointer hover:shadow-md dark:hover:shadow-accent/20 transition-shadow">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background dark:bg-background/90 cursor-pointer">
              <Timer className="size-6 dark:text-gray-50" />
            </span>
            <h3 className="mb-2 text-xl font-medium cursor-pointer dark:text-gray-50">
              Speed
            </h3>
            <p className="leading-7 text-muted-foreground dark:text-gray-50/90">
              We deliver real-time notifications with lightning-fast efficiency,
              ensuring you stay informed without delay. Our advanced
              notification system processes and distributes alerts within
              milliseconds, providing instantaneous updates on student progress,
              administrative changes, and important announcements across all
              devices. Experience the difference that speed makes in your
              educational workflow.
            </p>
          </div>
          <div className="rounded-lg bg-accent dark:bg-accent/80 p-5 cursor-pointer hover:shadow-md dark:hover:shadow-accent/20 transition-shadow">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background dark:bg-background/90 cursor-pointer">
              <ZoomIn className="size-6 dark:text-gray-50" />
            </span>
            <h3 className="mb-2 text-xl font-medium cursor-pointer dark:text-gray-50">
              Quality
            </h3>
            <p className="leading-7 text-muted-foreground dark:text-gray-50/90">
              Our platform delivers education management with uncompromising
              quality and reliability. Every feature undergoes rigorous testing
              to ensure a seamless experience. From data security protocols that
              exceed industry standards to intuitive interfaces designed with
              educator feedback, we prioritize excellence in every aspect of our
              service to support your institution's educational mission.
            </p>
          </div>
          <div className="rounded-lg bg-accent dark:bg-accent/80 p-5 cursor-pointer hover:shadow-md dark:hover:shadow-accent/20 transition-shadow">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background dark:bg-background/90 cursor-pointer">
              <Zap className="size-6 dark:text-gray-50" />
            </span>
            <h3 className="mb-2 text-xl font-medium cursor-pointer dark:text-gray-50">
              Smart Assessment Tools
            </h3>
            <p className="leading-7 text-muted-foreground dark:text-gray-50/90">
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
