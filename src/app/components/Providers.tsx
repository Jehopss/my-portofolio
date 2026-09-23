"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";

/**
 * Lenis gives the whole page inertial, buttery scrolling (and smooth
 * anchor-link jumps). Both Lenis and Framer Motion back off automatically
 * for visitors who ask their OS for reduced motion.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1,
        anchors: true,
        autoRaf: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
