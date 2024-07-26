import twColors from "tailwindcss/colors";

export const extendedColors = {
  "app-neutral": {
    50: "#DADADA",
    100: "#979797",
    200: "#2F354C",
    300: "#3D5467",
  },

  primary: {
    50: "#f0f7fe",
    100: "#deecfb",
    200: "#c4e0f9",
    300: "#9bcbf5",
    400: "#6cafee",
    500: "#3D5467",
    600: "#3574db",
    700: "#2b5ec5",
    800: "#2a4ea3",
    900: "#274481",
    950: "#1c2c4f",
  },
  secondary: {
    50: "#e6eefc",
    100: "#cdfaee",
    200: "#9af5dc",
    300: "#60e8c9",
    400: "#2bc5a6",
    500: "#8DA9C4",
    600: "#0f927c",
    700: "#107565",
    800: "#125d52",
    900: "#144d45",
    950: "#052e2a",
  },
  danger: {
    50: "#fef3ee",
    100: "#fee3d6",
    200: "#fbc4ad",
    300: "#f89b79",
    400: "#f46843",
    500: "#f24d2c",
    600: "#e22814",
    700: "#bc1b12",
    800: "#951717",
    900: "#781716",
    950: "#41090b",
  },
  warning: {
    50: "#fdfbe9",
    100: "#fcf7c5",
    200: "#faed8e",
    300: "#f6db4e",
    400: "#f2ca2c",
    500: "#e1af11",
    600: "#c2870c",
    700: "#9b610d",
    800: "#804d13",
    900: "#6d3f16",
    950: "#402008",
  },

  background:{
    main:"#111111",
    rules:"#D9D9D9"
  },

  main:{
    orange: "#EC7302"
  }
};

export const colors = {
  ...twColors,
  ...extendedColors
};


//  backgroundAplication: '#111111'