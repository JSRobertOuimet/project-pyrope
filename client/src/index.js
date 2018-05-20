// React
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/jquery/dist/jquery.min.js";

import "./styles/App.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();