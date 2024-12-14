import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Foundr | Feedback",
  description: "Suggest features or improvements and report bugs",
};

const inter = Inter({ weight: "600", subsets: ["latin"] });

export default function FeedbackLayout({
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
