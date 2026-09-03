import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Bean {
  id: number;
  x: string;
  y: string;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  opacity: number;
}

const BEANS: Bean[] = [
  { id: 1, x: "5%", y: "10%", size: 24, rotation: 45, delay: 0, duration: 12, opacity: 0.12 },
  { id: 2, x: "90%", y: "15%", size: 18, rotation: -30, delay: 2, duration: 15, opacity: 0.08 },
  { id: 3, x: "15%", y: "40%", size: 20, rotation: 60, delay: 4, duration: 18, opacity: 0.1 },
  { id: 4, x: "85%", y: "45%", size: 22, rotation: -45, delay: 1, duration: 14, opacity: 0.09 },
  { id: 5, x: "50%", y: "20%", size: 16, rotation: 30, delay: 3, duration: 16, opacity: 0.07 },
  { id: 6, x: "70%", y: "70%", size: 26, rotation: -60, delay: 5, duration: 13, opacity: 0.11 },
  { id: 7, x: "25%", y: "75%", size: 14, rotation: 90, delay: 2.5, duration: 17, opacity: 0.06 },
  { id: 8, x: "95%", y: "50%", size: 20, rotation: -20, delay: 1.5, duration: 11, opacity: 0.1 },
  { id: 9, x: "40%", y: "85%", size: 18, rotation: 75, delay: 3.5, duration: 19, opacity: 0.08 },
  { id: 10, x: "60%", y: "5%", size: 22, rotation: -45, delay: 0.5, duration: 14, opacity: 0.09 },
];

function CoffeeBeanSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="12"
        cy="17"
        rx="11"
        ry="16"
        fill="url(#beanGrad)"
        stroke="#2a1810"
        strokeWidth="0.5"
      />
      <path
        d="M12 3C12 3 8 10 8 17C8 24 12 31 12 31"
        stroke="#1a0f08"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M12 3C12 3 16 10 16 17C16 24 12 31 12 31"
        stroke="#1a0f08"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <defs>
        <radialGradient id="beanGrad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#5c3d2e" />
          <stop offset="60%" stopColor="#3a2518" />
          <stop offset="100%" stopColor="#1a0f08" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function FloatingCoffeeBeans() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {BEANS.map((bean, i) => (
        <motion.div
          key={bean.id}
          className="absolute"
          style={{
            left: bean.x,
            top: bean.y,
            opacity: bean.opacity,
            rotate: bean.rotation,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [bean.rotation, bean.rotation + 15, bean.rotation],
          }}
          transition={{
            duration: bean.duration,
            delay: bean.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div style={{ y: i % 2 === 0 ? y1 : y2 }}>
            <CoffeeBeanSVG size={bean.size} />
          </motion.div>
        </motion.div>
      ))}

      {/* Central rotating bean cluster */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ rotate }}
      >
        <div className="relative size-40 opacity-[0.04]">
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-30px)`,
              }}
            >
              <CoffeeBeanSVG size={16} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
