import React, { createContext, useContext } from "react";
import { darkTheme, lightTheme } from "@utils/theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { useLocalStorage } from "@hooks/index";
interface ContextProps {
  darkMode: any;
  setDarkMode: any;
}
export const DarkModeContext = createContext<ContextProps>({
  darkMode: false,
  setDarkMode: () => {},
});

interface Props {
  children?: any;
}
export const DarkModeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode");
  // const [darkMode, setDarkMode] = React.useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      {children}
      {/* </ThemeProvider> */}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeStore = () => useContext(DarkModeContext);
