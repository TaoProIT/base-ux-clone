"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AOSProviderProps {
  children: React.ReactNode;
}

export function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    AOS.init({
      duration: 200, // Thời gian animation cực ngắn (200ms) để tối ưu SEO
      once: true, // Chỉ animate 1 lần khi scroll xuống
      easing: "ease-out",
      offset: 50,
      delay: 0,
    });
  }, []);

  return <>{children}</>;
}
