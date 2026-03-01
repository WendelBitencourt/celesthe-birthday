/*
 * DESIGN PHILOSOPHY: "Lover Era Dreamy"
 * Component: FloatingStars — twinkling stars scattered across the background
 * Inspired by the sparkle aesthetic of Taylor Swift's Lover era
 */

import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  type: "sparkle" | "star4" | "dot";
}

const STAR_COLORS = [
  "#F0C060", "#FFB6C1", "#E6CCFF", "#B8D4F0",
  "#FFD700", "#FF8FAB", "#C49AE8",
];

function Sparkle4({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={color}
      />
    </svg>
  );
}

function Star5({ size, color }: { size: number; color: string }) {
  const s = size;
  const points = Array.from({ length: 5 }, (_, i) => {
    const outer = (i * 72 - 90) * (Math.PI / 180);
    const inner = (i * 72 - 90 + 36) * (Math.PI / 180);
    return [
      `${s / 2 + (s / 2) * Math.cos(outer)},${s / 2 + (s / 2) * Math.sin(outer)}`,
      `${s / 2 + (s / 4) * Math.cos(inner)},${s / 2 + (s / 4) * Math.sin(inner)}`,
    ];
  }).flat().join(" ");
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <polygon points={points} fill={color} />
    </svg>
  );
}

export default function FloatingStars({ count = 30 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 6,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 1.5,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      type: (["sparkle", "star4", "dot"] as const)[Math.floor(Math.random() * 3)],
    }));
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
            opacity: 0.7,
          }}
        >
          {star.type === "sparkle" && (
            <Sparkle4 size={star.size} color={star.color} />
          )}
          {star.type === "star4" && (
            <Star5 size={star.size} color={star.color} />
          )}
          {star.type === "dot" && (
            <div
              style={{
                width: star.size * 0.4,
                height: star.size * 0.4,
                borderRadius: "50%",
                backgroundColor: star.color,
                boxShadow: `0 0 ${star.size}px ${star.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
