"use client"
import Image from "next/image";
import NavBar from "./components/NavBar";
import HeroCenter from "./components/Home";
import Services from "./components/Services";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="scrollbar-hide">
      <NavBar/>
      <HeroCenter />
      <Services />
      <Footer />
    </main>
  );
}
