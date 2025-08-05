import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Menteronics - Master Web Development Like Never Before",
  description: "Transform your career with cutting-edge web development courses at Menteronics. Learn from industry experts and build real-world projects that matter.",
  keywords: "web development, coding bootcamp, React, Next.js, programming courses, software development training, Menteronics",
  authors: [{ name: "Menteronics" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Menteronics - Master Web Development Like Never Before",
    description: "Transform your career with cutting-edge web development courses. Learn from industry experts and build real-world projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Menteronics - Master Web Development Like Never Before",
    description: "Transform your career with cutting-edge web development courses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
