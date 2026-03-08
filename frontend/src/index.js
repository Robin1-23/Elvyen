import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // FIX: was "@/index.css" — use relative imports for CSS files
import App from "./App"; // FIX: was "@/App" — use relative import

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);