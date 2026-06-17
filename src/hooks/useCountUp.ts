import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type UseCountUpOptions = {
  duration?: number;
  once?: boolean;
};

export const useCountUp = (target: number, options?: UseCountUpOptions) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: options?.once ?? true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration: options?.duration ?? 2,
      ease: "easeOut",
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, target, options?.duration]);

  return { ref, display };
};
