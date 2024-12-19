import localFont from "next/font/local";
import Header from "./components/layout/Header";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Language Translator | EN-KR",
  description: "A simple and efficient English-Korean translation app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="container mx-auto px-4">
          <Header />
          <main className="py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
