import { useState, useEffect } from "react";

// ? Hooks to handle debouncing of a value.
// ? Useful for cases like fetching API with a search query, because we depend on a state
const useDebounce = <T>(value: T, delay = 700) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
