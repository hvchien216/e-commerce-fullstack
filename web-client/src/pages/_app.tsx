import { DarkModeProvider } from "@context/darkMode";
import { DrawerCartProvider } from "@context/drawerCart";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { AppState, wrapper } from "@redux/store";
import { darkTheme, lightTheme } from "@utils/theme";
import App, { AppContext, AppProps } from "next/app";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
function MyApp({ Component, pageProps }: AppProps) {
  const darkMode = useSelector((state: AppState) => state.products.darkMode);
  // const theme = darkMode ? darkTheme : lightTheme;
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement!.removeChild(jssStyles);
    }
  }, []);
  // const persistor = persistStore(store, {}, function () {
  //   persistor.persist();
  // });
  const store: any = useStore();
  return (
    <DrawerCartProvider>
      {/* <PayPalScriptProvider
        options={{
          "client-id":
            "AX2JCx0_jyY_8_DVrPMwcOihLs6u0IDXxlDNGhs1SzcQAbTHD3OpNe4C_J5CRKDtwXj41DZMvuvtbE7b",
        }}
      > */}
      <PersistGate
        loading={<div>loading...</div>}
        persistor={store.__persistor}
      >
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
      {/* </PayPalScriptProvider> */}
    </DrawerCartProvider>
  );
}

export default wrapper.withRedux(MyApp);
