import type { Metadata } from "next";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = BricolageGrotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abirbhab Dasgupta",
  description: "Personal portfolio of Abirbhab Dasgupta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
