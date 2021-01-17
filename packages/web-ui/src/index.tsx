import React from "react";
import { render } from "react-dom";
import App from "./App";

const root = document.getElementById("root");

if (root) {
    root.style.height = "100%";
    root.style.width = "100%";
}

render(<App />, root);
