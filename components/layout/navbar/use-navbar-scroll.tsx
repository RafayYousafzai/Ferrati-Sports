"use client";

import { useState, useEffect } from "react";

interface UseNavbarScrollProps {
  initialHidden?: boolean;
}

export function useNavbarScroll({
  initialHidden = false,
}: UseNavbarScrollProps = {}) {
  const [hidden, setHidden] = useState(initialHidden);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // scrolling down
          setHidden(true);
        } else {
          // scrolling up
          setHidden(false);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return { hidden };
}
