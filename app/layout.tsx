import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { LayoutProvider } from "@/components/layouts/layout-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { AppProvider } from "@/components/providers/app-provider";
import { ClientOnly } from "@/components/providers/client-only";

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
    <html lang="en" data-scroll-behavior="smooth">
      <body 
        className={inter.className}
        suppressHydrationWarning={true}
      >
        <ClientOnly fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          </div>
        }>
          <AuthProvider>
            <AppProvider>
              <QueryProvider>
                <LayoutProvider>
                  {children}
                </LayoutProvider>
              </QueryProvider>
            </AppProvider>
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
