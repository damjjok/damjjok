//tailwind
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js, jsx}"],
    theme: {
        extend: {
            colors: {
                damyellow: "#FFD100",
                damlightgray: "#D6D6D6",
                damgray: "#D9D9D9",
                damblack: "#202020",
                damwhite: "#FFFFFF",
            },
        },
    },
    plugins: [],
};
