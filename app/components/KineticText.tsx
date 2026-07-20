"use client";

import { useEffect, useRef, useState } from "react";

type HTMLElementTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface KineticTextProps {
  text: string;
  as?: HTMLElementTagName;
  className?: string;
  delayOffset?: number;
}

export default function KineticText({ text, as: Tag = "h1", className = "", delayOffset = 0 }: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={containerRef} className={`${className} kinetic-container`} style={{ overflow: "hidden", display: "inline-block" }}>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.25em",
            verticalAlign: "bottom"
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: isVisible ? "translateY(0)" : "translateY(110%)",
              transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayOffset + (index * 0.05)}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
