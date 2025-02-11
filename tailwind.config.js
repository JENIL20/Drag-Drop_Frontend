/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "search-icon": "url('/src/assets/images/icon_search.svg')",
        "search-icon-grey": "url('/src/assets/images/icon_search_grey.svg')",
        "gradient-effect": "url('/src/assets/images/gradient.svg')",
      },
      boxShadow: {
        cardShadow: "0 4px 24px 0 rgba(0, 0, 0, 0.08)", // The last value is the spread value
        dropdownShadow: "0px 4px 24px 0px #00000014",
        "switch-shadow":
          "0px 4px 10px 0px #00000026, 0px 4px 12px 0px #0000001A inset",
      },
      colors: {
        primary: "#21A55D",
        secondary: "#1C83C6",
        "grey-50": "#ECF8FC",
        "grey-100": "#D1E2E7",
        "grey-150": "#E3ECEF",
        "grey-200": "#949494",
        "grey-250": "#6F6F6F",
        "grey-300": "#F1F1F1",
        "grey-400": "#333333",
        "site-black": "#0D0D0E",
        "extra-light": "#F6F9FA",
        "site-red": "#EF5151",
        "site-green": "#00A511",
        "site-yellow": "#C2780E",
        "dark-grey": "#606060",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "12px",
          sm: "0",
          lg: "0",
          xl: "0",
          xxl: "0",
        },
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1140px",
          xxl: "1140px",
        },
      },
      fontFamily: {
        sans: ["Kanit, serif", ...defaultTheme.fontFamily.sans],
        figtree: ["Figtree, serif"],
      },
      keyframes: {
        gradientBorder: {
          "0%": {
            "border-image-source":
              "linear-gradient(0deg, rgba(33, 165, 93, 0.15) 12.33%, rgba(255, 255, 255, 0) 34.31%, rgba(255, 255, 255, 0) 52.66%, rgba(33, 165, 93, 0.20) 74.67%)",
          },
          "50%": {
            "border-image-source":
              "linear-gradient(90deg, rgba(33, 165, 93, 0.15) 12.33%, rgba(255, 255, 255, 0) 34.31%, rgba(255, 255, 255, 0) 52.66%, rgba(33, 165, 93, 0.20) 74.67%)",
          },
          "100%": {
            "border-image-source":
              "linear-gradient(180deg, rgba(33, 165, 93, 0.15) 12.33%, rgba(255, 255, 255, 0) 34.31%, rgba(255, 255, 255, 0) 52.66%, rgba(33, 165, 93, 0.20) 74.67%)",
          },
        },
      },
      animation: {
        "gradient-border": "gradientBorder 1s infinite linear",
      },
      listStyleImage: {
        // bullet: 'url("/src/assets/images/ic_bullet.svg")',
      },
      margin: {
        15: "60px",
        30: "30px",
      },
      padding: {
        15: "60px",
        30: "30px",
      },
      screens: {
        sm: "576px",
        // => @media (min-width: 576px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        xl: "1200px",
        // => @media (min-width: 1200px) { ... }

        xxl: "1400px",
        // => @media (min-width: 1400px) { ... }
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-fill-current": { "-webkit-text-fill-color": "currentColor" },
        ".text-fill-transparent": { "-webkit-text-fill-color": "transparent" },
        ".border-gradient": {
          borderImageSource:
            "linear-gradient(155.31deg, rgba(255, 255, 255, 0.5) 12.33%, rgba(255, 255, 255, 0) 34.31%, rgba(255, 255, 255, 0) 52.66%, rgba(255, 255, 255, 0.54) 74.67%)",
          borderImageSlice: "1",
        },
        ".box-gradient": {
          background:
            "linear-gradient(113deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.07) 100%)",
          "backdrop-filter": "blur(70px)",
        },
        ".box-gradient-55": {
          background:
            "linear-gradient(113deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.55) 100%)",
          "backdrop-filter": "blur(70px)",
        },
      });
    },
    function ({ addComponents }) {
      addComponents({
        ".icon-user": {
          "mask-image": "url(/src/assets/images/ic_user.svg)",
          "-webkit-mask-image": "url(/src/assets/images/ic_user.svg)",
          "background-size": "contain",
        },
        ".icon-check": {
          "mask-image": "url(/src/assets/images/ic_check.svg)",
          "-webkit-mask-image": "url(/src/assets/images/ic_check.svg)",
          "background-size": "contain",
          background:
            "linear-gradient(224.77deg, #1C83C6 -36.05%, #22B465 93.63%, #1EB359 149.21%)",
        },
        ".icon-chevron-down": {
          "mask-image": "url(/src/assets/images/ic_chevron_down.svg)",
          "-webkit-mask-image": "url(/src/assets/images/ic_chevron_down.svg)",
          "background-size": "contain",
          background: "#949494",
        },
        ".icon-upload": {
          "mask-image": "url(/src/assets/images/icn_upload.svg)",
          "-webkit-mask-image": "url(/src/assets/images/icn_upload.svg)",
          "background-size": "contain",
          background: "#333333",
        },
        ".icon-edit": {
          "mask-image": "url(/src/assets/images/ic_edit.svg)",
          "-webkit-mask-image": "url(/src/assets/images/ic_edit.svg)",
          "background-size": "contain",
          background: "#2C714B",
        },
        ".icon-delete": {
          "mask-image": "url(/src/assets/images/ic_delete.svg)",
          "-webkit-mask-image": "url(/src/assets/images/ic_delete.svg)",
          "background-size": "contain",
          background: "#EF5151",
        },
        ".icon-atoz": {
          "background-image": "url(/src/assets/images/ic_filter_atoz.svg)",
          "background-size": "contain",
        },
        ".icon-ztoa": {
          "background-image": "url(/src/assets/images/ic_filter_ztoa.svg)",
          "background-size": "contain",
        },
        ".icon-notification": {
          "mask-image": "url(/src/assets/images/ic_notification.svg)",
          "-webkit-mask-image": "url(/src/assets/images/ic_notification.svg)",
          "background-size": "contain",
          background: "#333",
        },
      });
    },
  ],
};
