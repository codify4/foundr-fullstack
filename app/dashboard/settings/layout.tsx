import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Foundr | Settings",
  description: "Settings for your Foundr account",
};

const inter = Inter({ weight: "600", subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} antialiased`}>
      {children}
    </div>
  );
}
