import React from "react";

const Pricing4 = () => {
  return (
    <section id="pricing" className="py-16 bg-slate-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2 dark:text-gray-50">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto dark:text-gray-50">
            Choose the perfect plan for your school's needs with no hidden fees
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer dark:border-gray-700 dark:hover:border-gray-600">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-50">
              Basic
            </h3>
            <p className="text-gray-500 mb-4 dark:text-gray-400">
              For smaller schools
            </p>
            <div className="text-3xl font-bold mb-6 dark:text-gray-50">
              ₹999
              <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                /month
              </span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">Up to 250 students</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">
                  Core notification features
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">Email & phone support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">Attendance tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">
                  Basic report generation
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">Mobile app access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">Student profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">
                  Basic homework management
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="dark:text-gray-50">5 GB cloud storage</span>
              </li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-gray-50">
              Get Started
            </button>
          </div>

          {/* Standard Plan */}
          <div className="border rounded-lg p-6 bg-gray-50  dark:bg-gray-800 border-blue-200 hover:shadow-lg transition-shadow relative cursor-pointer">
            <div className="absolute -top-3 left-0 right-0 flex justify-center">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-50">
              Standard
            </h3>
            <p className="text-gray-500 mb-4">For medium-sized schools</p>
            <div className="text-3xl font-bold mb-6 dark:text-gray-50">
              ₹3999
              <span className="text-lg font-normal text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8 dark:text-gray-50">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Up to 750 students</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Core notification features</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Attendance tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Mobile app access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Student profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Basic homework management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Parent-teacher communication portal</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Exam management system</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Library management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Timetable scheduling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Fee management system</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>30 GB cloud storage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Digital learning resources</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Enhanced report generation</span>
              </li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer dark:border-gray-700 dark:hover:border-gray-600">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-50">
              Premium
            </h3>
            <p className="text-gray-500 mb-4 dark:text-gray-400">
              For larger institutions
            </p>
            <div className="text-3xl font-bold mb-6 dark:text-gray-50">
              ₹9999
              <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                /month
              </span>
            </div>
            <ul className="space-y-3 mb-8 dark:text-gray-50">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Unlimited students</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Core notification features</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Attendance tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Mobile app access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Student profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Advanced homework management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Parent-teacher communication portal</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Exam management system</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Library management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Timetable scheduling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Fee management system</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Digital learning resources</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>AI-powered insights dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Advanced security features</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Campus management system</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Multi-branch support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Unlimited cloud storage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Transport management system</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Online admission system</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>HR & payroll management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Advanced data backups</span>
              </li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-gray-50">
              Get Started
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Need a custom plan?{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline cursor-pointer dark:text-blue-400"
            >
              Contact us
            </a>{" "}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Pricing4 };
