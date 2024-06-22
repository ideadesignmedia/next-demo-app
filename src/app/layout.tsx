import type { Metadata } from "next";
import "./globals.css";
import App from "../components/app";

export const metadata: Metadata = {
  title: "Demo App NextJS",
  description: "View users and their relations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
        </body>
    </html>
  );
}
