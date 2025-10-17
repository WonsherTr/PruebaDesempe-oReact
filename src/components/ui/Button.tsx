import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
};

export default function Button({ variant = "primary", size = "md", ...props }: ButtonProps) {
  const classes = ["btn", variant, size].filter(Boolean).join(" ");
  return <button className={classes} {...props} />;
}
