import { useRef, useEffect, useCallback } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseDown = useCallback((e: MouseEvent) => {
    const ele = ref.current;

    if (!ele) return;

    const startX = e.pageX - ele.offsetLeft;
    const scrollLeft = ele.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const x = e.pageX - ele.offsetLeft;
      const walk = (x - startX) * 1.5; // Adjust multiplier for scroll speed

      ele.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      ele.style.cursor = "grab";
      ele.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const ele = ref.current;

    if (ele) {
      ele.style.cursor = "grab";
      ele.addEventListener("mousedown", onMouseDown as EventListener);
    }

    return () => {
      if (ele) {
        ele.removeEventListener("mousedown", onMouseDown as EventListener);
      }
    };
  }, [onMouseDown]);

  return ref;
}
