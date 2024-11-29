"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    console.log("User:", user);
    // Redirect to the dashboard page initially
    router.push("/workspace/"+2);
  }, [router]);

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
