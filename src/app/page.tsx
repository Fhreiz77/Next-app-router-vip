import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  ),
  title: "Home -Fhreiz",
  description: "Aplikasi untuk belajar Next.js",
  authors: [{ name: "Muhammad Iqbal Fahrezi", url: "http://localhost:3000" }],
  openGraph: {
    title: "Home - Fhreiz",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mx-auto text-mist-700 text-2xl">Next Home!</h1>
    </main>
  );
}
