import type { Config } from "tailwindcss"
import { withUt } from "uploadthing/tw"

export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1280px",
        xl: "1366px",
        "2xl": "1440px",
      },
    },
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1280px",
        xl: "1366px",
        "2xl": "1400px",
      },
      fontFamily: {
        jakarta_sans: ["var(--font-plus_jakarta_sans)"],
        canelaThin: "canelaThin",
        canelaLight: "canelaLight",
        canelaRegular: "canelaRegular",
      },
      colors: {
        main: "hsl(var(--main))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          color: "var(--primary)",
          css: {
            p: {
              color: "var(--primary)",
              margin: "0 0 10px 0",
              // fontSize: "14px",
            },
            ol: {
              margin: "0",
            },
            "ol > li": {
              marginTop: ".25em",
              marginBottom: ".25em",
            },
            "ol > li > p": {
              margin: "0",
            },
            "ol > li::marker": {
              color: "var(--primary)",
            },
            ul: {
              margin: "0",
            },
            "ul > li": {
              marginTop: ".25em",
              marginBottom: ".25em",
            },
            "ul > li > p": {
              margin: "0",
            },
            "ul > li::marker": {
              color: "var(--primary)",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
})
