"use client";

import { useEffect } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  useEffect(() => {
    // Scroll to top on page refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
