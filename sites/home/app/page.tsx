import "./home.css";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StoresSection } from "@/components/StoresSection";
import { CtaBanner } from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StoresSection />
        <CtaBanner />
      </main>
    </>
  );
}
