import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workflow Documentation Platform",
  description: "Create, manage, and share workflow documentation with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {/* Grid Background - Fixed */}
            <div 
              className="fixed inset-0 z-0 pointer-events-none" 
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
                backgroundSize: '64px 64px',
              }} 
            />

            {/* Main Content */}
            <div className="relative z-10">
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
            </div>

            <Toaster 
              theme="dark"
              toastOptions={{
                style: {
                  background: '#000',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}