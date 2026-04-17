import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "PrepPilot AI - Turn Your Resume Into Interview Success",
  description: "Transform any resume into a personalized interview prep plan in minutes. Get fit scores, tailored bullets, mock interviews, and 7-day prep plans powered by AI.",
  keywords: ["interview prep", "resume optimization", "job search", "AI coaching", "career development"],
  authors: [{ name: "Aryan Choudhary" }],
  openGraph: {
    title: "PrepPilot AI - Turn Your Resume Into Interview Success",
    description: "Transform any resume into a personalized interview prep plan in minutes.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrepPilot AI - Turn Your Resume Into Interview Success",
    description: "Transform any resume into a personalized interview prep plan in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}