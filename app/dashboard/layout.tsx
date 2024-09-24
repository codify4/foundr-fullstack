import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foundr | Dashboard",
  description: "Build a beautiful website for your journey as founder",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
