import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: string, delay: number): [string] => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const prevValue = useRef<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      prevValue.current = debouncedValue;
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue];
};
