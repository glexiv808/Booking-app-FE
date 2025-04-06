"use client"

import { useAppStore } from "@/components/app-provider";
import { redirect } from "next/navigation";

export default function Home() {
  // redirect("/login");
  const name =  useAppStore((state) => state.name);
  console.log("🚀 ~ Home ~ name:", name)


  return <main>HOme</main>;
}