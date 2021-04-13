import { createMuiTheme } from "@material-ui/core/styles";

const LINEAR_BLUE = "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)";
const LINEAR_RED = "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)";
const HIGHT_LIGHT_COLOR = "#f94c43";
const lightTheme = createMuiTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    type: "light",
    primary: {
      light: "#f7e570",
      main: "#f5df4d",
      dark: "#ab9c35",
      contrastText: "#ededed",
    },
    secondary: {
      light: "#8509a4",
      main: "#be0eeb",
      dark: "#cb3eef",
      contrastText: "#ededed",
    },
  },
});

const darkTheme = createMuiTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    type: "dark",
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      light: "#f7e570",
      main: "#f5df4d",
      dark: "#ab9c35",
      contrastText: "#ededed",
    },
    secondary: {
      light: "#8509a4",
      main: "#be0eeb",
      dark: "#cb3eef",
      contrastText: "#ededed",
    },
  },
});

export { lightTheme, darkTheme, LINEAR_BLUE, LINEAR_RED, HIGHT_LIGHT_COLOR };
