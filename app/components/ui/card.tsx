import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={`border p-4 rounded shadow ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={`p-2 ${className || ""}`}>{children}</div>
  );
}