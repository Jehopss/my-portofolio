import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jonathan Hopi Pranata - Portfolio",
  description: "Computer Science Student Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
