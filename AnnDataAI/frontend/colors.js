const { cyan } = require("@mui/material/colors");

module.exports = {
  black: {
    light: "#222",
    medium: "#1D1F2C",
    dark: "#101314",
    darker: "#0D111C",
    darkest: "#060606",
    alternative1: "#1E2225",
    alternative2: "#101010",
    alternative3: "#181921",
  },
  blue: {
    lightest: "#D4DDF1",
    lighter: "#B0BBD8",
    light: "#7584AE",
    medium: "#515E84",
    dark: "#3D4663",
    darker: "#282F42",
    darkest: "#06075A",
    primary: "#4A4CB2",
    secondary: "#A4C8E1",
    tertiary: "#B7D3E3",
    accent: "#6FA3D8",
    alternative: "#4A8BBE",
    deep: "#1F4E79",
    ultraDeep: "#0D3B66",
    soft: "#8FB8D8",
    vibrant: "#4188F5",
    // Dark Mode
    darkMode: {
      light: "#81ACF5",
      medium: "#54C5FF",
      dark: "#595CB7",
      deep: "#435585",
      contrast: "#4B5D93",
      background: "#131B30",
      text: "#00004A",
      alternative: "#383BAA",
      highlight: "#6CA9F5",
    },
  },
  cyan: {
    light: cyan[100] || "#7AFFFF",
    medium: cyan[300] || "#52FFFF",
    dark: cyan[700] || "#3B9FD0",
  },
  yellow: {
    lightest: "#F5F5DC",
    lighter: "#F0E68C",
    light: "#FFCC00",
    medium: "#FFD700",
    dark: "#EAA938",
    darkest: "#AF9500",
    // Dark Mode
    darkMode: {
      light: "#FFC92E",
      medium: "#C1B697",
      dark: "#FFD93B",
      contrast: "#907A37",
    },
  },
  red: {
    light: "#FF603C",
    medium: "#BF1500",
    dark: "#B30505",
    darkest: "#260200",
    deep: "#350000",
    accent: "#FF0A0A",
  },
  orange: {
    light: "#FF8400",
    dark: "#AF5B00",
    // Dark Mode
    darkMode: {
      vibrant: "#FF7900",
    },
  },
  grey: {
    lightest: "#A9AFC3",
    lighter: "#B3B8D0",
    light: "#6C757D",
    medium: "#B2B2B2",
    dark: "#A6A6A6",
    darker: "#8C8C8C",
    darkest: "#7D7D7D",
    contrast: "#D5DBDB",
    // Dark Mode
    darkMode: {
      deep: "#606A6F",
    },
  },
  white: {
    pure: "#FFFFFF",
    light: "#F8F9FA",
    medium: "#E9ECEF",
    dark: "#DEE2E6",
    contrast: "#CED4DA",
    background: "#F5F5F5",
  },
  teal: {
    lightest: "#A2DFF7",
    lighter: "#6BCBEB",
    medium: "#3A9AD9",
    dark: "#007B8A",
    deepest: "#005F6B",
  },
  purple: {
    lightest: "#EAB8E4",
    lighter: "#D6A2D5",
    medium: "#B57BC4",
    dark: "#8E5DAF",
    deepest: "#5B3F8D",
  },
  green: {
    lightest: "#B2E0B2",
    lighter: "#8CCB8C",
    medium: "#5DAA5D",
    dark: "#3B8A3B",
    deepest: "#2A6A2A",
    // Dark Mode
    darkMode: {
      light: "#4DFF99",
      medium: "#0FD4CA",
      vibrant: "#7AFFFF",
    },
  },
};
