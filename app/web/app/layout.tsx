// Next
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
// CSS
import "./globals.css"
// Shadcn
import { cn } from "@/lib/utils"
// Components
import { ThemeProvider } from "./components/ThemeProvider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "MyFullStackSetup"
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({children}: Props) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>

          {children}

        </ThemeProvider>
      </body>
    </html>
  )
}
