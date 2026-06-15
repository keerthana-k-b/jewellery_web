/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface-variant": "#4d4635",
        "on-tertiary-fixed": "#1b1d0e",
        "surface-container-highest": "#e2e2e2",
        "on-error-container": "#93000a",
        "outline": "#7f7663",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#e9c349",
        "tertiary-fixed": "#e4e4cc",
        "secondary-fixed": "#e5e2e1",
        "tertiary-fixed-dim": "#c8c8b0",
        "error": "#ba1a1a",
        "tertiary": "#5e604d",
        "on-tertiary-fixed-variant": "#474836",
        "surface-container-low": "#f3f3f3",
        "on-background": "#1a1c1c",
        "inverse-surface": "#2f3131",
        "on-primary-container": "#554300",
        "on-surface": "#1a1c1c",
        "on-error": "#ffffff",
        "tertiary-container": "#b4b49d",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#636262",
        "primary-fixed": "#ffe088",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#e2e2e2",
        "outline-variant": "#d0c5af",
        "surface-container": "#eeeeee",
        "on-primary-fixed-variant": "#574500",
        "on-secondary-fixed": "#1c1b1b",
        "on-primary": "#ffffff",
        "primary-fixed-dim": "#e9c349",
        "background": "#f9f9f9",
        "surface": "#f9f9f9",
        "primary-container": "#d4af37",
        "on-tertiary-container": "#454634",
        "on-primary-fixed": "#241a00",
        "surface-container-high": "#e8e8e8",
        "secondary": "#5f5e5e",
        "surface-tint": "#735c00",
        "on-secondary-fixed-variant": "#474746",
        "surface-bright": "#f9f9f9",
        "secondary-container": "#e2dfde",
        "surface-dim": "#dadada",
        "error-container": "#ffdad6",
        "secondary-fixed-dim": "#c8c6c5",
        "inverse-on-surface": "#f0f1f1",
        "primary": "#735c00"
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      spacing: {
        "container-max": "1200px",
        "margin-desktop": "64px",
        "unit": "8px",
        "margin-mobile": "20px",
        "gutter": "24px",
        "edge-margin-desktop": "64px",
        "edge-margin-mobile": "20px",
        "section-gap": "96px"
      },
      fontFamily: {
        "body-lg": ["\"Source Serif 4\""],
        "display-lg": ["Playfair Display"],
        "label-sm": ["\"Source Sans 3\""],
        "label-caps": ["\"Source Sans 3\""],
        "body-md": ["\"Source Serif 4\""],
        "headline-md": ["Playfair Display"],
        "headline-lg": ["Playfair Display"],
        "display-lg-mobile": ["Playfair Display"],
        "price-display": ["\"Source Sans 3\""]
      },
      fontSize: {
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-sm": ["12px", {"lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "600"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.2em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "headline-lg": ["40px", {"lineHeight": "1.2", "fontWeight": "600"}],
        "display-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "700"}],
        "price-display": ["20px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500"}]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
}
