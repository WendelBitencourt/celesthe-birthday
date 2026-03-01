/*
 * DESIGN PHILOSOPHY: "Lover Era Dreamy"
 * Component: FloatingHearts — gentle floating hearts rising from the bottom
 * Inspired by Taylor Swift's Lover era romantic aesthetic
 */

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

const HEART_COLORS = [
  "#FF8FAB", "#FFB6C1", "#E6CCFF", "#C49AE8",
  "#FF6B9D", "#FFD6E0", "#DDA0DD",
];

function createHeart(id: number): Heart {
  return {
    id,
    x: Math.random() * 90 + 5,
    size: Math.random() * 20 + 12,
    duration: Math.random() * 4 + 5,
    delay: Math.random() * 3,
    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    opacity: Math.random() * 0.4 + 0.3,
  };
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>(() =>
    Array.from({ length: 12 }, (_, i) => createHeart(i))
  );
  const [counter, setCounter] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => {
        const newId = c + 1;
        setHearts((prev) => {
          const updated = [...prev, createHeart(newId)];
          // Keep only last 20 hearts
          return updated.slice(-20);
        });
        return newId;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: "absolute",
            left: `${heart.x}%`,
            bottom: "-40px",
            animation: `noteFloat ${heart.duration}s ${heart.delay}s ease-out forwards`,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
              fill={heart.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
