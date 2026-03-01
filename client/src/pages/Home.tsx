/*
 * DESIGN PHILOSOPHY: "Lover Era Dreamy"
 * Page: Home — Birthday page for Celesthe, Taylor Swift Lover era theme
 * Layout: Full-scroll cinematic with floating elements, asymmetric sections
 * Colors: Baby pink, lavender, sky blue, soft gold
 * Typography: Great Vibes (display) + Cormorant Garamond (serif) + Nunito (body)
 */

import { useEffect, useRef, useState } from "react";
import Confetti from "@/components/Confetti";
import FloatingStars from "@/components/FloatingStars";
import FloatingHearts from "@/components/FloatingHearts";

// Asset URLs (Lover Era Dreamy — generated images)
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393409486/9LBNwrz3WYAG3i9mCQuETp/hero-bg-JcTPpLYJjtrpyNwWrwokex.webp";
const BIRTHDAY_CARD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393409486/9LBNwrz3WYAG3i9mCQuETp/birthday-card-oLmhKeUVqudVeMUGeJn7jN.webp";
const CONFETTI_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393409486/9LBNwrz3WYAG3i9mCQuETp/confetti-bg-Y3UgDvTSdgRJH9MnaYjTZe.webp";

// Taylor Swift quotes for the "Eras" section
const ERAS = [
  {
    era: "Taylor Swift",
    year: "2006",
    color: "#F0C060",
    bg: "linear-gradient(135deg, #FFF8E7 0%, #FFF0C0 100%)",
    icon: "🎸",
    quote: "\"She lost him but she found herself and somehow that was everything.\"",
    mood: "Country Dreams",
  },
  {
    era: "Fearless",
    year: "2008",
    color: "#D4A030",
    bg: "linear-gradient(135deg, #FFFAEC 0%, #FFE8A0 100%)",
    icon: "✨",
    quote: "\"Fearless is not the absence of fear. It's having fears but jumping anyway.\"",
    mood: "Golden Courage",
  },
  {
    era: "Speak Now",
    year: "2010",
    color: "#9B6EC4",
    bg: "linear-gradient(135deg, #F5EEFF 0%, #E8D0FF 100%)",
    icon: "💜",
    quote: "\"Long story short, I survived.\"",
    mood: "Purple Magic",
  },
  {
    era: "Red",
    year: "2012",
    color: "#C0392B",
    bg: "linear-gradient(135deg, #FFF0EE 0%, #FFD0CC 100%)",
    icon: "🍂",
    quote: "\"Loving him was red.\"",
    mood: "Burning Passion",
  },
  {
    era: "1989",
    year: "2014",
    color: "#5A8FC4",
    bg: "linear-gradient(135deg, #EEF5FF 0%, #C8E0FF 100%)",
    icon: "🌊",
    quote: "\"She had the time of her life fighting dragons with you.\"",
    mood: "Sky Blue Pop",
  },
  {
    era: "Reputation",
    year: "2017",
    color: "#2C2C2C",
    bg: "linear-gradient(135deg, #F0F0F0 0%, #D8D8D8 100%)",
    icon: "🐍",
    quote: "\"I don't trust nobody and nobody trusts me.\"",
    mood: "Dark Rebirth",
  },
  {
    era: "Lover",
    year: "2019",
    color: "#E8829A",
    bg: "linear-gradient(135deg, #FFF0F5 0%, #FFD6E8 100%)",
    icon: "💕",
    quote: "\"Can I go where you go? Can we always be this close?\"",
    mood: "Pastel Romance",
  },
  {
    era: "Folklore",
    year: "2020",
    color: "#6B7A8D",
    bg: "linear-gradient(135deg, #F5F5F0 0%, #E0E0D8 100%)",
    icon: "🌲",
    quote: "\"I had the best of times with you.\"",
    mood: "Indie Whisper",
  },
  {
    era: "Evermore",
    year: "2020",
    color: "#8B6914",
    bg: "linear-gradient(135deg, #FFF8F0 0%, #FFE8C0 100%)",
    icon: "🍁",
    quote: "\"Oh, I'm the one who burns your life down then shows up to be the firefighter.\"",
    mood: "Autumn Gold",
  },
  {
    era: "Midnights",
    year: "2022",
    color: "#3A4A7A",
    bg: "linear-gradient(135deg, #EEF0FF 0%, #C8D0FF 100%)",
    icon: "🌙",
    quote: "\"It's me, hi, I'm the problem, it's me.\"",
    mood: "Midnight Blue",
  },
  {
    era: "TTPD",
    year: "2024",
    color: "#B0A090",
    bg: "linear-gradient(135deg, #F8F5F0 0%, #EDE8E0 100%)",
    icon: "🪶",
    quote: "\"I cry a lot but I am so productive, it's an art.\"",
    mood: "Poetic Beige",
  },
];

// Animated section reveal hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Musical note floating decoration
function MusicalNote({ style }: { style?: React.CSSProperties }) {
  return (
    <span
      style={{
        fontSize: "1.4rem",
        color: "#E8829A",
        opacity: 0.5,
        position: "absolute",
        ...style,
      }}
      aria-hidden="true"
    >
      ♪
    </span>
  );
}

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [activeEra, setActiveEra] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 8500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "linear-gradient(160deg, #FFF0F5 0%, #F5EEFF 50%, #EEF5FF 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Background layers */}
      {showConfetti && <Confetti />}
      <FloatingStars count={25} />
      <FloatingHearts />

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(255,240,245,0.3) 0%, rgba(255,248,252,0.5) 60%, rgba(255,248,252,0.85) 100%)",
          }}
        />

        {/* Musical notes decoration */}
        <MusicalNote style={{ top: "15%", left: "8%", fontSize: "2rem", animation: "float 5s ease-in-out infinite" }} />
        <MusicalNote style={{ top: "25%", right: "10%", fontSize: "1.6rem", animation: "float 4s ease-in-out 1s infinite" }} />
        <MusicalNote style={{ top: "60%", left: "5%", fontSize: "1.2rem", animation: "float 6s ease-in-out 2s infinite" }} />
        <MusicalNote style={{ bottom: "20%", right: "8%", fontSize: "1.8rem", animation: "float 4.5s ease-in-out 0.5s infinite" }} />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div
            style={{
              opacity: 0,
              animation: "fadeInScale 1s ease-out 0.3s forwards",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 3vw, 1.4rem)",
                color: "#9B6EC4",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
                fontStyle: "italic",
              }}
            >
              
            </p>
          </div>

          <div
            style={{
              opacity: 0,
              animation: "fadeInScale 1s ease-out 0.6s forwards",
            }}
          >
            <h1
              className="shimmer-text"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(4rem, 14vw, 9rem)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                filter: "drop-shadow(0 4px 20px rgba(232,130,154,0.3))",
              }}
            >
              Celesthe
            </h1>
          </div>

          <div
            style={{
              opacity: 0,
              animation: "fadeInUp 1s ease-out 1s forwards",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, #E8829A)" }} />
              <span style={{ fontSize: "1.8rem", animation: "heartbeat 2s ease-in-out infinite" }}>💕</span>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
                  color: "#E8829A",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Feliz Aniversário!
              </p>
              <span style={{ fontSize: "1.8rem", animation: "heartbeat 2s ease-in-out 0.3s infinite" }}>💕</span>
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, #E8829A, transparent)" }} />
            </div>

            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                color: "#7A5A6A",
                maxWidth: "500px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.8,
              }}
            >
              "You belong with the birthday cake 🎂
            </p>

            <a
              href="#mensagem"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.9rem 2.5rem",
                background: "linear-gradient(135deg, #FFB6C1, #E6CCFF)",
                color: "#6A3A5A",
                borderRadius: "50px",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(255,182,193,0.5)",
                transition: "transform 0.2s, box-shadow 0.2s",
                animation: "glowPulse 3s ease-in-out infinite",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px) scale(1.03)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px rgba(255,182,193,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(255,182,193,0.5)";
              }}
            >
              <span>Ver a mensagem</span>
              <span style={{ animation: "float 2s ease-in-out infinite" }}>↓</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ animation: "float 2s ease-in-out infinite", opacity: 0.6 }}
          aria-hidden="true"
        >
          <div style={{ width: "24px", height: "40px", border: "2px solid #E8829A", borderRadius: "12px", display: "flex", justifyContent: "center", paddingTop: "6px" }}>
            <div style={{ width: "4px", height: "8px", background: "#E8829A", borderRadius: "2px", animation: "float 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ===== MENSAGEM PRINCIPAL ===== */}
      <section
        id="mensagem"
        className="relative py-24 px-6 overflow-hidden"
        style={{
          backgroundImage: `url(${CONFETTI_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(255,248,252,0.88)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                color: "#E8829A",
                marginBottom: "0.5rem",
                filter: "drop-shadow(0 2px 12px rgba(232,130,154,0.3))",
              }}
            >
              Para a Celesthe
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
              {["💕", "✨", "🎂", "✨", "💕"].map((e, i) => (
                <span key={i} style={{ fontSize: "1.4rem", animation: `sparkle ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }}>{e}</span>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={200}>
              <div
                className="glass-card"
                style={{
                  padding: "2.5rem",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative corner */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #FFB6C1, #E6CCFF)",
                    borderRadius: "50%",
                    opacity: 0.3,
                  }}
                />

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                    color: "#5A3A4A",
                    lineHeight: 2,
                    fontStyle: "italic",
                    marginBottom: "1.5rem",
                  }}
                >
                  Hoje é um dia para celebrar alguém muito especial — você, Celesthe!
                  Como a Taylor Swift uma vez disse, as melhores histórias são aquelas
                  vividas com coragem, amor e muito brilho. E você tem tudo isso.
                </p>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                    color: "#5A3A4A",
                    lineHeight: 2,
                    fontStyle: "italic",
                    marginBottom: "1.5rem",
                  }}
                >
                  Que este novo ano da sua vida seja cheio de músicas que fazem o coração
                  acelerar, de momentos que viram memórias eternas, e de pessoas que te
                  fazem sentir exatamente como nos shows da Eras Tour — invencível.
                </p>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                    color: "#5A3A4A",
                    lineHeight: 2,
                    fontStyle: "italic",
                  }}
                >
                  Você merece todo o amor do mundo. Feliz aniversário, Swiftie! 💕
                </p>

                <div
                  style={{
                    marginTop: "2rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(255,182,193,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", animation: "heartbeat 2s ease-in-out infinite" }}>💖</span>
                  <p
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "1.8rem",
                      color: "#E8829A",
                    }}
                  >
                    Com muito amor!
                  </p>
                </div>
              </div>
            </RevealSection>
        </div>
      </section>

      {/* ===== QUOTE ESPECIAL ===== */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFB6C1 0%, #E6CCFF 50%, #B8D4F0 100%)",
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <RevealSection>
            <span
              style={{
                fontSize: "5rem",
                opacity: 0.3,
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1,
                display: "block",
                color: "#6A3A5A",
              }}
              aria-hidden="true"
            >
              "
            </span>
            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                color: "#4A2A3A",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              Long story short, I survived. And the best is yet to come.
            </blockquote>
            <span
              style={{
                fontSize: "5rem",
                opacity: 0.3,
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 0.5,
                display: "block",
                color: "#6A3A5A",
              }}
              aria-hidden="true"
            >
              "
            </span>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "1rem",
                color: "#6A3A5A",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: "1rem",
              }}
            >
              — Taylor Swift, Long Story Short
            </p>
          </RevealSection>
        </div>

        {/* Decorative musical notes */}
        {["♪", "♫", "♩", "♬", "♪"].map((note, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              fontSize: `${1.5 + i * 0.3}rem`,
              color: "rgba(255,255,255,0.5)",
              top: `${15 + i * 15}%`,
              left: i % 2 === 0 ? `${3 + i * 2}%` : undefined,
              right: i % 2 !== 0 ? `${3 + i * 2}%` : undefined,
              animation: `float ${4 + i}s ease-in-out ${i * 0.5}s infinite`,
            }}
            aria-hidden="true"
          >
            {note}
          </span>
        ))}
      </section>

      {/* ===== ERAS SECTION ===== */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(160deg, #FFF0F5 0%, #F5EEFF 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-16">
            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                color: "#E8829A",
                marginBottom: "0.5rem",
              }}
            >
              As Eras da Taylor
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                color: "#9B6EC4",
                fontStyle: "italic",
              }}
            >
              Cada álbum, uma era. Cada era, uma história.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ERAS.map((era, i) => (
              <RevealSection key={era.era} delay={i * 60}>
                <div
                  onClick={() => setActiveEra(activeEra === i ? null : i)}
                  style={{
                    background: era.bg,
                    borderRadius: "20px",
                    padding: "1.5rem",
                    cursor: "pointer",
                    border: `2px solid ${era.color}30`,
                    boxShadow: activeEra === i
                      ? `0 12px 40px ${era.color}50, 0 4px 12px ${era.color}30`
                      : "0 4px 16px rgba(0,0,0,0.06)",
                    transform: activeEra === i ? "scale(1.03)" : "scale(1)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (activeEra !== i) {
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02) translateY(-3px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px ${era.color}40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeEra !== i) {
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    }
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.4rem",
                          fontWeight: 600,
                          color: era.color,
                          marginBottom: "2px",
                        }}
                      >
                        {era.era}
                      </h3>
                      <span
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: "0.75rem",
                          color: `${era.color}99`,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {era.year} · {era.mood}
                      </span>
                    </div>
                    <span style={{ fontSize: "2rem" }}>{era.icon}</span>
                  </div>

                  {activeEra === i && (
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.95rem",
                        color: "#4A3A4A",
                        fontStyle: "italic",
                        lineHeight: 1.7,
                        marginTop: "0.75rem",
                        paddingTop: "0.75rem",
                        borderTop: `1px solid ${era.color}30`,
                        animation: "fadeInUp 0.4s ease-out",
                      }}
                    >
                      {era.quote}
                    </p>
                  )}

                  {activeEra !== i && (
                    <p
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "0.8rem",
                        color: `${era.color}80`,
                        marginTop: "0.5rem",
                      }}
                    >
                      Toque para ver a quote ✨
                    </p>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MENSAGEM FINAL ===== */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(255,248,252,0.85) 0%, rgba(255,240,250,0.92) 100%)" }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <RevealSection>
            <div
              className="glass-card animate-glow"
              style={{
                padding: "3rem 2.5rem",
                borderRadius: "32px",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "heartbeat 2s ease-in-out infinite" }}>
                🎂
              </div>

              <h2
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                <span className="shimmer-text">Feliz Aniversário,</span>
                <br />
                <span style={{ color: "#E8829A" }}>Celesthe!</span>
              </h2>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)",
                  color: "#5A3A4A",
                  fontStyle: "italic",
                  lineHeight: 1.9,
                  marginBottom: "2rem",
                }}
              >
                Que a sua vida seja uma Eras Tour interminável — cheia de capítulos
                incríveis, músicas que marcam a alma, e pessoas que cantam junto com você
                em cada verso. Você é incrível, e o melhor ainda está por vir.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "2rem",
                }}
              >
                {["🌟", "💕", "🎵", "✨", "🦋", "💜", "🌸"].map((emoji, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "1.8rem",
                      animation: `sparkle ${1.5 + i * 0.2}s ease-in-out ${i * 0.15}s infinite`,
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>

              <p
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "2.2rem",
                  color: "#9B6EC4",
                }}
              >
                com amor, sempre 💕
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          background: "linear-gradient(135deg, #FFB6C1 0%, #E6CCFF 50%, #B8D4F0 100%)",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            color: "#4A2A3A",
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          Feito com 💕 e muito amor · Inspirado na magia da Taylor Swift
        </p>
        <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center", gap: "8px" }}>
          {["✨", "💕", "🎵", "💕", "✨"].map((e, i) => (
            <span key={i} style={{ fontSize: "1rem", animation: `twinkle ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }}>{e}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
