import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

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

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
