"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const Sidebar = () => {
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarToggled((sidebarToggled) => !sidebarToggled);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // The logout function in AuthContext already handles:
      // 1. API call to /api/auth/sign-out which deletes the token cookie
      // 2. Setting user to null in context
      // 3. Redirecting to the sign-in page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <aside
        data-sidebar
        className={`fixed h-[100dvh] py-3 overflow-hidden lg:static w-11/12 max-w-[18rem] md:w-72 transition-all ${
          sidebarToggled ? "translate-x-0" : "-translate-x-full"
        } lg:-translate-x-0 bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/40 dark:shadow-gray-800/40 flex flex-col justify-between px-4 lg:transition-none ease-linear`}
      >
        <div className="min-h-max py-2 border-b border-b-gray-100 dark:border-b-gray-800 flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-x-3 font-semibold text-gray-800 dark:text-gray-200"
          >
            <Image src="/favicon.ico" alt="alt" width={30} height={30} />
          </Link>
          <ThemeToggle />
        </div>
        <nav className="flex-1 pt-6">
          <ul className="text-gray-700 dark:text-gray-300 space-y-3">
            <li className="relative before:absolute before:-left-4 before:w-1.5 before:h-4/5 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 before:bg-blue-600">
              <Link
                href="#"
                className="flex items-center px-4 py-2.5 gap-x-3 text-blue-600 bg-gray-50 dark:bg-gray-800/80 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                    clipRule="evenodd"
                  />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-2.5 gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"
                >
                  <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                  <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                  <path d="m2.1 21.8 6.4-6.3" />
                  <path d="m19 5-7 7" />
                </svg>
                Meal Menu
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-2.5 gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bus-icon lucide-bus"
                >
                  <path d="M8 6v6" />
                  <path d="M15 6v6" />
                  <path d="M2 12h19.6" />
                  <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
                  <circle cx="7" cy="18" r="2" />
                  <path d="M9 18h5" />
                  <circle cx="16" cy="18" r="2" />
                </svg>
                Transport
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-2.5 gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-hand-coins-icon lucide-hand-coins"
                >
                  <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                  <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                  <path d="m2 16 6 6" />
                  <circle cx="16" cy="9" r="2.9" />
                  <circle cx="6" cy="5" r="3" />
                </svg>
                Fees
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-2.5 gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone-call-icon lucide-phone-call"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                  <path d="M14.05 6A5 5 0 0 1 18 10" />
                </svg>
                Communication
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <div className="flex flex-col gap-y-2 text-gray-700 dark:text-gray-300">
            <Link href="#" className="flex items-center px-4 py-2.5 gap-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              Support
            </Link>
            <Button
              onClick={handleLogout}
              className="outline-none flex items-center px-4 py-2.5 cursor-pointer gap-x-3"
              variant={"destructive"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <main>
        <div className="flex lg:hidden fixed right-2 top-2 p-4">
          <button
            onClick={toggleSidebar}
            className="p-3 rounded-full bg-blue-600 dark:bg-blue-500 outline-none w-12 aspect-square flex flex-col relative justify-center items-center"
          >
            <span className="sr-only">toggle sidebar</span>
            <span
              className={`
                            w-6 h-0.5 rounded-full bg-gray-300 transition-transform duration-300 ease-linear
                            ${
                              sidebarToggled
                                ? "rotate-[40deg] translate-y-1.5"
                                : ""
                            }
                        `}
            />
            <span
              className={`
                            w-6 origin-center mt-1 h-0.5 rounded-full bg-gray-300 transition-all duration-300 ease-linear
                            ${sidebarToggled ? "opacity-0 scale-x-0" : ""}
                        `}
            />
            <span
              className={`
                            w-6 mt-1 h-0.5 rounded-full bg-gray-300 transition-all duration-300 ease-linear
                            ${
                              sidebarToggled
                                ? "-rotate-[40deg] -translate-y-1.5"
                                : ""
                            }
                        `}
            />
          </button>
        </div>
      </main>
    </>
  );
};

export default Sidebar;
