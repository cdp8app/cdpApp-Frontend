import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messaging - CareerXHub",
  description: "Chat with students, companies and mentors",
};

export default function MessagingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
