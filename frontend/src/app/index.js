import React from "react";
import ReactDom from "react-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";

console.log("Hello world");

ReactDom.render(<Main />, document.getElementById("root"));
