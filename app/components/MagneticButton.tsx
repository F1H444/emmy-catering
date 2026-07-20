"use client";

import React from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
}

export default function MagneticButton({ children, className = "", as = "button", href, ...props }: MagneticButtonProps) {
  const Component = as as any;

  return (
    <Component
      href={href}
      className={className}
      style={{ display: "inline-block" }}
      {...props}
    >
      {children}
    </Component>
  );
}
