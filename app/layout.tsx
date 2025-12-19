import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { LayoutProvider } from "@/components/layouts/layout-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ERRS - Electronic Real Estate Reporting System",
  description: "Electronic Real Estate Reporting System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
