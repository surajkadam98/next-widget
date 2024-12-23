// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/@components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/@layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "560px",
        "max-sm": { max: "560px" },
        md: "768px",
        lg: "1280px",
        xl: "1440px",
      },
      colors: {
        primary: "#FF2F80",
        widgetBg: "var(--widgetBg)",
        clightblue: "#00398C",
        cblue: "#00277A",
        cpink: "#EF5BFF",
        cdark: "#02172E",
        clightdark: "#BCC5CF",
        blue: "#2081E2",
        modalBackColor: "rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        opensans: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        // Define your custom sizes
        h0: ["36px", { lineHeight: "1.1" }],
        h1: ["30px", { lineHeight: "1.2" }],
        h2: ["24px", { lineHeight: "1.4" }],
        h3: ["16px", { lineHeight: "1.5" }],
        h4: ["12px", { lineHeight: "1.6" }],
        h5: ["10px", { lineHeight: "1.7" }],
      },
    },
  },
  plugins: [],
} satisfies Config;

