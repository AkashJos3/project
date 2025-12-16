/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'deep-black': '#0a0a0a',
                'soft-black': '#121212',
                'neon-green': '#39ff14',
                'neon-cyan': '#00f2ea',
                'electric-purple': '#bc13fe',
                'glass-white': 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                orbitron: ['"Orbitron"', 'sans-serif'],
                inter: ['"Inter"', 'sans-serif'],
            },
            boxShadow: {
                'neon': '0 0 10px rgba(57, 255, 20, 0.5), 0 0 20px rgba(57, 255, 20, 0.3)',
                'neon-purple': '0 0 10px rgba(188, 19, 254, 0.5), 0 0 20px rgba(188, 19, 254, 0.3)',
            }
        },
    },
    plugins: [],
}
