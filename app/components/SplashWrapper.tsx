"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SplashScreen from "./SplashScreen";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {pathname === "/" && showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      {children}
    </>
  );
}
