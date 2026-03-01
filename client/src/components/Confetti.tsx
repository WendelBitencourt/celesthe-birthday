/*
 * DESIGN PHILOSOPHY: "Lover Era Dreamy"
 * Component: Confetti — falling colorful confetti pieces on page load
 * Colors: Lover palette — pink, lavender, gold, sky blue
 */

import { useEffect, useRef } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: "rect" | "circle" | "star" | "heart";
  rotation: number;
}

const COLORS = [
  "#FFB6C1", "#E6CCFF", "#B8D4F0", "#F0C060",
  "#FF8FAB", "#C49AE8", "#7BBDE8", "#FFD700",
  "#FFC0CB", "#DDA0DD", "#87CEEB", "#F4A460",
];

const SHAPES: ConfettiPiece["shape"][] = ["rect", "circle", "star", "heart"];

function generatePieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 6,
    duration: Math.random() * 3 + 3,
    delay: Math.random() * 4,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    rotation: Math.random() * 360,
  }));
}

function StarShape({ size, color }: { size: number; color: string }) {
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

function HeartShape({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
        fill={color}
      />
    </svg>
  );
}

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pieces = generatePieces(60);
    const container = containerRef.current;
    if (!container) return;

    // Clear after animation
    const timeout = setTimeout(() => {
      if (container) container.style.display = "none";
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  const pieces = generatePieces(60);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: "absolute",
            left: `${piece.x}%`,
            top: "-20px",
            width: piece.size,
            height: piece.size,
            animation: `confettiFall ${piece.duration}s ${piece.delay}s linear forwards`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          {piece.shape === "rect" && (
            <div
              style={{
                width: piece.size,
                height: piece.size * 0.6,
                backgroundColor: piece.color,
                borderRadius: 1,
              }}
            />
          )}
          {piece.shape === "circle" && (
            <div
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: "50%",
              }}
            />
          )}
          {piece.shape === "star" && (
            <StarShape size={piece.size + 4} color={piece.color} />
          )}
          {piece.shape === "heart" && (
            <HeartShape size={piece.size + 4} color={piece.color} />
          )}
        </div>
      ))}
    </div>
  );
}
