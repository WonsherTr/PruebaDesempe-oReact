import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "danger";
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default: "badge",
    success: "badge status-active",
    danger: "badge status-inactive"
  } as const;
  return <span className={styles[variant]}>{children}</span>;
}
