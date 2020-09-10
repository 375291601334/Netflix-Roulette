import { useState, useCallback } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void ] => {
  const [flag, setFlag] = useState(initialValue);

  const toggle = useCallback(
    () => {
      setFlag(!flag);
    },
    [flag],
  );

  return [flag, toggle];
};
