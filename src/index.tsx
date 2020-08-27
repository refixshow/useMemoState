import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const fn = () => {
  console.log("render");
};

ReactDOM.render(<App exampleFunction={fn} />, document.getElementById("root"));
