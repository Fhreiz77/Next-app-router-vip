"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="w-full h-96 bg-gray-300 rounded-xl flex justify-center items-center">
      <h1>Dashboard {session?.user?.name ? `Welcome ${session.user.name}!` : 'User'}</h1>
    </div>
  );
}