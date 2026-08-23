import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useFadeIn } from "@/hooks/use-fade-in";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
}: FadeInProps) {
  const { ref, isVisible } = useFadeIn<HTMLDivElement>();
  const dir = directionMap[direction];
  const scale = distance / 40;

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          x: dir.x * scale,
          y: dir.y * scale,
        }}
        animate={
          isVisible
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: dir.x * scale, y: dir.y * scale }
        }
        transition={{
          duration: 0.7,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
