import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ThemeProvider } from "@/components/theme-provider"
import AppProvider from "@/components/app-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["vietnamese"] })

export const metadata = {
  title: "AE Booking - Admin",
  description: "Quản lý loại thể thao",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          <Toaster />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  )
}
