"use client";
import { useEffect } from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    console.log("User:", user);
  }, [user]);
  return (
    <div>
      <Header></Header>
      <Hero></Hero>
    </div>
  );
}
