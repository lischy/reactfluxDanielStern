console.log("Hello world");
import { store } from "./store";
import React from "react";
import ReactDom from "react-dom";
import { Main } from "./components/Main";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDom.render(<Main />, document.getElementById("root"));
