export const colors = {
  appNeutral50: "#DADADA",
  appNeutral75: "#DDCFC6",
  appNeutral100: "#979797",
  appNeutral200: "#2F354C",
  appNeutral300: "#3D5467",

  neutral000: "rgba(255, 255, 255, 0.7)",
  neutral100: "#FFFFFF",
  neutral200: "#2F30710D",
  neutral300: "#2F307129",
  neutral500: "#1A181880",
  neutral600: "#8D8C8C",
  neutral800: "#1A1818",
  neutral900: "#000000",

  primary100: "#F4F5FF",
  primary150: "#DDDEE8",
  primary200: "#CECFF2",
  primary200Opacity30: "rgba(206, 207, 242, 0.3)",
  primary250: "#F1F1FC",
  primary300: "#E3D6F9",
  primary400: "#9798B8",
  primary420: "rgba(47, 48, 113, 0.6)",
  primary450: "rgba(47, 48, 113, 0.8)",
  primary500: "#2F3071",
  secondary200: "#E3D6F9",
  secondary400: "#9f74eb",

  warning500: "#FDAF01",
  warning600: "#F499AF",
  danger300: "#e38484",
  danger500: "#E10101",
  danger500o5: "#E1010188",
  success500: "#00CD39",
  violet: "rgb(159, 116, 235)",
} as const;

export const fonts = {
  light: "Poppins-Light",
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;
/**
 * Use useTheme hook instead
 */
export const getColors = (colorName: keyof typeof colors) => {
  return colors[colorName];
};

export const lightTheme = {
  colors: colors,
  spacing: {
    "0": 0,
    "0.5": 2,
    "1": 4,
    // '1.5': 6,
    "2": 8,
    // '2.5': 10,
    "3": 12,
    // '3.5': 14,
    "4": 16,
    "5": 20,
    "6": 24,
    "7": 28,
    "8": 32,
    "9": 36,
    "10": 40,
    "11": 44,
    "12": 48,
    "14": 56,
    "16": 64,
    "20": 80,
    "24": 96,
    "28": 112,
    "32": 128,
    "36": 144,
    "40": 160,
    "44": 176,
    "48": 192,
    "52": 208,
    "56": 224,
    "60": 240,
    "64": 256,
    "72": 288,
    "80": 320,
    "96": 384,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    sm: 2,
    r: 4,
    md: 6,
    lg: 8,
    xl: 12,
    "2xl": 16,
    "3xl": 24,
  },
  textVariants: {
    defaults: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: "neutral800",
    },
    l10: {
      fontFamily: fonts.light,
      fontSize: 10,
      color: "neutral800",
    },
    l12: {
      fontFamily: fonts.light,
      fontSize: 12,
      color: "neutral800",
    },
    r12: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: "neutral800",
    },
    r14: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: "neutral800",
    },
    m10: {
      fontFamily: fonts.medium,
      fontSize: 10,
      color: "neutral800",
    },
    m12: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: "neutral800",
    },
    sb14: {
      fontFamily: fonts.semiBold,
      fontSize: 14,
      color: "neutral800",
    },
    m14: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: "neutral800",
    },
    r16: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: "neutral800",
    },
    sb18: {
      fontFamily: fonts.semiBold,
      fontSize: 18,
      color: "neutral800",
    },
    sb22: {
      fontFamily: fonts.semiBold,
      fontSize: 22,
      color: "neutral800",
    },
    m28: {
      fontFamily: fonts.medium,
      fontSize: 28,
      color: "neutral800",
    },
  },
};

// Create dark theme
// export const darkTheme = createTheme({
//   ...lightTheme,
//   colors: {
//     ...lightTheme.colors,
//     mainBackground: palette.black,
//     cardPrimaryBackground: palette.black,
//   },
// });

export type ThemeT = typeof lightTheme;

export type ThemeVariantT = "light" | "dark";

export const useTheme = () => ({ colors, spacing: lightTheme.spacing });
