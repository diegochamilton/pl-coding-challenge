import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import "./styles/app.scss"; // Load app styles
import "./api/axios"; // Configure Axios

ReactDOM.render(<App />, document.getElementById("root"));
