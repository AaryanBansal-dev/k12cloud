import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "K12Cloud",
  description:
    "K12Cloud - A cloud-based platform for K-12 education. We offer a range of services to enhance the learning experience for students, teachers, and parents. Our platform includes tools for online learning, communication, and collaboration, all designed to support the unique needs of K-12 education. Whether you're a school administrator, teacher, or parent, K12Cloud has the resources you need to succeed in today's digital learning environment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
