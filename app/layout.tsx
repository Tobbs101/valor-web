/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import "@fontsource-variable/open-sans";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Limit Breakers Tutoring",
  description: "Welcome to Limit Breakers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
