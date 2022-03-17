import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Global from "./components/Global";
import { TransporterProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <TransporterProvider>
      <Global />
      <App />
    </TransporterProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
