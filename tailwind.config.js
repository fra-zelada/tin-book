/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary-color)",
                primaryVariant: "var(--primary-variant-color)",
                secondary: "var(--secondary-color)",
                secondaryVariant: "var(--secondary-variant-color)",
                bgColor: "var(--bg-color)",
                surfaceColor: "var(--surface-color)",
                errorColor: "var(--error-color)",
                textOnPrimaryColor: "var(--text-on-primary)",
                textOnSecondaryColor: "var(--text-on-secondary)",
                textOnBackgroundColor: "var(--text-on-background)",
                textOnSurfaceColor: "var(--text-on-surface)",
                textOnErrorColor: "var(--text-on-error)",
                borderColor: "var(--border-color)",
                shadowColor: "var(--shadow-color)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            keyframes: {
                fadeInDown: {
                    "0%": { opacity: "0", transform: "translateY(-20px)" },
                    "100%": { opacity: "100", transform: "translateY(0px)" },
                },
            },
            animation: {
                pulseEaseInOnce: "fadeInDown 0.5s ease 1",
                pulseEaseNotification: "fadeInDown 1s ease 1",
            },
        },
    },
    plugins: [],
};
