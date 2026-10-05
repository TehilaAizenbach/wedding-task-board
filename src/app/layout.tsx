import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "רותי ומוישי מתחתנים",
  description: "לוח קנבן לניהול משימות חתונה – עיצוב, הדפסה ותיאומים מול הספקים",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} h-full antialiased`}>
      <body className="h-dvh flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
        {children}
        <Toaster
          position="top-center"
          dir="rtl"
          richColors
          toastOptions={{ style: { fontFamily: "var(--font-rubik)" } }}
        />
      </body>
    </html>
  );
}
