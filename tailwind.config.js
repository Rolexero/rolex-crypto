module.exports = {
    content: [
        // ...
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            backgroundImage: {
                bannerImg: "url('/src/img/banner2.jpg')",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};