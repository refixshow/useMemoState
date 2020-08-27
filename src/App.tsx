import React, { FC } from "react";
import useMemoState from "./useMemoState";

interface Props {
  exampleFunction: () => void;
}

const App: FC<Props> = ({ exampleFunction }) => {
  const [state, setState] = useMemoState<object>({
    val: 1,
    obj: { val: 3, val2: [1, 3] },
  });

  exampleFunction();

  return (
    <div>
      <button
        className="testOne"
        onClick={() =>
          setState({
            val: 1,
            obj: { val: 3, val2: [1, 3] },
          })
        }
      >
        test one
      </button>
      <button
        className="testTwo"
        onClick={() => setState({ val: 3, obj: { val: 4, val2: [2, 7] } })}
      >
        test two
      </button>
      <div>{JSON.stringify(state, null, 2)}</div>
    </div>
  );
};

export default App;
