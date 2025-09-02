"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  // Safely get theme, fallback to "light" if useTheme fails (for admin pages)
  let theme = "light";
  try {
    const themeContext = useTheme();
    theme = themeContext?.theme || "light";
  } catch (error) {
    // If useTheme fails (admin pages without theme provider), use light theme
    theme = "light";
  }

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
