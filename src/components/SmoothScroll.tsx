import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis options matching modern API
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08, // Adjust for buttery smoothness
    });
    
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
