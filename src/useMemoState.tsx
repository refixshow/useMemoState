import { useState, useCallback } from "react";
import lodash from "lodash";

const useMemoState = <T,>(
  initialState: T | undefined = undefined
): [T | undefined, (newValue: T) => void] => {
  const [value, setValue] = useState(initialState);

  const setter = useCallback(
    (newValue: T) => {
      const compareStates: boolean = lodash.isEqual(value, newValue);
      if (!compareStates) setValue(newValue);
    },
    [value]
  );

  return [value, setter];
};

export default useMemoState;
