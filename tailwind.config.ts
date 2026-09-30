import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1200px", "2xl": "1280px" },
    },
    extend: {
      // 「光の線」デザインのトークン(値の定義は app/globals.css の :root)
      colors: {
        bg: "var(--bg)",
        hairline: {
          DEFAULT: "var(--hairline)",
          strong: "var(--hairline-strong)",
        },
        fg: {
          DEFAULT: "var(--fg)",
          soft: "var(--fg-soft)",
          muted: "var(--fg-muted)",
          dim: "var(--fg-dim)",
        },
        beam: {
          azure: "var(--beam-azure)",
          sky: "var(--beam-sky)",
          indigo: "var(--beam-indigo)",
        },
      },
      backgroundImage: {
        // bg-beam: ブランドの光の線のグラデーション
        beam: "var(--beam-gradient)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-jp)", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
        mono: ["var(--font-mono)", "var(--font-jp)", "SFMono-Regular", "Menlo", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
export default config
