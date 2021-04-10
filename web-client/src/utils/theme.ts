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
    type: "light",
    primary: {
      light: "#a95817",
      main: "#2196F3",
      dark: "#f4974d",
      contrastText: "#ededed",
    },
    secondary: {
      light: "#007bb2",
      main: "#00b0ff",
      dark: "#33bfff",
      contrastText: "#272727",
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
    primary: {
      light: "#a95817",
      main: "#F27E21",
      dark: "#f4974d",
      contrastText: "#272727",
    },
    secondary: {
      light: "#007bb2",
      main: "#00b0ff",
      dark: "#33bfff",
      contrastText: "#ededed",
    },
    text: {
      primary: "#fff",
    },
  },
});

export { lightTheme, darkTheme, LINEAR_BLUE, LINEAR_RED, HIGHT_LIGHT_COLOR };
