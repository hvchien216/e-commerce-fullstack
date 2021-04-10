import React, { createContext, useContext } from "react";
interface ContextProps {
  drawerCart: boolean;
  setDrawerCart: any;
}
export const DrawerCartContext = createContext<Partial<ContextProps>>({});

interface Props {
  children?: any;
}
export const DrawerCartProvider = ({ children }: Props) => {
  const [drawerCart, setDrawerCart] = React.useState(false);

  return (
    <DrawerCartContext.Provider
      value={{
        drawerCart,
        setDrawerCart,
      }}
    >
      {children}
    </DrawerCartContext.Provider>
  );
};

export const useDrawerCartStore = () => useContext(DrawerCartContext);
