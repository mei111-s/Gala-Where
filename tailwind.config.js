/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // From the requested palette
        sandlight: "#F1DCCD",
        mauve: "#C29D93",
        cocoa: "#AF8B87",
        pinkbright: "#FFBFCC",
        pinklight: "#FFD4DF",
        blushbg: "#FFF0F5",

        // Semantic aliases used throughout the app (unchanged names,
        // repointed to the new palette so components didn't need edits)
        blush: "#FFF0F5",      // page background
        blushdeep: "#FFD4DF",  // pill/tag chip backgrounds
        cream: "#FFFFFF",      // card surfaces (crisp white for contrast)
        ivory: "#FFF8F3",      // text on colored buttons/banners
        maroon: "#AF8B87",     // headings, nav text, dark accents
        "maroon-light": "#C29D93",
        cherry: "#E91E63",     // primary CTA / accent — vibrant raspberry
        gold: "#FFBFCC",
        ink: "#4A3C3C",        // primary body text — dark charcoal-brown
        inkmuted: "#776B6B",   // secondary/muted text
      },
      fontFamily: {
        display: ["var(--font-baloo)"],
        body: ["var(--font-jakarta)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        signboard: "16px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(175,139,135,0.14)",
        pop: "0 4px 14px rgba(229,138,160,0.35)",
      },
    },
  },
  plugins: [],
};
