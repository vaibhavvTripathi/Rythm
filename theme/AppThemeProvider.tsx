import { createContext } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

export const colors = {
  secondary: {
    100: "#e0def1",
    200: "#c1bee4",
    300: "#a29dd6",
    400: "#837dc9",
    500: "#645cbb",
    600: "#504a96",
    700: "#3c3770",
    800: "#28254b",
    900: "#141225",
  },
  primary: {
    100: "#e0def1",
    200: "#c1bee4",
    300: "#a29dd6",
    400: "#837dc9",
    500: "#645cbb",
    600: "#504a96",
    700: "#3c3770",
    800: "#28254b",
    900: "#141225",
  },
  greyAccent: {
    100: "#f1f1f1",
    200: "#e4e4e4",
    300: "#d6d6d6",
    400: "#c9c9c9",
    500: "#bbbbbb",
    600: "#969696",
    700: "#707070",
    800: "#4b4b4b",
    900: "#252525",
  },
  greenAccent: {
    100: "#cdf4e7",
    200: "#9ae9cf",
    300: "#68dfb8",
    400: "#35d4a0",
    500: "#03c988",
    600: "#02a16d",
    700: "#027952",
    800: "#015036",
    900: "#01281b",
  },
  blueAccent: {
    100: "#ccd6e5",
    200: "#99adcb",
    300: "#6685b0",
    400: "#335c96",
    500: "#00337c",
    600: "#002963",
    700: "#001f4a",
    800: "#001432",
    900: "#000a19",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
    },
    secondary: {
      main: colors.secondary[500],
    },
  },
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Ubuntu", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Ubuntu", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Ubuntu", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Ubuntu", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Ubuntu", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Ubuntu", "sans-serif"].join(","),
      fontSize: 14,
    },

    button: {
      textTransform: "none",
    },
  },
});