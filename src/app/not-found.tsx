import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <h1 className="text-5xl">404</h1>
      <h2 className="mb-5 text-2xl">Page Not Found!</h2>
      <Link href="/" className="bg-cyan-600 text-white p-3">
        Back to Home
      </Link>
    </div>
  );
}
