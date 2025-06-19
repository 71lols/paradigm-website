// app/layout.tsx
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/authContext";

const inter = Ubuntu({
  weight: "400",
  subsets: ["latin"], // Add this line to specify font subsets
});

export const metadata: Metadata = {
  title: "Paradigm",
  description: "Welcome to Paradigm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}