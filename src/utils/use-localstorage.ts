export const useLocalStorage = () => {
  // const setItem = useCallback((key: string, value: string) => localStorage.setItem(key, value), []);
  // const getItem = useCallback((key: string) => localStorage.getItem(key), []);
  const setItem = (key: string, value: string): void => localStorage.setItem(key, value);
  const getItem = (key: string): string | null => localStorage.getItem(key);

  // Check window to avoid SSR error
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
    };
  }

  return { getItem, setItem };
};
