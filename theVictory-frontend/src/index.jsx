import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ProfilContext from "./ProfilContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProfilContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ProfilContext>
);

