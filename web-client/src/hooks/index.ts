import { useEffect, useState } from "react";
function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState(false);
  useEffect(() => {
    try {
      const item: any = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (e) {
      console.log("getValue===>", e);
    }
  }, []);
  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.log("setValue===>", e);
    }
  };
  return [storedValue, setValue];
}
export { useLocalStorage };
